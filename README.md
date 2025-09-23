# Prontuário Digital — Pacientes (PR5) + Evoluções (PR6)

## Como rodar no WSL2 (Ubuntu 24.04)

```bash
# Pré-requisitos
# - Node.js 20 ou 22 (nvm use 22)
# - Docker + Docker Compose (Postgres 16 + Redis 7)
# - Corepack habilitado (usa PNPM)

corepack enable || true
cp .env.example .env

# Suba os serviços de dados
docker compose up -d postgres redis

# Instale dependências (raiz e webapp)
pnpm install
pnpm --dir webapp install

# Aplique as migrações e gere o Prisma Client (usa CLI local)
pnpm run prisma:migrate
pnpm run prisma:generate

# Rode os servidores (API habilita idempotência + export LGPD; webapp registra Service Worker)
pnpm run dev                      # API Express (porta 3030)
pnpm --dir webapp run dev -- --host 0.0.0.0 --port ${WEBAPP_PORT:-5173}
```

> Importante: se estiver trabalhando sob `/mnt/c` (NTFS/OneDrive), você pode ver lentidão e erros de permissão.
> Prefira clonar/mover o projeto para o filesystem do WSL (ext4), por exemplo `~/work/prontuario-digital`.
> Se necessário, limpe artefatos do Windows: `rm -rf node_modules webapp/node_modules && pnpm install && pnpm --dir webapp install`.

### Dica WSL/ext4 (espelhar do NTFS para ext4)

Se você já está com o repositório em `/mnt/c/...`, uma alternativa rápida é criar um espelho no ext4 do WSL e trabalhar a partir dele. Exemplo:

1. Dentro do WSL, crie um diretório de trabalho: `mkdir -p ~/work`
2. Copie do NTFS para o ext4: `rsync -a --delete "/mnt/c/Users/.../prontuario digital/" "~/work/prontuario-digital/"`
3. Abra o projeto a partir de `~/work/prontuario-digital` e rode os comandos com PNPM.

Os scripts `dev:*` já exibem um aviso ao detectar `/mnt/c`.

### Variáveis de ambiente relevantes (SSO / Prescrições / Offline)

```
SERVER_ENC_KEY=base64:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
MEMED_MODE=sso_birdid
BIRDID_ISSUER=https://SEU-ISSUER
BIRDID_CLIENT_ID=SEU-CLIENT-ID
BIRDID_REDIRECT_URI=http://localhost:5173/auth/callback
MEMED_SSO_URL=https://SEU-ENDPOINT-SSO-MEMED
MEMED_RETURN_URL=http://localhost:5173/prescricoes/retorno
APP_BASE_URL=http://localhost:5173
SESSION_SECRET=troque-isto-32chars
# Ajuste se quiser alterar o intervalo de replay no front (ms)
# VITE_OUTBOX_POLL_INTERVAL=1500
```

## Endpoints principais (`server/server-pro.cjs`)

- `GET    /api/v1/health` — status básico da API.
- `GET    /api/v1/patients` — listagem paginada com busca insensível.
- `GET    /api/v1/patients/metrics` — totais e indicadores da tela.
- `GET    /api/v1/patients/:id` — leitura de paciente.
- `POST   /api/v1/patients` — criação com validação Zod.
- `PUT    /api/v1/patients/:id` — atualização completa.
- `DELETE /api/v1/patients/:id` — remoção lógica (com eventos/auditoria).
- `GET    /api/v1/patients/:id/events` — timeline 360° (cadeia WORM).
<<<<<<< Updated upstream
- `GET    /api/pacientes/:id/export` — exporta JSON LGPD (paciente + evoluções + prescrições).
- `GET    /api/v1/settings` — configurações não secretas filtradas por RBAC.
- `PUT    /api/v1/settings/:key` — atualiza configurações (Admin + CSRF).
- `GET    /api/v1/secrets/:key/meta` / `PUT /api/v1/secrets/:key` — rotação AES-256-GCM de segredos.
- `GET    /api/v1/flags` / `PUT /api/v1/flags/:key` — feature flags versionadas com auditoria.
- `POST   /api/v1/settings/test/sso-birdid` — valida discovery OIDC (timeout 8s).
- `POST   /api/v1/settings/export` / `POST /api/v1/settings/import?dryRun=1` — exporta/importa JSON sem segredos.
=======
- `GET    /api/pacientes/:id/export/jsonld` — exporta JSON-LD LGPD (paciente + evoluções + prescrições).
>>>>>>> Stashed changes
- `POST   /api/v1/encounters` — registra encontro clínico (INITIAL/FOLLOW_UP).
- `GET    /api/v1/encounters?patient_id=` — lista encontros com nota mais recente.
- `GET    /api/v1/encounters/:id` — detalhes do encontro + notas/versões.
- `POST   /api/v1/notes` — cria evolução (v1) com template clínico.
- `PUT    /api/v1/notes/:id` — autosave/versionamento append-only.
- `GET    /api/v1/notes/:id` / `/versions` — leitura + histórico completo.
- `POST   /api/v1/attachments` — upload seguro (pdf/png/jpg/jpeg ≤ 10 MB).
- `GET    /api/v1/attachments/:id/download` — download com Content-Disposition.
- `GET    /api/docs` — OpenAPI 3.0.3 gerado a partir dos contratos Zod (zod-to-openapi).

## Frontend (`webapp/`)

