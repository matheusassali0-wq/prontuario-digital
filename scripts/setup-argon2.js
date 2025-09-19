// scripts/setup-argon2.js — copia argon2-browser para public/argon2/
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const target = path.join(__dirname, "..", "public", "argon2");
fs.mkdirSync(target, { recursive: true });
try {
  const base = path.dirname(require.resolve("argon2-browser/dist/argon2.js"));
  for (const f of ["argon2.js", "argon2.wasm"])
    fs.copyFileSync(path.join(base, f), path.join(target, f));
  console.log("[setup-argon2] OK");
} catch (e) {
  console.error("[setup-argon2] Falhou. Rode: npm i argon2-browser");
  process.exit(1);
}
