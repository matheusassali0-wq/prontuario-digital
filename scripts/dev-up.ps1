Param(
    [switch]$Rebuild,
    [switch]$NoMigrate
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Log([string]$msg) {
    Write-Host "[dev:up] $msg" -ForegroundColor Cyan
}

Push-Location (Join-Path $PSScriptRoot '..')
try {
    Write-Log "Stack name: prontuario-digital"
    if ($Rebuild) {
        Write-Log "docker compose build --pull"
        docker compose build --pull | Write-Host
    }

    Write-Log "docker compose up -d"
    docker compose up -d | Write-Host

    if (-not $NoMigrate) {
        Write-Log "Generating Prisma client"
        docker compose exec -T api npx prisma generate | Write-Host
        Write-Log "Applying prisma migrate dev"
        docker compose exec -T api npx prisma migrate dev --name init | Write-Host
    }

    # Wait for /readyz
    $deadline = [DateTime]::UtcNow.AddMinutes(3)
    do {
        try {
            $res = curl.exe http://localhost:3030/readyz -sS --max-time 2
            if ($LASTEXITCODE -eq 0 -and $res) {
                $status = ($res | ConvertFrom-Json).status
                if ($status -eq 'ready') { break }
            }
        }
        catch {}
        Start-Sleep -Seconds 2
    } while ([DateTime]::UtcNow -lt $deadline)

    Write-Log "Endpoints:"
    Write-Host " - API:       http://localhost:3030" -ForegroundColor Green
    Write-Host " - Readiness: http://localhost:3030/readyz" -ForegroundColor Green
    Write-Host " - Webapp:    http://localhost:5173" -ForegroundColor Green
    Write-Log "Logs: docker compose logs -f api"
}
finally {
    Pop-Location
}
