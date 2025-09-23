$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$env:COREPACK_ENABLE_STRICT = '0'

function Test-CommandExists($name) { return $null -ne (Get-Command $name -ErrorAction SilentlyContinue) }
function Write-Log([string]$msg) { Write-Host "[prettier] $msg" -ForegroundColor Green }

Push-Location (Join-Path $PSScriptRoot '..')
try {
    Write-Log "Formatting repository"
    if (Test-CommandExists npx) {
        npx --yes prettier -w .
    }
    elseif (Test-CommandExists pnpm) {
        pnpm dlx prettier -w .
    }
    else {
        throw "Neither pnpm nor npx available to run prettier."
    }
}
finally { Pop-Location }
