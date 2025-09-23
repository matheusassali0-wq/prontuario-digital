Param(
    [switch]$Purge
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Log([string]$msg) {
    Write-Host "[dev:down] $msg" -ForegroundColor Magenta
}

Push-Location (Join-Path $PSScriptRoot '..')
try {
    if ($Purge) {
        Write-Log "docker compose down -v (purge volumes)"
        docker compose down -v | Write-Host
    } else {
        Write-Log "docker compose down"
        docker compose down | Write-Host
    }
}
finally {
    Pop-Location
}
