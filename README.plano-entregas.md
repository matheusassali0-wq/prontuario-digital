# Plano Prioritário + Playbook — Prontuário Digital (WSL/Node/React/Postgres)

Atualizado em: 22/09/2025 10:00 (GMT-3)

## Resumo em 3 linhas
- Padronize o ambiente (WSL ext4 + Corepack/PNPM), contratos únicos (Zod + tipos compartilhados) e numeração por sequence no Postgres para eliminar drift e contenção.
- Fortaleça offline-first com idempotência TTL (Redis) e auditoria WORM com HMAC rotativo; mantenha CSP/CSRF ativos também em desenvolvimento.
- Entregue testes mínimos (2 e2e + 3 unit), Command Palette/atalhos clínicos, e CI determinística congelada no lockfile.

---

## Entrega principal (completo, pronto para uso)

### 1) Prioridades (do maior impacto imediato)

1. Ambiente determinístico (WSL/ext4 + Corepack/PNPM)
	 - Repo só no WSL ext4 (não use /mnt/c). Guardião já presente: `scripts/doctor-env.mjs`.
	 - Corepack + PNPM com lockfile imutável: instalações reprodutíveis.
2. Sequências Postgres (sem tabela "Counter")
	 - `CREATE SEQUENCE` + `default nextval('...')` nas colunas concorrentes (Prescription já ok).
3. Contrato único (Zod + tipos compartilhados)
	 - Pacote `contracts/` com Zod; servidor valida, webapp importa tipos (`z.infer`).
4. Offline-first endurecido
	 - Idempotência por TTL (Redis), cabeçalho `Idempotency-Key` e `X-Payload-Hash`; replay consistente.
5. Segurança ativa também na dev
	 - CSP mínimo com `connect-src` estrito; CSRF double-submit opcional (flag `ENABLE_CSRF=1`).
6. Testes essenciais
	 - 2 e2e Playwright + 3 unit (idempotência, sequência, template parser).
7. Ergonomia clínica
	 - Command Palette (Ctrl/Cmd+K) e hotkeys (Enter, Ctrl/Cmd+S, Ctrl/Cmd+P).
8. CI determinística
	 - `pnpm install --frozen-lockfile` + cache por lockfile; build, lint, tests.

---

### 2) Playbook de implementação (one-liners, SQL, exemplos de código)

#### 2.1 Corepack/PNPM + higiene WSL

```bash
corepack enable && corepack prepare pnpm@latest --activate
git rm -f package-lock.json webapp/package-lock.json 2>/dev/null || true
pnpm -v
```

PowerShell:
```powershell
corepack enable; corepack prepare pnpm@latest --activate; pnpm -v
```

Recomendado no package.json (raiz):
- "packageManager": "pnpm@9.x"
- "engines": { "node": ">=20.10 <21" }

Instalação determinística:
```bash
pnpm install --frozen-lockfile
pnpm --filter ./webapp install --frozen-lockfile
```

Execução com guardião WSL:
```bash
pnpm run dev:up
pnpm run dev:down
pnpm run dev:repair
```

#### 2.2 Sequências Postgres (SQL + Prisma)

SQL (exame):
```sql
CREATE SEQUENCE IF NOT EXISTS exam_order_seq START 1 INCREMENT 1 NO MINVALUE NO MAXVALUE CACHE 1;
```

Migração Prisma (trecho):
```sql
CREATE SEQUENCE IF NOT EXISTS exam_order_seq START 1 INCREMENT 1;
ALTER TABLE "ExamOrder" ADD COLUMN "number" INTEGER NOT NULL DEFAULT nextval('exam_order_seq');
CREATE UNIQUE INDEX IF NOT EXISTS "ExamOrder_number_key" ON "ExamOrder"("number");
```

