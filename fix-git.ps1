<#
  Script para detectar/instalar Git, ajustar PATH e inicializar o repositório local.
  Execute no diretório do projeto. Preferível rodar PowerShell como Administrador.
#>

function Test-Command($name){ return [bool](Get-Command $name -ErrorAction SilentlyContinue) }

$repoDir = (Get-Location).Path
Write-Host "Diretório do projeto: $repoDir" -ForegroundColor Cyan

# Verificar git
if (Test-Command git) {
    $gitExe = (Get-Command git).Source
    Write-Host "Git detectado em: $gitExe" -ForegroundColor Green
} else {
    # Tentar localizar instalação padrão
    $candidates = @(
        "${env:ProgramFiles}\Git\cmd\git.exe",
        "${env:ProgramFiles(x86)}\Git\cmd\git.exe"
    )
    $gitExe = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

    if (-not $gitExe) {
        Write-Host "Git não encontrado. Baixando instalador (Git for Windows)..." -ForegroundColor Yellow
        $installer = "$env:TEMP\GitInstaller.exe"
        $url = "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe"
        try {
            Invoke-WebRequest -Uri $url -OutFile $installer -UseBasicParsing -ErrorAction Stop
            Write-Host "Instalador baixado em $installer" -ForegroundColor Green
            Write-Host "Executando instalador em modo silencioso. Pode pedir UAC..." -ForegroundColor Yellow
            Start-Process -FilePath $installer -ArgumentList '/VERYSILENT','/NORESTART','/SUPPRESSMSGBOXES' -Wait
            Remove-Item $installer -ErrorAction SilentlyContinue
        } catch {
            Write-Host "Falha ao baixar/instalar Git: $_" -ForegroundColor Red
        }

        # Procurar novamente
        $gitExe = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
    }

    if ($gitExe) {
        Write-Host "Git instalado em: $gitExe" -ForegroundColor Green
    } else {
        Write-Host "Git não foi encontrado/instalado automaticamente. Instale manualmente de https://git-scm.com/download/win" -ForegroundColor Red
        return
    }
}

# Atualizar PATH na sessão atual (concatena Machine + User)
$machinePath = [Environment]::GetEnvironmentVariable("Path","Machine")
$userPath = [Environment]::GetEnvironmentVariable("Path","User")
$combined = if ($machinePath) { $machinePath } else { "" }
if ($userPath) { $combined += ";" + $userPath }
$env:Path = $combined

# Garantir que o diretório do git esteja no PATH para a sessão
$gitDir = Split-Path -Parent $gitExe
if ($env:Path -notlike "*$gitDir*") {
    $env:Path = "$env:Path;$gitDir"
}

# Confirmar versão
try {
    & git --version
} catch {
    Write-Host "Erro ao executar git --version: $_" -ForegroundColor Red
    # tentar usar caminho completo
    if (Test-Path $gitExe) { & $gitExe --version } else { return }
}

# Configurar Git globalmente
& git config --global user.name "Matheus Assali"
& git config --global user.email "seu.email@exemplo.com"
& git config --global init.defaultBranch main
& git config --global core.autocrlf true

Write-Host "Configurações Git aplicadas." -ForegroundColor Green

# Inicializar repositório se necessário
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositório Git local..." -ForegroundColor Cyan
    & git init
}

# Criar .gitignore mínimo se não existir
if (-not (Test-Path ".gitignore")) {
    @"
# Node
node_modules/
npm-debug.log*

# Dados sensíveis
*.env
.env*
credentials.json

# Sistema
.DS_Store
Thumbs.db
"@ | Out-File -Encoding utf8 .gitignore
    Write-Host ".gitignore criado." -ForegroundColor Green
}

# Fazer stage e commit inicial (se houver mudanças)
& git add -A
try {
    & git commit -m "Versão inicial do prontuário digital" 2>$null
    Write-Host "Commit inicial criado." -ForegroundColor Green
} catch {
    Write-Host "Nenhum commit necessário ou commit falhou (possivelmente já existe)." -ForegroundColor Yellow
}

# ---- Novo: gerenciar remote, sync e push ----
$remoteUrl = "https://github.com/MatheusAssali/prontuario-digital.git"

# Detectar se remote 'origin' existe
$remotes = (& git remote) -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }
$hasOrigin = $remotes -contains 'origin'

if (-not $hasOrigin) {
    Write-Host "Adicionando remote origin -> $remoteUrl" -ForegroundColor Cyan
    try { & git remote add origin $remoteUrl } catch { Write-Host "Falha ao adicionar remote: $_" -ForegroundColor Red }
} else {
    Write-Host "Remote 'origin' já existe." -ForegroundColor Cyan
}

# Buscar dados remotos
Write-Host "Fazendo fetch do origin..." -ForegroundColor Cyan
try { & git fetch origin } catch { Write-Host "Aviso: fetch pode ter falhado: $_" -ForegroundColor Yellow }

# Verificar se origin/main existe
$originMainRef = (& git ls-remote --heads origin main) -ne $null
if ($originMainRef) {
    Write-Host "O branch origin/main existe. Tentando rebase local/main sobre origin/main (automatic stash habilitado)..." -ForegroundColor Cyan
    try {
        & git pull --rebase --autostash origin main
        Write-Host "Rebase concluído com sucesso." -ForegroundColor Green
    } catch {
        Write-Host "Erro durante git pull --rebase. O rebase pode ter conflitos." -ForegroundColor Red
        Write-Host "Abra o repositório no VSCode e resolva os conflitos manualmente:" -ForegroundColor Yellow
        Write-Host "  1) git status" -ForegroundColor Yellow
        Write-Host "  2) Resolva arquivos com conflitos, faça 'git add <arquivo>'" -ForegroundColor Yellow
        Write-Host "  3) git rebase --continue" -ForegroundColor Yellow
        Write-Host "Depois de resolver, rode: git push origin main" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "origin/main não existe — branch remoto vazio. Prosseguindo para push." -ForegroundColor Cyan
}

# Tentar push normal
Write-Host "Enviando para origin/main..." -ForegroundColor Cyan
try {
    & git push -u origin main
    Write-Host "Push concluído com sucesso." -ForegroundColor Green
} catch {
    Write-Host "Push falhou: $_" -ForegroundColor Red
    $answer = Read-Host "Deseja forçar o push (SUBSTITUIR o histórico remoto)? (y/N)"
    if ($answer -match '^[Yy]') {
        try {
            Write-Host "Executando git push --force..." -ForegroundColor Yellow
            & git push -u origin main --force
            Write-Host "Push forçado concluído." -ForegroundColor Green
        } catch {
            Write-Host "Push forçado falhou: $_" -ForegroundColor Red
            Write-Host "Recomendo resolver divergências localmente e usar pull/rebase antes de push." -ForegroundColor Yellow
            exit 1
        }
    } else {
        Write-Host "Operação abortada. Use 'git pull --rebase origin main' para sincronizar ou resolva manualmente." -ForegroundColor Yellow
    }
}

# Mensagem final resumida
Write-Host @"
Operação finalizada.

Se houver problemas de merge/conflict, faça:
  git status
  resolva arquivos, git add <arquivo>
  git rebase --continue
  git push origin main

Se preferir criar o repo via gh (CLI) e autopush:
  gh repo create MatheusAssali/prontuario-digital --private --source=. --remote=origin --push

"@ -ForegroundColor Cyan