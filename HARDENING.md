# HARDENING.md — Operação
- Use **HTTPS** com **mkcert** local e mantenha COOP/COEP.
- Gate reverso (Nginx/Caddy) pode exigir **mTLS** e checar `integrity.json.sig` com `integrity_pub.pem`.
- Em produção: KMS/HSM, Argon2id server-side para credenciais, MFA robusto (WebAuthn), SIEM + logs WORM, DPIA/LGPD.
