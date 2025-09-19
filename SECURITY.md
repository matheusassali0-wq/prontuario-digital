# SECURITY.md — STRIDE & Controles
- **COOP/COEP** + HTTPS local ⇒ `crossOriginIsolated` (WASM/crypto robusto).
- **CSP estrita**, XFO DENY, XCTO nosniff, RP no-referrer, Permissions-Policy mínima, CORP same-origin.
- **KDF**: Argon2id (WASM) quando presente; fallback PBKDF2/300k.
- **MFA TOTP** (HMAC-SHA1 via Web Crypto).
- **Índice HMAC n‑gram**: busca substring sem revelar texto.
- **Vault E2EE**: servidor armazena blobs cifrados; autenticação por apiKey hash PBKDF2.
- **Auditoria encadeada** + logs cifrados + export/verify.