Schema Prisma:
```prisma
model ExamOrder {
	id        String   @id @default(cuid())
	number    Int      @unique @default(dbgenerated("nextval('exam_order_seq')"))
	patientId String
	createdAt DateTime @default(now())
	patient   Patient  @relation(fields: [patientId], references: [id], onDelete: Cascade)
	@@index([patientId, createdAt])
}
```

Aplicar:
```bash
pnpm prisma migrate dev --name exam_order_seq && pnpm prisma migrate deploy
```

#### 2.3 Contratos únicos (Zod + tipos) — pacote `contracts/`

Estrutura:
```
contracts/
	package.json
	tsconfig.json
	src/
		prescriptions.ts
```

Alias TS/Vite:
- tsconfig (raiz): `"paths": { "@contracts/*": ["contracts/src/*"] }`
- Vite (webapp): `resolve.alias = { '@contracts': path.resolve(__dirname, '../contracts/src') }`

Exemplo `contracts/src/prescriptions.ts`:
```ts
'use strict';
import { z } from 'zod';
export const PrescriptionItemSchema = z.object({
	nome: z.string().min(1),
	dose: z.string().trim().optional().default(''),
	via: z.string().trim().optional().default(''),
	horario: z.string().trim().optional().default(''),
	observacao: z.string().trim().optional().default('')
});
export const PrescriptionCreateSchema = z.object({
	patientId: z.string().min(1),
	formato: z.enum(['A4','A5']).default('A4'),
	cid: z.string().trim().optional().transform(v=>v&&v.trim()?v.trim():undefined),
	observacoes: z.string().trim().optional().transform(v=>v&&v.trim()?v.trim():undefined),
	items: z.array(PrescriptionItemSchema).min(1)
});
export const PrescriptionRecordSchema = z.object({
	id: z.string().min(1),
	numero: z.number().int().positive(),
	pacienteId: z.string().min(1),
	pacienteNome: z.string().min(1),
	cid: z.string().optional(),
	observacoes: z.string().optional(),
	formato: z.enum(['A4','A5']),
	itens: z.array(PrescriptionItemSchema.extend({ ordem: z.number().int().positive() })),
	criadoEm: z.string().min(1),
	tipo: z.literal('PRINT')
});
export type PrescriptionItem = z.infer<typeof PrescriptionItemSchema>;
export type PrescriptionCreateInput = z.infer<typeof PrescriptionCreateSchema>;
export type PrescriptionRecord = z.infer<typeof PrescriptionRecordSchema>;
```

#### 2.4 Offline-first com idempotência TTL + replay

Política:
- Headers: `Idempotency-Key` (obrigatório em POST críticos) e `X-Payload-Hash` (sha256 do corpo).
- TTL padrão: 10 minutos; chave: `idemp:<rota>:<key>`.
- Mesma chave+hash → retorna resposta anterior; hash diferente → 409.

Subir Redis local (Docker):
```bash
docker run -d --name prontuario-redis -p 6379:6379 redis:7-alpine
```

#### 2.5 Auditoria WORM com HMAC rotativo

- `AUDIT_HMAC_ROTATION=YYYY-MM`; payload contém `hashPrev`, `hash`, `rotation`.
- Export JSON‑LD por paciente em `/api/v1/patients/:id/audit/export`.

#### 2.6 CSP/CSRF em dev e prod

Ativar CSRF quando desejar:
```bash
export ENABLE_CSRF=1
```
CSP já parametrizada (Bird ID/Memed via env); em dev inclui `ws:` e `http://localhost:5173`.

#### 2.7 Testes (Playwright + Unit)

Instalar Playwright:
```bash
pnpm dlx playwright install --with-deps
```

E2E: evolução e exames (ver exemplos no corpo deste documento em 2.7 — prontos para colar).

Unit (Vitest): idempotência, sequência, parser de templates (ver exemplos em 2.7).

#### 2.8 Ergonomia clínica (Command Palette + Hotkeys)

