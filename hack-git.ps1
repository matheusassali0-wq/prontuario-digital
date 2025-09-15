# Bypass execution policy
$ErrorActionPreference = 'SilentlyContinue'
Set-ExecutionPolicy Bypass -Scope Process -Force

# Force remove existing .git and start fresh
Remove-Item -Recurse -Force .git
Remove-Item -Force .gitignore

# Initialize new repo
git init
git config --global --unset http.proxy
git config --global --unset https.proxy

# Create minimal gitignore
@"
node_modules/
.env
credentials.json
.DS_Store
"@ | Out-File -Encoding utf8 .gitignore

# Force add and commit
git add -A
git commit -m "Initial commit" --allow-empty

# Generate personal access token
$repo = "MatheusAssali/prontuario-digital"
$token = Read-Host -Prompt "Cole seu GitHub token" -AsSecureString
$token = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

# Force push with token auth
git remote remove origin
git remote add origin "https://$token@github.com/$repo.git"
git push -u origin main --force

Write-Host "Repositório hackeado com sucesso!" -ForegroundColor Green
