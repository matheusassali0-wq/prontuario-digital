import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(path.join(__dirname, '..'));

const dataDir = path.join(root, 'data');
const serverUploads = path.join(root, 'server', 'uploads');

const demoFiles = [
  'pacientes.json',
  'evolucoes.json',
  'prescricoes.json',
  'counters.json',
  'timeline.json',
  'idempotency.json',
  'audit.json',
];

async function removeIfExists(targetPath) {
  try {
    await fs.rm(targetPath, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true }).catch(() => undefined);
}

async function main() {
  console.log('> Reset demo data files...');
  await ensureDir(dataDir);
  for (const file of demoFiles) {
    const fp = path.join(dataDir, file);
    const removed = await removeIfExists(fp);
    if (removed) console.log('  - removed', path.relative(root, fp));
  }

  console.log('> Reset uploads directory...');
  await removeIfExists(serverUploads);
  await ensureDir(serverUploads);
  console.log('  - uploads directory cleared');

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
