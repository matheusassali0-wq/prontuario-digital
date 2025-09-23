#!/usr/bin/env bash
set -Eeuo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$here"
log() { printf "\033[1;36m[dev:repair]\033[0m %s\n" "$*"; }
err() { printf "\033[1;31m[dev:repair]\033[0m %s\n" "$*"; }

log "Encerrando dev atual..."
bash ./scripts/dev-down.sh || true

log "Limpando caches (node_modules, store PNPM, dist/)..."
rm -rf node_modules webapp/node_modules || true
pnpm store prune || true
find . -type d \( -name dist -o -name .next -o -name .turbo \) -prune -exec rm -rf {} + || true

log "Reinstalando dependências..."
# Prefira store do PNPM no HOME (melhor sob WSL/NTFS)
export PNPM_STORE_DIR="${PNPM_STORE_DIR:-$HOME/.pnpm-store}"
pnpm i || true
pnpm --dir webapp i || true

log "Regerando Prisma client..."
pnpm run prisma:generate || true

log "Ajustando permissões básicas..."
git config core.filemode false || true
find scripts -type f -name '*.sh' -exec chmod +x {} \; || true

log "Revalidando health da API..."
nohup node ./server/server-pro.cjs > server-repair.log 2>&1 &
apid=$!
for i in {1..80}; do
  if ss -ltnp 2>/dev/null | grep -q ":3030 "; then break; fi
  sleep 0.25
done
if ss -ltnp 2>/dev/null | grep -q ":3030 "; then
  curl -fsS http://127.0.0.1:3030/api/v1/health >/dev/null 2>&1 || curl -fsS http://127.0.0.1:3030/api/health >/dev/null 2>&1 || true
  kill "$apid" 2>/dev/null || true
  log "Health OK na porta 3030."
else
  err "API não subiu na porta 3030. Veja server-repair.log"
  exit 1
fi

log "Repair concluído."
