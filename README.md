# Prontuário Digital — Pacientes (PR5) + Evoluções (PR6)

## Como rodar no WSL2 (Ubuntu 24.04)

```bash
# Pré-requisitos
# - Node.js 20 ou 22 (nvm use 22)
# - Docker + Docker Compose (Postgres 16 + Redis 7)
# - corepack enable || true

cp .env.example .env

# Suba os serviços de dados
docker compose up -d db redis

# Instale dependências com devDependencies obrigatórias
npm ci --include=dev
(cd webapp && npm ci --include=dev)

# Aplique as migrações e gere o Prisma Client
npx prisma migrate deploy
npx prisma generate

# Rode os servidores
npm run dev                      # API Express (porta 3030)
(cd webapp && npm run dev -- --host 0.0.0.0 --port ${WEBAPP_PORT:-5173})
```

> **Importante:** este repositório ainda contém `node_modules/` commitados a partir do Windows.
> Em WSL2/Linux, execute `rm -rf node_modules webapp/node_modules && npm ci --include=dev && (cd webapp && npm ci --include=dev)`
> caso encontre erros `vite: Permission denied` ou binários faltantes.

### Variáveis de ambiente relevantes (SSO / Prescrições)

```
MEMED_MODE=print                 # use sso_birdid quando configurar o Bird ID
BIRDID_ISSUER=https://birdid.example.com
BIRDID_CLIENT_ID=birdid-client-id
BIRDID_REDIRECT_URI=http://localhost:3030/auth/callback
MEMED_SSO_URL=https://app.memed.com.br/sso
MEMED_RETURN_URL=http://localhost:5173/prescricoes
SESSION_SECRET=troque-isto
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
- `POST   /api/v1/encounters` — registra encontro clínico (INITIAL/FOLLOW_UP).
- `GET    /api/v1/encounters?patient_id=` — lista encontros com nota mais recente.
- `GET    /api/v1/encounters/:id` — detalhes do encontro + notas/versões.
- `POST   /api/v1/notes` — cria evolução (v1) com template clínico.
- `PUT    /api/v1/notes/:id` — autosave/versionamento append-only.
- `GET    /api/v1/notes/:id` / `/versions` — leitura + histórico completo.
- `POST   /api/v1/attachments` — upload seguro (pdf/png/jpg/jpeg ≤ 10 MB).
- `GET    /api/v1/attachments/:id/download` — download com Content-Disposition.

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

## Auditoria e timeline

Cada mutação cria eventos encadeados (`hashPrev` + SHA-256) em `Event` e registra auditoria append-only (`AuditLog`).
A timeline apresenta agrupamento por dia com ícones contextuais (cadastro, evolução, anexos, prescrições etc.).

## Scripts úteis

- `npm run lint` / `npm run typecheck` / `npm run build` — checagens na raiz (TypeScript limitado a arquivos do servidor/scripts).
- `cd webapp && npm run lint` — lint escopado para a página de Pacientes e store.
- `cd webapp && npm run typecheck` — garante typings do módulo de Pacientes.
- `cd webapp && npm run build` — **pode exigir reinstalação das dependências** devido a artefatos do Windows (ver observação acima).
- `npm run prisma:migrate` — aplica migrações em produção; `npm run prisma:migrate:dev` para ciclos locais.

## Observações

- Seeds/fixtures não são versionados; utilize scripts locais conforme necessidade.
- A limpeza pesada dos diretórios `node_modules/`, `dist/`, `exports/`, `data/` e `certs/` será coordenada via issue dedicada.
- Timezone padrão GMT-3 (America/Sao_Paulo) para métricas e timeline.
