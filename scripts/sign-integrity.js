// scripts/sign-integrity.js — assina integrity.json com chave externa (ed25519)
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import url from "node:url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pubDir = path.join(__dirname, "..", "public");
const integ = fs.readFileSync(path.join(pubDir, "integrity.json"));
let privPem;
try {
  privPem = fs.readFileSync(path.join(__dirname, "priv_ed25519.pem"));
} catch (e) {
  console.error(
    "[sign-integrity] Gere uma chave ed25519 e salve em scripts/priv_ed25519.pem",
  );
  console.error(
    "Ex.: openssl genpkey -algorithm ed25519 -out scripts/priv_ed25519.pem && openssl pkey -in scripts/priv_ed25519.pem -pubout -out public/integrity_pub.pem",
  );
  process.exit(1);
}
const sign = crypto.sign(null, integ, crypto.createPrivateKey(privPem));
fs.writeFileSync(path.join(pubDir, "integrity.json.sig"), sign);
console.log("[sign-integrity] Assinado. Pub em public/integrity_pub.pem");
