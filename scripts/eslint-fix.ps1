Param(
    [string]$Path = "."
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$env:COREPACK_ENABLE_STRICT = '0'

function Test-CommandExists($name) { return $null -ne (Get-Command $name -ErrorAction SilentlyContinue) }
function Write-Log([string]$msg) { Write-Host "[eslint:fix] $msg" -ForegroundColor Yellow }

Push-Location (Join-Path $PSScriptRoot '..')
try {
    Write-Log "Auto-fixing ESLint issues in $Path"
    # 1) Prefer Docker container (dependencies installed and consistent)
    $apiUp = (& docker compose ps --format json 2>$null | ConvertFrom-Json | Where-Object { $_.Name -like '*prontuario-api*' -and $_.State -eq 'running' })
    if ($apiUp) {
        Write-Log "Running inside docker compose api"
        $bin = docker compose exec -T api node -e "const p=require.resolve('eslint/package.json');process.stdout.write(p.replace('package.json','bin/eslint.js'))" 2>$null
        if ($bin) { docker compose exec -T api node $bin $Path --fix --max-warnings=0 --format=stylish }
        else { docker compose exec -T api npx --yes eslint $Path --fix --max-warnings=0 --format=stylish }
    }
    else {
        # 2) Ensure local dependencies are installed (flat config needs peer packages)
        $nodeModulesPath = Join-Path (Get-Location) "node_modules"
        $localEslintBin = Join-Path (Get-Location) "node_modules/.bin/eslint"
        if (-not (Test-Path $nodeModulesPath) -or -not (Test-Path $localEslintBin)) {
            if (Test-CommandExists npm) {
                Write-Log "Installing project dependencies with npm (first-run)"
                npm install --silent | Write-Host
            }
            else {
                throw "npm not available to install dependencies."
            }
        }

        # 3) Local project binary (preferred)
        if (Test-Path $localEslintBin) {
            & $localEslintBin $Path --fix --max-warnings=0 --format=stylish
        }
        elseif (Test-CommandExists npx) {
            # 4) Fallback to npx
            npx --yes eslint $Path --fix --max-warnings=0 --format=stylish
        }
        else {
            throw "No runner found (docker, local bin, npx). Install Node.js tooling."
        }
    }
}
finally { Pop-Location }