- Página `/pacientes` com:
  - Busca debounced (320 ms) + destaque visual do termo.
  - Cards de métricas consumindo `/metrics`.
  - Formulário completo (react-hook-form + zod) com chips para alergias e tags.
  - Seleção ativa global (Zustand) + timeline dinâmica (`/events`).
  - Toasts de feedback e tratamento de erros HTTP padronizados.
- Página `/prontuarios` com:
  - Cabeçalho integrado ao Paciente ativo + ações rápidas.
  - Criação de encontros/notas a partir de templates reais (NEFROLOGIA — 1ª CONSULTA / RETORNO).
  - Editor com autosave (1,5 s), versionamento, restauração e anexos.
  - Command Palette (Ctrl/Cmd+K) com atalhos para nova evolução, anexar e imprimir.
  - Timeline 360° atualizada em tempo real (ENCOUNTER/NOTE_CREATE/NOTE_UPDATE/ATTACHMENT).
  - Rota dedicada `/prontuarios/imprimir/:noteId` com layout print-friendly (A4, cabeçalho Dr. Matheus).
- Indicador de conectividade na topbar (online/offline) com contador de pendências e botão “Sincronizar agora”.
- Service Worker (`public/sw.js`) com cache estático + stale-while-revalidate para `GET /api/**` e fallback `offline.html`.
- Fila Outbox (IndexedDB) intercepta `fetch` de mutações, gera IDs clientes (`cid-*`) e reenvia com `X-Idempotency-Key`.

## Offline-first & Idempotência (PR9)

- Interceptor `offline/fetchInterceptor.ts` adiciona `X-Idempotency-Key` e, quando offline ou em erro de rede, enfileira mutações no IndexedDB.
- Worker `offline/sync.ts` processa lotes (backoff 2s → 16s), sincroniza automaticamente ao voltar a conexão e mantém mapa `cid → serverId`.
- API (`server/server-pro.cjs`) persiste dedupe em Redis (quando configurado) ou em memória, responde replays sem duplicar timeline e registra auditoria WORM (`hashPrev` + SHA-256).
- Export LGPD disponível em `/api/pacientes/:id/export`, com auditoria `EXPORT_PATIENT_JSON` sem PII adicional.
- Banner “Modo offline” e pill “Sincronizar” exibem estado em tempo real; pending count refletido via Zustand.

## Auditoria e timeline

Cada mutação cria eventos encadeados (`hashPrev` + SHA-256) em `Event` e registra auditoria append-only (`AuditLog`).
A timeline apresenta agrupamento por dia com ícones contextuais (cadastro, evolução, anexos, prescrições etc.).

## Scripts úteis

- `pnpm run lint` / `pnpm run typecheck` / `pnpm run build` — checagens na raiz (TypeScript limitado a arquivos do servidor/scripts).
- `pnpm --dir webapp run lint` — lint escopado para a página de Pacientes e store.
- `pnpm --dir webapp run typecheck` — garante typings do módulo de Pacientes.
- `pnpm --dir webapp run build` — pode exigir reinstalação das dependências devido a artefatos do Windows.
- `pnpm run prisma:migrate` — aplica migrações; `pnpm run prisma:migrate:dev` para ciclos locais.

## Observações

- Seeds/fixtures não são versionados; utilize scripts locais conforme necessidade.
- A limpeza pesada dos diretórios `node_modules/`, `dist/`, `exports/`, `data/` e `certs/` será coordenada via issue dedicada.
- Timezone padrão GMT-3 (America/Sao_Paulo) para métricas e timeline.

## Testes rápidos e ciclo de desenvolvimento

Testes:

- Testes de contratos (Zod runtime): pnpm run test:contracts
- Teste de idempotência (replay do mesmo corpo): pnpm run test:idempotency
- Teste de sequência (números de prescrição crescentes): pnpm run test:sequence

Pré‑requisitos:

- Postgres ativo (docker compose up -d db) e .env configurado.
- Servidor em execução em http://127.0.0.1:3030 (pnpm run dev ou pnpm run start:prod).

Ciclo dev:

- Subir ambiente e iniciar servidor: pnpm run dev:up
- Encerrar containers: pnpm run dev:down
- Reparar dependências e Prisma: pnpm run dev:repair

## Review Apps (Docker Compose)

Para testar um ambiente end-to-end (Postgres + API + Web) com imagens leves do Node 22:

- Subir: `pnpm run review:up`
- Acompanhar logs: `pnpm run review:logs`
- Derrubar e limpar volume: `pnpm run review:down`

Parâmetros opcionais:

- `PR_NUMBER`: define o sufixo do volume do Postgres (default: local)
- `API_PORT` / `WEB_PORT`: portas de publicação (default: 3030/5173)

## PNPM + Corepack e CI

- Ative o Corepack e padronize PNPM localmente:
  - corepack enable
  - corepack prepare pnpm@latest --activate
- Instalação com lockfile travado (CI): `pnpm install --frozen-lockfile`
- Cache no CI: use o hash do pnpm-lock.yaml (raiz e webapp/, se aplicável).

Observação: Removidos package-lock.json da raiz e de webapp/ para evitar divergências entre gerenciadores.

## WSL/ext4 e execução segura

- Este projeto espera WSL/Linux em filesystem ext4. Evite trabalhar sob `/mnt/c/` (OneDrive/NTFS), pois causa problemas de performance e permissões.
- Os scripts `dev:*` executam um preflight (`scripts/doctor-env.mjs`) e emitem aviso ao detectar `/mnt/c`. Para ignorar temporariamente (por sua conta e risco), use `pnpm run dev:noguard`.
- Para reduzir atrito sob NTFS, os scripts preferem um store do PNPM em `$HOME/.pnpm-store`.
