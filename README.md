# Medical System — v3.1 

**Conteúdo:** Frontend (public/) + Backend (server/) com HTTPS (mkcert), COOP/COEP (crossOriginIsolated), assinatura de integridade (manifesto), **vault E2EE** (/vault/put, /vault/get), **MFA (TOTP)**, **KDF Argon2id (WASM) com fallback PBKDF2**, **busca por substring (índice HMAC n‑gram)** e **rate limit**.

## Rodar com HTTPS local (mkcert)
```bash
# 1) Gere certificados locais:
#    https://github.com/FiloSottile/mkcert
mkcert -install
mkdir certs
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1

# 2) Instale deps para Argon2 (opcional, cliente) e rode o servidor
npm install
npm run setup-argon2   # copia argon2.wasm/js para public/argon2 (opcional, ativa KDF Argon2id)
npm start              # HTTPS em https://localhost:5173
```

> Sem certificados, o servidor cai para **HTTP** (apenas dev). Para **WASM/COI** completo, use HTTPS + COOP/COEP (já aplicados).

## Scripts npm
- `npm start` → server HTTPS/HTTP com headers estritos (CSP, COOP/COEP, etc.).
- `npm run setup-argon2` → copia `argon2-browser` (wasm/js) para `public/argon2/`.
- `npm run sign-integrity` → gera/assina `public/integrity.json.sig` com chave externa (veja `scripts/sign-integrity.js`).

## Vault Zero‑Knowledge (backup/sync E2EE)
- Registro: `POST /api/register` `{ clientId, apiKey }` → servidor guarda **hash PBKDF2** da apiKey (servidor nunca vê dados em claro).
- PUT: `POST /vault/put` `{ clientId, docId, blobB64, meta }` com `Authorization: Bearer <apiKey>`.
- GET: `GET /vault/get?clientId=...&docId=...` com `Authorization: Bearer <apiKey>`.
- **Os blobs são JSONs do IndexedDB criptografado (E2EE).**

## Argon2id (WASM) no cliente
- Este pacote inclui o **gancho** para Argon2id. Para ativar:
  1. `npm install argon2-browser`
  2. `npm run setup-argon2` (copia `argon2.js` e `argon2.wasm` para `public/argon2/`)
  3. Descomente a linha `<script src="argon2/argon2.js" ...>` no `index.html`
- Sem o wasm, o KDF cai em **PBKDF2/300k** como fallback.

## MFA (TOTP)
- Ative no Dashboard → gera `secret` Base32 e `otpauth://` (use Google Authenticator, 1Password, Authy).
- Na abertura da sessão, será exigido o TOTP (6 dígitos).

## Assinatura de integridade externa
- Rode `node scripts/sign-integrity.js` para assinar `public/integrity.json` com um **par de chaves externo** (TOFU ⇒ assinatura real fora do cliente).
- Verificação da assinatura pode ser feita em gateway/reverso ou numa rotina administrativa.

## COOP/COEP e crossOriginIsolated
- O servidor aplica **COOP: same-origin** e **COEP: require-corp** por header. Servindo todos os assets **mesma origem**, você obtém `crossOriginIsolated = true` para WASM/crypto mais forte.

## Observação honesta
- “NSA‑256” **não é** um padrão. Você está com **AES‑256‑GCM**, **SHA‑256**, **ECDSA P‑256**, **HMAC‑SHA‑256**, **Argon2id (WASM)** — prática robusta.
- XOR de rotação é apenas ofuscação (não usado em trilhas críticas).

MIT License.
