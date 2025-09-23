#!/usr/bin/env bash
set -Eeuo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$here"

log() { printf "\033[1;32m[dev:up]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[dev:up]\033[0m %s\n" "$*"; }
err() { printf "\033[1;31m[dev:up]\033[0m %s\n" "$*"; }

# Aviso sobre NTFS/OneDrive
case "$PWD" in
  /mnt/c/*) warn "Rodando sob /mnt/c (NTFS/OneDrive). Pode causar lentidão/bugs. Ideal: mover o repo para WSL (ext4)." ;;
esac

# Deps Linux (best-effort, sem travar)
if command -v apt-get >/dev/null 2>&1; then
  if [ "$(id -u)" = "0" ]; then
    log "Instalando deps Linux (root)..."
    apt-get update -y >/dev/null 2>&1 || true
    apt-get install -y postgresql-client curl jq netcat-openbsd >/dev/null 2>&1 || true
  else
    log "Tentando deps Linux via sudo (best-effort)..."
    sudo -n apt-get update -y >/dev/null 2>&1 || true
    sudo -n apt-get install -y postgresql-client curl jq netcat-openbsd >/dev/null 2>&1 || true
  fi
fi

# PNPM approve-builds (Prisma/esbuild) - best-effort
if pnpm --help 2>/dev/null | grep -q approve-builds; then
  pnpm approve-builds @prisma/client @prisma/engines prisma || true
  pnpm --dir webapp approve-builds esbuild || true
fi

log "Instalando dependências (root e webapp)..."
pnpm i --frozen-lockfile || pnpm i
pnpm --dir webapp i --frozen-lockfile || pnpm --dir webapp i

# Banco (Docker) + health
db_svc="db"
db_host="${DB_HOST:-127.0.0.1}"
db_port="${DB_PORT:-5432}"
log "Subindo Postgres via Docker Compose..."
docker rm -f prontuario-db 2>/dev/null || true
docker compose up -d "$db_svc"

log "Aguardando Postgres em ${db_host}:${db_port}..."
for i in {1..60}; do
  if nc -z "$db_host" "$db_port" 2>/dev/null; then break; fi
  sleep 0.5
done
nc -z "$db_host" "$db_port" || { err "Postgres não respondeu em ${db_host}:${db_port}"; exit 1; }

log "Aplicando migrations Prisma..."
pnpm run prisma:migrate || true
pnpm run prisma:generate || true

# Mata processos presos nas portas
kill_port() {
  local p="$1"
  ss -ltnp 2>/dev/null | grep -E ":${p} " | sed -E 's/.*pid=([0-9]+),.*/\1/' | xargs -r kill -9 || true
}
kill_port 3030
kill_port 5173

log "Subindo API (server)..."
nohup node ./server/server-pro.cjs > server-dev.log 2>&1 &
api_pid=$!

log "Aguardando API em :3030..."
for i in {1..80}; do
  if ss -ltnp 2>/dev/null | grep -q ":3030 "; then break; fi
  sleep 0.25
done
ss -ltnp 2>/dev/null | grep -q ":3030 " || { err "API não subiu (porta 3030). Veja server-dev.log"; exit 1; }

log "Subindo WEB (Vite dev)..."
nohup pnpm --dir webapp run dev > webapp-dev.log 2>&1 &
web_pid=$!

log "Aguardando WEB em :5173..."
for i in {1..80}; do
  if ss -ltnp 2>/dev/null | grep -q ":5173 "; then break; fi
  sleep 0.25
done
ss -ltnp 2>/dev/null | grep -q ":5173 " || { err "WEB não subiu (porta 5173). Veja webapp-dev.log"; exit 1; }

echo "$api_pid" > .server.pid
echo "$web_pid" > .web.pid

log "DEV READY → API: http://127.0.0.1:3030  |  WEB: http://127.0.0.1:5173"
log "Logs: tail -f server-dev.log  |  tail -f webapp-dev.log"