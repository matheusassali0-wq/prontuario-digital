# Função para verificar se um comando existe
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Verificar se está rodando como administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "⚠️ Este script precisa ser executado como Administrador!" -ForegroundColor Red
    Write-Host "Por favor, execute o PowerShell como Administrador e tente novamente." -ForegroundColor Yellow
    Write-Host "`nPasso a passo:" -ForegroundColor Cyan
    Write-Host "1. Pressione Windows + X" -ForegroundColor White
    Write-Host "2. Selecione 'Windows PowerShell (Admin)' ou 'Terminal (Admin)'" -ForegroundColor White
    Write-Host "3. Navegue até a pasta do projeto:" -ForegroundColor White
    Write-Host "   cd '$PSScriptRoot'" -ForegroundColor White
    Write-Host "4. Execute o script:" -ForegroundColor White
    Write-Host "   .\setup.ps1" -ForegroundColor White
    Read-Host -Prompt "Pressione Enter para sair..."
    exit 1
}

# Configurar política de execução temporariamente
$originalExecutionPolicy = $null

# Definir caminho de cache do Chrome para uso posterior
$chromeCachePath = Join-Path $env:LOCALAPPDATA 'Google\Chrome\User Data\Default\Cache'

try {
    Write-Host "🔒 Configurando política de execução..." -ForegroundColor Yellow
    # Obter a política atual para restaurar depois
    $originalExecutionPolicy = Get-ExecutionPolicy

    # Verificar ambiente Node.js
    Write-Host "🔍 Verificando ambiente Node.js..." -ForegroundColor Yellow
    if (-not (Test-Command node)) {
        Write-Host "❌ Node.js não encontrado! Por favor, instale o Node.js primeiro:" -ForegroundColor Red
        Write-Host "https://nodejs.org/en/download/" -ForegroundColor Cyan
        Read-Host -Prompt "Pressione Enter após instalar o Node.js..."
        exit 1
    }
    $nodeVersion = (& node --version) 2>$null
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green

    Start-Process "https://git-scm.com/download/win"
    Write-Host "Por favor, instale o Git e pressione Enter para continuar..." -ForegroundColor Yellow
    Read-Host

    # Configurar Git
    $gitConfig = @"
[user]
    name = Matheus Assali
    email = seu.email@exemplo.com
[init]
    defaultBranch = main
[core]
    editor = code --wait
    autocrlf = true
[color]
    ui = auto
"@

    $gitConfig | Out-File "$env:USERPROFILE\.gitconfig" -Encoding utf8

    # Criar .gitignore
    $gitignore = @"
# Dados sensíveis
*.env
.env*
credentials.json

# Node
node_modules/
npm-debug.log*

# Sistema
.DS_Store
Thumbs.db

# VS Code
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json

# Backups
"@

    # Inicializar repositório
    if (Test-Command git) {
        git init
        git add .
        try {
            git commit -m "Versão inicial do prontuário digital"
        }
        catch {
            Write-Host "⚠️ Aviso: commit inicial falhou: $_" -ForegroundColor Yellow
        }
        git branch -M main
    }
    else {
        Write-Host "⚠️ Git não encontrado: pulando inicialização do repositório." -ForegroundColor Yellow
    }

    # Criar repositório no GitHub (necessário fazer manualmente)
    $instructions = @'
Por favor, siga estes passos:

1. Acesse https://github.com/new
2. Nome do repositório: prontuario-digital
3. Descrição: Sistema de Prontuário Eletrônico para Nefrologia
4. Selecione: Private
5. Crie o repositório
6. Execute estes comandos após criar:

git remote add origin https://github.com/MatheusAssali/prontuario-digital.git
git push -u origin main
$githubUser = Read-Host "Digite seu nome de usuário do GitHub"
git remote add origin https://github.com/$githubUser/prontuario-digital.git
git push -u origin main

'@

    Write-Host $instructions -ForegroundColor Green
    if (Test-Command mkcert) {
        if (!(Test-Path ".\certs\localhost.pem") -or !(Test-Path ".\certs\localhost-key.pem")) {
            Write-Host "Certificados não encontrados, gerando novos..." -ForegroundColor Yellow

            # Gerar novos certificados
            if (!(Test-Path ".\certs")) {
                New-Item -ItemType Directory -Force -Path ".\certs"
            }

            mkcert -install
            mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1

            if (!(Test-Path ".\certs\localhost.pem")) {
                throw "Falha ao gerar certificados HTTPS"
            }
        }
    }
    else {
        Write-Host "⚠️ mkcert não encontrado. Instale mkcert antes de gerar certificados: https://github.com/FiloSottile/mkcert" -ForegroundColor Yellow
    }

    # Forçar limpeza de cache ao iniciar
    Write-Host "Limpando caches..." -ForegroundColor Yellow
    if (Test-Path "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache") {
        Remove-Item -Path "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache\*" -Force -Recurse -ErrorAction SilentlyContinue
    }
    $firefoxProfilesPath = Join-Path $env:APPDATA 'Mozilla\Firefox\Profiles'
    if (Test-Path $firefoxProfilesPath) {
        Get-ChildItem -Path $firefoxProfilesPath -Directory | ForEach-Object {
            $cachePath = Join-Path $_.FullName 'cache2\entries'
            if (Test-Path $cachePath) {
                Remove-Item -Path "$cachePath\*" -Force -Recurse -ErrorAction SilentlyContinue
            }
        }
    }

    # Remover caches específicos (silencioso se não existirem)
    Remove-Item -Path "$env:APPDATA\Mozilla\Firefox\Profiles\*\cache2\entries\*" -Force -Recurse -ErrorAction SilentlyContinue

}
finally {
    # Restaurar política de execução original, se foi obtida com sucesso
    if ($null -ne $originalExecutionPolicy) {
        Set-ExecutionPolicy -ExecutionPolicy $originalExecutionPolicy -Scope Process -Force
    }
}
