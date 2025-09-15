# Função para verificar se um comando existe
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Configurar política de execução
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Instalar Git se não estiver instalado
if (-not (Test-Command git)) {
    Write-Host "Instalando Git..." -ForegroundColor Yellow
    Start-Process "https://git-scm.com/download/win"
    Write-Host "Por favor, instale o Git e pressione Enter para continuar..." -ForegroundColor Yellow
    Read-Host
}

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
*_backup*
*.bak
"@

$gitignore | Out-File ".gitignore" -Encoding utf8

# Inicializar repositório
git init
git add .
git commit -m "Versão inicial do prontuário digital"
git branch -M main

# Criar repositório no GitHub (necessário fazer manualmente)
Write-Host @"
Por favor, siga estes passos:

1. Acesse https://github.com/new
2. Nome do repositório: prontuario-digital
3. Descrição: Sistema de Prontuário Eletrônico para Nefrologia
4. Selecione: Private
5. Crie o repositório
6. Execute estes comandos após criar:

git remote add origin https://github.com/MatheusAssali/prontuario-digital.git
git push -u origin main

"@ -ForegroundColor Green

# Instalar dependências Node
npm install

Write-Host "Setup concluído!" -ForegroundColor Green
