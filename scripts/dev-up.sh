#!/usr/bin/env bash
set -Eeuo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$here"

log() { printf "\033[1;32m[dev:up]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[dev:up]\033[0m %s\n" "$*"; }
err() { printf "\033[1;31m[dev:up]\033[0m %s\n" "$*"; }

case "$PWD" in
  /mnt/c/*) warn "Rodando sob /mnt/c (NTFS/OneDrive). Use WSL (ext4) para melhor performance." ;;
esac

command -v docker >/dev/null || { err "Docker não encontrado"; exit 1; }
command -v docker compose >/dev/null || { err "Docker Compose V2 não encontrado"; exit 1; }

log "Build das imagens (api/webapp)";
docker compose build --pull || true

log "Subindo serviços (detached)";
docker compose up -d

if [[ "${ALLOW_RESET:-0}" == "1" ]]; then
  warn "ALLOW_RESET=1 → reset destrutivo está DESABILITADO por padrão. Habilite conscientemente se precisar."
fi

log "Instalando deps e gerando Prisma client (container api)";
docker compose exec -T api sh -lc "npm i --silent || true; npx prisma generate" || true

log "Aplicando migrations (dev) de forma segura";
docker compose exec -T api sh -lc "npx prisma migrate dev --name init" || true

log "Aguardando /readyz (API)";
for i in {1..60}; do
  if curl -fsS http://127.0.0.1:3030/readyz >/dev/null 2>&1; then
    ok=1; break
  fi
  sleep 2
done
if [[ "${ok:-}" != "1" ]]; then
  err "API não ficou pronta (/readyz). Veja: docker compose logs api"; exit 1
fi

log "Ambiente pronto: API http://127.0.0.1:3030  |  WEB http://127.0.0.1:5173"
log "Logs: docker compose logs -f api | docker compose logs -f webapp"
