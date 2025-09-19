"use strict";
// TOTP (RFC 6238) com Web Crypto (HMAC-SHA-1) e Base32
const TOTP = {
  base32Alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  toUint8(arr) {
    return new Uint8Array(arr);
  },
  base32Encode(u8) {
    let out = "",
      bitbuf = 0,
      bits = 0;
    for (const b of u8) {
      bitbuf = (bitbuf << 8) | b;
      bits += 8;
      while (bits >= 5) {
        const v = (bitbuf >> (bits - 5)) & 31;
        out += this.base32Alphabet[v];
        bits -= 5;
      }
    }
    if (bits > 0) {
      out += this.base32Alphabet[(bitbuf << (5 - bits)) & 31];
    }
    while (out.length % 8) out += "=";
    return out;
  },
  async randomSecret(bytes = 20) {
    const u = new Uint8Array(bytes);
    crypto.getRandomValues(u);
    return this.base32Encode(u);
  },
  async hmacSha1(keyBytes, msgBytes) {
    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"],
    );
    const sig = await crypto.subtle.sign("HMAC", key, msgBytes);
    return new Uint8Array(sig);
  },
  async code(secretBase32, step = 30, digits = 6, t = Date.now()) {
    // decode base32 to bytes
    const map = {};
    for (let i = 0; i < this.base32Alphabet.length; i++)
      map[this.base32Alphabet[i]] = i;
    const clean = secretBase32.replace(/=+$/, "").toUpperCase();
    let bits = 0,
      bitbuf = 0;
    const out = [];
    for (const c of clean) {
      const v = map[c];
      if (v === undefined) continue;
      bitbuf = (bitbuf << 5) | v;
      bits += 5;
      if (bits >= 8) {
        out.push((bitbuf >> (bits - 8)) & 0xff);
        bits -= 8;
      }
    }
    const counter = Math.floor(t / 1000 / step);
    const msg = new Uint8Array(8);
    let tmp = counter;
    for (let i = 7; i >= 0; i--) {
      msg[i] = tmp & 0xff;
      tmp = Math.floor(tmp / 256);
    }
    const h = await this.hmacSha1(new Uint8Array(out), msg);
    const off = h[h.length - 1] & 0x0f;
    const bin =
      ((h[off] & 0x7f) << 24) |
      (h[off + 1] << 16) |
      (h[off + 2] << 8) |
      h[off + 3];
    const code = (bin % 10 ** digits).toString().padStart(digits, "0");
    return code;
  },
  otpauthURI(label, secret, issuer = "NSA-Secure") {
    return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
  },
};
