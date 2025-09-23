# Backlog Soul-MV — Limpeza e Integrações

## Contexto

O repositório possui artefatos binários e `node_modules/` versionados, o que impede PRs limpos (erro “generated diff exceeds our size limit”).

## Arquivos/dirs críticos (>256 KB ou alta contagem)

1. `Git-2.51.0-64-bit.exe` · 61.7 MB
2. `node_modules/**` e `webapp/node_modules/**` (milhares de arquivos)
3. `public/app/assets/**` (builds antigos)
4. `logs-*/` dentro de `webapp/`

## Proposta de limpeza (executar fora deste PR)

- PowerShell:
  ```powershell
  git add -A; git stash push -m "wip";
  git rm -r --cached node_modules dist build .next coverage logs 2>$null;
  git rm -r --cached exports data certs webapp/node_modules webapp/dist webapp/coverage 2>$null
  ```
- Bash:
  ```bash
  git add -A && git stash push -m "wip" --include-untracked
  git rm -r --cached node_modules dist build .next coverage logs || true
  git rm -r --cached exports data certs webapp/node_modules webapp/dist webapp/coverage || true
  ```
- Após a limpeza, ajustar `.gitignore` e reexecutar `npm ci --include=dev`.

## Seguimento

- Avaliar uso de `git filter-repo` ou `BFG Repo-Cleaner` para remover histórico pesado.
- Criar workflow de verificação para impedir commits com artefatos.
- Validar espaço em disco no GitHub após a limpeza.
