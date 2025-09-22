import os from 'node:os';
import path from 'node:path';

function isWSL() {
  const rel = os.release().toLowerCase();
  return rel.includes('microsoft') || Boolean(process.env.WSL_DISTRO_NAME);
}

function isWindowsMount(p) {
  return p.startsWith('/mnt/c/') || p.startsWith('/mnt/d/') || p.startsWith('/mnt/e/');
}

const cwd = process.cwd();

if (process.platform === 'linux' && isWSL() && isWindowsMount(cwd)) {
  console.error('\n[ENV GUARD] Este repositório está em \\wsl$? Certifique-se de CLONAR dentro do WSL (ex.: ~/projetos), não em /mnt/c (OneDrive).');
  console.error(`[ENV GUARD] Diretório atual: ${cwd}`);
  process.exit(1);
}

// Optional: Block Node on Windows directly (non-WSL)
if (process.platform === 'win32') {
  console.error('\n[ENV GUARD] Execução direta no Windows detectada. Utilize WSL/Linux para evitar problemas de filesystem e binários.');
  process.exit(1);
}

// Everything looks fine
if (process.env.NODE_ENV !== 'test') {
  console.log('[ENV] OK');
}
