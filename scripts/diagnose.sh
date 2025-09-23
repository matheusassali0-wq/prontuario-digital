#!/usr/bin/env bash
set -Eeuo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$here"

log() { printf "\033[1;34m[diagnose]\033[0m %s\n" "$*"; }
err() { printf "\033[1;31m[diagnose]\033[0m %s\n" "$*"; }

log "docker compose ps"
docker compose ps || true

log "Últimos logs (200 linhas) por serviço"
for svc in postgres redis api webapp; do
  log "-- $svc"
  docker compose logs --tail=200 "$svc" || true
done

log "Health endpoints"
for path in /healthz /readyz /metrics /api/v1/health; do
  log "curl -fsS http://127.0.0.1:3030$path"
  curl -fsS "http://127.0.0.1:3030$path" || true
  echo
done

log "Prisma status"
( docker compose exec -T api npx prisma migrate status || true )
( docker compose exec -T api npx prisma check || true )

log "Redis PING"
( docker compose exec -T redis redis-cli PING || true )

log "Tempo de resposta /readyz"
SECS=$( ( time -p curl -fsS http://127.0.0.1:3030/readyz >/dev/null ) 2>&1 | awk '/real/{print $2}' || echo "0" )
log "readyz em ${SECS}s"

log "Dicas comuns"
echo "- Se /readyz falhou em Postgres, verifique DATABASE_URL e migrations pendentes"
echo "- Se Redis falhou, verifique REDIS_URL e porta 6379"
echo "- Se a web não abre, valide Vite em 5173 e API_BASE no client"