- Ações: Novo Paciente, Buscar, Nova Evolução (1ª/Retorno), Pedir Exames (preset), Nova Prescrição.
- Hotkeys: Enter (salvar), Ctrl/Cmd+S (forçar salvar), Ctrl/Cmd+P (imprimir).

Hook React exemplo em 2.8 (copiar/colar).

#### 2.9 Observabilidade mínima

Coletor OTEL rápido:
```bash
docker run -d --name otelcol -p 4318:4318 otel/opentelemetry-collector:0.104.0
```

### 3) CI determinística (GitHub Actions)

Workflow mínimo:
```yaml
name: ci
on: [push, pull_request]
jobs:
	build:
		runs-on: ubuntu-22.04
		steps:
			- uses: actions/checkout@v4
			- uses: actions/setup-node@v4
				with:
					node-version: '20.12'
			- run: corepack enable && corepack prepare pnpm@latest --activate
			- run: pnpm install --frozen-lockfile
			- run: pnpm --filter ./webapp install --frozen-lockfile
			- run: pnpm run build && pnpm run lint
			- run: pnpm run test --if-present
```

---

## QA/Checklist de conformidade (5 itens)

- [ ] Ambiente determinístico: Corepack + PNPM com `--frozen-lockfile`; repo em WSL ext4.
- [ ] Segurança ativa: CSP mínimo por ambiente; CSRF double-submit em mutações.
- [ ] Confiabilidade: sequences Postgres em numerações concorrentes; auditoria WORM.
- [ ] Contratos: pacote `contracts/` consumido por server/webapp; sem modelos duplicados.
- [ ] Testes: 2 e2e Playwright + 3 unit (idempotência, sequência, parser) rodando em CI.

---

## Próximos passos práticos (D-1, D0, D+7)

- D‑1
	- Branch: `feat/pnpm-contracts-idempotency`.
	- Corepack/PNPM + remover `package-lock.json`.
	- Criar `contracts/` e aliases TS/Vite.
- D0
	- Servidor importando `@contracts` e validando Zod.
	- Middleware idempotência (Redis) + unit tests.
	- Rodar Playwright e ajustar CSP/headers.
- D+7
	- CI com `pnpm --frozen-lockfile` + cache por lockfile.
	- OpenTelemetry (HTTP + Prisma) e p99 de mutações.
	- Command Palette/hotkeys nas telas principais.

---

## Versão curta para WhatsApp

Padronizamos WSL ext4 + PNPM, contratos únicos (Zod) e sequences no Postgres para escalar sem dor. Offline-first com idempotência Redis e auditoria WORM, CSP/CSRF ativos. Entrego 2 e2e + 3 unit, Command Palette e CI determinística.

```bash
corepack enable && corepack prepare pnpm@latest --activate
pnpm install --frozen-lockfile && pnpm --filter ./webapp install --frozen-lockfile
pnpm prisma migrate deploy && pnpm run start:prod
```

```sql
CREATE SEQUENCE IF NOT EXISTS exam_order_seq START 1 INCREMENT 1;
```

## 📦 Contratos compartilhados — como usar

- Build: `npm run contracts:build` (gera CommonJS + .d.ts em `contracts/dist`).
- Server (CJS): tenta `require('../contracts/dist')` e faz fallback para `../contracts/src` em dev (para não quebrar). Em produção os scripts já chamam o build.
- Frontend (Vite): importe tipos/esquemas de `@contracts/...` (alias configurado em `webapp/tsconfig.json` e `vite.config.ts`).
- Teste rápido: `npm run test:contracts` valida o parsing de payloads válidos/inválidos de prescrição.

Status atual:
- [x] Pacote `contracts/` com Zod para prescrição.
- [x] Server consumindo `PrescriptionCreateSchema` do pacote (com fallback).
- [x] Webapp usando tipos de `@contracts` em `webapp/src/services/prescriptions.ts`.
- [ ] Expandir contratos (paciente, encontro, nota) e alinhar respostas da API.

