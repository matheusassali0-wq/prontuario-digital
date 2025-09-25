#!/bin/bash
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$ROOT_DIR/api.log"

log_step() {
  echo -e "${YELLOW}$1${NC}"
}

log_success() {
  echo -e "${GREEN}$1${NC}"
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo -e "${RED}Comando '$1' não encontrado. Instale-o antes de continuar.${NC}" >&2
    exit 1
  fi
}

require_cmd docker
require_cmd curl
require_cmd nc
require_cmd npx

log_step "[1] Removendo volume antigo do Postgres..."
docker volume rm prontuario-digital_pg_data >/dev/null 2>&1 || true

log_step "[2] Subindo Postgres e Redis..."
docker compose -f "$ROOT_DIR/docker-compose.yml" up -d postgres redis

log_step "[3] Aguardando Postgres..."
for i in $(seq 1 60); do
  if nc -z 127.0.0.1 5432 >/dev/null 2>&1; then
    log_success "Postgres pronto"
    break
  fi
  sleep 1
  if [[ $i -eq 60 ]]; then
    echo -e "${RED}Timeout aguardando Postgres (5432).${NC}" >&2
    exit 1
  fi
done

log_step "[4] Aguardando Redis..."
for i in $(seq 1 30); do
  if nc -z 127.0.0.1 6379 >/dev/null 2>&1; then
    log_success "Redis pronto"
    break
  fi
  sleep 1
  if [[ $i -eq 30 ]]; then
    echo -e "${RED}Timeout aguardando Redis (6379).${NC}" >&2
    exit 1
  fi
done

log_step "[5] Preparando Prisma e API..."
cd "$ROOT_DIR"
npx prisma generate
npx prisma migrate deploy || npx prisma db push

log_step "[6] Reiniciando servidor..."
pkill -f 'server-pro.cjs' >/dev/null 2>&1 || true
nohup npm run dev > "$LOG_FILE" 2>&1 & disown
sleep 2

log_step "[7] Testando endpoints..."
health_code=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3030/health || echo 000)
readyz_code=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3030/readyz || echo 000)

echo "HEALTH -> $health_code"
echo "READYZ -> $readyz_code"

if [[ $health_code =~ ^[23] && $readyz_code =~ ^[23] ]]; then
  log_success "✅ Tudo pronto! Logs: $LOG_FILE"
else
  echo -e "${RED}❌ Falha ao validar API. Consulte $LOG_FILE.${NC}" >&2
  exit 1
fi
