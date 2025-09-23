#!/usr/bin/env bash
set -Eeuo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$here"
log() { printf "\033[1;35m[dev:down]\033[0m %s\n" "$*"; }

# Mata por PID files
for f in .server.pid .web.pid; do
  if [ -f "$f" ]; then
    pid="$(cat "$f" || true)"
    if [ -n "${pid:-}" ]; then kill "$pid" 2>/dev/null || true; fi
    rm -f "$f"
  fi
done

# Mata por portas (fallback)
kill_port() {
  local p="$1"
  ss -ltnp 2>/dev/null | grep -E ":${p} " | sed -E 's/.*pid=([0-9]+),.*/\1/' | xargs -r kill -9 || true
}
kill_port 3030
kill_port 5173

# Para o DB (mantém volume)
log "Parando Postgres (docker compose stop db)..."
docker compose stop db 2>/dev/null || true

log "OK."
