$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$env:COREPACK_ENABLE_STRICT = '0'

function Test-CommandExists($name) { return $null -ne (Get-Command $name -ErrorAction SilentlyContinue) }
function Write-Log([string]$msg) { Write-Host "[typecheck] $msg" -ForegroundColor Blue }

Push-Location (Join-Path $PSScriptRoot '..')
try {
    Write-Log "Running TypeScript typecheck"
    $apiUp = (& docker compose ps --format json 2>$null | ConvertFrom-Json | Where-Object { $_.Name -like '*prontuario-api*' -and $_.State -eq 'running' })
    if ($apiUp) {
        Write-Log "Running inside docker compose api"
        docker compose exec -T api npx --yes tsc -p . --noEmit
    }
    elseif (Test-CommandExists npx) {
        npx --yes tsc -p . --noEmit
    }
    elseif (Test-CommandExists pnpm) {
        pnpm dlx tsc -p . --noEmit
    }
    else {
        throw "Neither pnpm nor npx available to run tsc."
    }
}
finally { Pop-Location }
