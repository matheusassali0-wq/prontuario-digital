#!/usr/bin/env bash
set -Eeuo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$here"
log() { printf "\033[1;35m[dev:down]\033[0m %s\n" "$*"; }

purge=0
if [[ "${1:-}" == "--purge" ]]; then purge=1; fi

log "Parando stack (docker compose down)"
if [[ "$purge" == "1" ]]; then
  log "Purge de volumes habilitado (irá remover pg_data)."
  docker compose down -v || true
else
  docker compose down || true
fi

log "OK."
