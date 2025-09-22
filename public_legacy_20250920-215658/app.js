"use strict";

/* ================== Helpers ================== */
const $ = (s) => document.querySelector(s),
  $$ = (s) => Array.from(document.querySelectorAll(s));
const enc = new TextEncoder(),
  dec = new TextDecoder();
const toB64 = (u8) => btoa(String.fromCharCode(...u8));
const fromB64 = (b64) =>
  new Uint8Array(
    atob(b64)
      .split("")
      .map((c) => c.charCodeAt(0)),
  );
const toHex = (u8) =>
  [...u8].map((b) => b.toString(16).padStart(2, "0")).join("");
function toast(m, ms = 2400) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = m;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), ms);
}
function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

/* ================== PWA ================== */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("./sw.js").catch(() => {}),
  );
}

/* ================== Security flags ================== */
const Flags = {
  crossOriginIsolated: !!self.crossOriginIsolated,
  isSecureContext: !!self.isSecureContext,
};

/* ================== IndexedDB ================== */
const DB_NAME = "nsaSecureDB_v3_1",
  DB_VER = 4;
function openDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB_NAME, DB_VER);
    r.onupgradeneeded = () => {
      const db = r.result;
      if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
      if (!db.objectStoreNames.contains("blocks"))
        db.createObjectStore("blocks", { keyPath: "index" });
      if (!db.objectStoreNames.contains("audit"))
        db.createObjectStore("audit", { keyPath: "id" });
      if (!db.objectStoreNames.contains("auditEnc"))
        db.createObjectStore("auditEnc", { keyPath: "id" });
      if (!db.objectStoreNames.contains("mempool"))
        db.createObjectStore("mempool", { keyPath: "id" });
      if (!db.objectStoreNames.contains("patients"))
        db.createObjectStore("patients", { keyPath: "id" });
      if (!db.objectStoreNames.contains("pIndex"))
        db.createObjectStore("pIndex", { keyPath: "id" });
      if (!db.objectStoreNames.contains("pIndexNgram"))
        db.createObjectStore("pIndexNgram", { keyPath: "id" });
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
function idbGet(db, s, k) {
  return new Promise((res, rej) => {
    const tx = db.transaction(s, "readonly");
    const st = tx.objectStore(s);
    const rq = st.get(k);
    rq.onsuccess = () => res(rq.result);
    rq.onerror = () => rej(rq.error);
  });
}
function idbSet(db, s, v) {
  return new Promise((res, rej) => {
    const tx = db.transaction(s, "readwrite");
    const st = tx.objectStore(s);
    const rq = st.put(v);
    rq.onsuccess = () => res(true);
    rq.onerror = () => rej(rq.error);
  });
}
function idbDelete(db, s, k) {
  return new Promise((res, rej) => {
    const tx = db.transaction(s, "readwrite");
    const st = tx.objectStore(s);
    const rq = st.delete(k);
    rq.onsuccess = () => res(true);
    rq.onerror = () => rej(rq.error);
  });
}
function idbAll(db, s) {
  return new Promise((res, rej) => {
    const tx = db.transaction(s, "readonly");
    const st = tx.objectStore(s);
    const rq = st.getAll();
    rq.onsuccess = () => res(rq.result || []);
    rq.onerror = () => rej(rq.error);
  });
}
async function idbClear(db) {
  for (const n of [
    "kv",
    "blocks",
    "audit",
    "auditEnc",
    "mempool",
    "patients",
    "pIndex",
    "pIndexNgram",
  ]) {
    await new Promise((r) => {
      const tx = db.transaction(n, "readwrite");
      const st = tx.objectStore(n);
      const rq = st.clear();
      rq.onsuccess = () => r(true);
      rq.onerror = () => r(true);
    });
  }
}

/* ================== Crypto ================== */
const CryptoEngine = {
  async random(len = 32) {
    const u = new Uint8Array(len);
    crypto.getRandomValues(u);
    return u;
  },
  async sha256(d) {
    const b = typeof d === "string" ? enc.encode(d) : d;
    return new Uint8Array(await crypto.subtle.digest("SHA-256", b));
  },
  async sha256hex(d) {
    return toHex(await this.sha256(d));
  },
  async aesKey() {
    return crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
      "encrypt",
      "decrypt",
    ]);
  },
  async aesEnc(data, key) {
    const iv = await this.random(12);
    const b = typeof data === "string" ? enc.encode(data) : data;
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, b);
    return { iv: toB64(iv), ct: toB64(new Uint8Array(ct)) };
  },
  async aesDec(payload, key) {
    const iv = fromB64(payload.iv),
      ct = fromB64(payload.ct);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
    return new Uint8Array(pt);
  },
  async expRaw(key) {
    return toB64(new Uint8Array(await crypto.subtle.exportKey("raw", key)));
  },
  async impRaw(b64) {
    return crypto.subtle.importKey(
      "raw",
      fromB64(b64),
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"],
    );
  },
  async ecdsaGen() {
    return crypto.subtle.generateKey(
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["sign", "verify"],
    );
  },
  async ecdsaSign(priv, data) {
    const b = typeof data === "string" ? enc.encode(data) : data;
    const sig = await crypto.subtle.sign(
      { name: "ECDSA", hash: "SHA-256" },
      priv,
      b,
    );
    return toB64(new Uint8Array(sig));
  },
  async ecdsaVerify(pub, sigB64, data) {
    const b = typeof data === "string" ? enc.encode(data) : data;
    return crypto.subtle.verify(
      { name: "ECDSA", hash: "SHA-256" },
      pub,
      fromB64(sigB64),
      b,
    );
  },
  async importJwk(jwk, usage) {
    const alg =
      jwk.kty === "EC"
        ? { name: "ECDSA", namedCurve: "P-256" }
        : { name: "AES-GCM" };
    return crypto.subtle.importKey("jwk", jwk, alg, true, usage);
  },
  async exportJwk(key) {
    return crypto.subtle.exportKey("jwk", key);
  },
  // PBKDF2 fallback (seguro, mas queremos Argon2id)
  async pbkdf2(pass, saltB64, iters = 300000) {
    const base = await crypto.subtle.importKey(
      "raw",
      enc.encode(pass),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const salt = saltB64 ? fromB64(saltB64) : await this.random(16);
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt, iterations: iters },
      base,
      256,
    );
    return { key: toB64(new Uint8Array(bits)), salt: toB64(salt), iters };
  },
  // Argon2id via wasm (se presente em public/argon2/)
  async argon2id(
    pass,
    saltB64,
    params = { time: 3, memMB: 64, parallelism: 1, hashLen: 32 },
  ) {
    if (!window.argon2) {
      throw new Error("argon2 wasm ausente");
    }
    const salt = saltB64 ? fromB64(saltB64) : await this.random(16);
    const res = await window.argon2.hash({
      pass,
      salt,
      time: params.time,
      mem: params.memMB * 1024,
      hashLen: params.hashLen,
      parallelism: params.parallelism,
      type: window.argon2.ArgonType.Argon2id,
    });
    return { key: res.hashHex, salt: toB64(salt), params };
  },
};

/* ================== KDF Manager ================== */
const KDF = {
  mode: "argon2id", // will fallback to pbkdf2 if argon2 not loaded
  async derive(pass, saltB64) {
    try {
      if (this.mode === "argon2id") {
        const r = await CryptoEngine.argon2id(pass, saltB64);
        return {
          b64: toB64(
            Uint8Array.from(r.key.match(/.{2}/g).map((h) => parseInt(h, 16))),
          ),
          salt: r.salt,
          mode: "argon2id",
        };
      }
    } catch (e) {
      console.warn("Argon2id indisponível, fallback PBKDF2", e);
    }
    const r = await CryptoEngine.pbkdf2(pass, saltB64, 300000);
    return { b64: r.key, salt: r.salt, mode: "pbkdf2" };
  },
};

/* ================== SecureMap ================== */
class SecureMap {
  constructor(db, masterKey) {
    this.db = db;
    this.masterKey = masterKey;
    this.saltKey = "smSalt";
    this.store = "kv";
    this.salt = null;
  }
  async ensureSalt() {
    if (this.salt) return;
    let s = await idbGet(this.db, this.store, this.saltKey);
    if (!s) {
      const u = await CryptoEngine.random(16);
      s = { id: this.saltKey, value: toB64(u) };
      await idbSet(this.db, this.store, s);
    }
    this.salt = s.value;
  }
  async keyHash(key) {
    await this.ensureSalt();
    return "sm_" + (await CryptoEngine.sha256hex(this.salt + ":" + key));
  }
  async set(key, val) {
    const h = await this.keyHash(key);
    const payload = await CryptoEngine.aesEnc(
      JSON.stringify(val),
      this.masterKey,
    );
    await idbSet(this.db, this.store, { id: h, value: payload });
  }
  async get(key) {
    const h = await this.keyHash(key);
    const row = await idbGet(this.db, this.store, h);
    if (!row) return null;
    const u8 = await CryptoEngine.aesDec(row.value, this.masterKey);
    return JSON.parse(dec.decode(u8));
  }
  async del(key) {
    const h = await this.keyHash(key);
    await idbDelete(this.db, this.store, h);
  }
}

/* ================== Patient Index (word + n‑gram) ================== */
class PatientIndex {
  constructor(db, hmacKey) {
    this.db = db;
    this.key = hmacKey;
  }
  static tokWords(name) {
    return (name || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter(Boolean);
  }
  static ngrams(s, min = 3, max = 5) {
    const a = (s || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\p{L}\p{N}]/gu, "");
    const out = [];
    for (let n = min; n <= max; n++) {
      for (let i = 0; i + n <= a.length; i++) {
        out.push(a.slice(i, i + n));
      }
    }
    return Array.from(new Set(out));
  }
  async hmacHex(label) {
    const sig = await crypto.subtle.sign("HMAC", this.key, enc.encode(label));
    return toHex(new Uint8Array(sig));
  }
  async upsert(p) {
    const words = PatientIndex.tokWords(p.nome);
    const grams = PatientIndex.ngrams(p.nome);
    const wTokens = [];
    for (const w of words) {
      wTokens.push(await this.hmacHex("w:" + w));
    }
    const gTokens = [];
    for (const g of grams) {
      gTokens.push(await this.hmacHex("g:" + g));
    }
    await idbSet(App.db, "pIndex", { id: p.id, tokens: wTokens });
    await idbSet(App.db, "pIndexNgram", { id: p.id, tokens: gTokens });
  }
  async remove(id) {
    await idbDelete(App.db, "pIndex", id);
    await idbDelete(App.db, "pIndexNgram", id);
  }
  async searchWords(words) {
    const targets = [];
    for (const w of words) {
      targets.push(await this.hmacHex("w:" + w));
    }
    const all = await idbAll(App.db, "pIndex");
    const hits = [];
    outer: for (const row of all) {
      for (const t of targets) {
        if (!row.tokens.includes(t)) continue outer;
      }
      hits.push(row.id);
    }
    return hits;
  }
  async searchNgrams(q) {
    const grams = PatientIndex.ngrams(q);
    if (grams.length === 0) return [];
    const targets = [];
    for (const g of grams) {
      targets.push(await this.hmacHex("g:" + g));
    }
    const all = await idbAll(App.db, "pIndexNgram");
    const ids = new Set();
    for (const row of all) {
      for (const t of targets) {
        if (row.tokens.includes(t)) {
          ids.add(row.id);
          break;
        }
      }
    }
    return Array.from(ids);
  }
}

/* ================== Blockchain (igual v3) ================== */
class MedicalBlockchain {
  constructor(db) {
    this.db = db;
    this.diff = 3;
    this.blocks = "blocks";
    this.pool = "mempool";
  }
  async init() {
    const b = await idbAll(this.db, this.blocks);
    if (b.length === 0) {
      const g = await this.create(0, "0".repeat(64), [
        { type: "genesis", ts: Date.now() },
      ]);
      await idbSet(this.db, this.blocks, g);
    }
  }
  async create(index, prevHash, txs) {
    const ts = Date.now();
    let nonce = 0,
      hash = "";
    const difficulty = this.diff;
    const dataHash = await CryptoEngine.sha256hex(JSON.stringify(txs));
    while (true) {
      const base = JSON.stringify({ index, ts, prevHash, nonce, dataHash });
      hash = await CryptoEngine.sha256hex(base);
      if (hash.startsWith("0".repeat(difficulty))) break;
      nonce++;
    }
    return { index, ts, prevHash, nonce, dataHash, hash, difficulty };
  }
  async last() {
    const all = (await idbAll(this.db, this.blocks)).sort(
      (a, b) => a.index - b.index,
    );
    return all[all.length - 1];
  }
  async addTx(tx) {
    const id = "tx_" + Date.now() + "_" + Math.random().toString(16).slice(2);
    const payload = JSON.stringify(tx);
    const hash = await CryptoEngine.sha256hex(payload);
    await idbSet(this.db, this.pool, { id, hash, payload, ts: Date.now() });
  }
  async mem() {
    return await idbAll(this.db, this.pool);
  }
  async mine() {
    const prev = await this.last();
    const pool = await this.mem();
    const txs = pool.map((x) => ({ id: x.id, hash: x.hash }));
    const b = await this.create(prev.index + 1, prev.hash, txs);
    await idbSet(this.db, this.blocks, b);
    for (const t of pool) {
      await idbDelete(this.db, this.pool, t.id);
    }
    return b;
  }
  async validate() {
    const blocks = (await idbAll(this.db, this.blocks)).sort(
      (a, b) => a.index - b.index,
    );
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const base = JSON.stringify({
        index: b.index,
        ts: b.ts,
        prevHash: b.prevHash,
        nonce: b.nonce,
        dataHash: b.dataHash,
      });
      const h = await CryptoEngine.sha256hex(base);
      if (h !== b.hash || !b.hash.startsWith("0".repeat(b.difficulty)))
        return false;
      if (i > 0 && b.prevHash !== blocks[i - 1].hash) return false;
    }
    return true;
  }
  async stats() {
    const blocks = await idbAll(this.db, this.blocks);
    const pool = await this.mem();
    return { blocks: blocks.length, mempool: pool.length, diff: this.diff };
  }
  async all() {
    return (await idbAll(this.db, this.blocks)).sort(
      (a, b) => b.index - a.index,
    );
  }
}

/* ================== Security Monitor ================== */
class SecurityMonitor {
  constructor(db, sm) {
    this.db = db;
    this.sm = sm;
    this.prev = "0".repeat(64);
  }
  async log(type, data) {
    const ts = Date.now();
    const base = JSON.stringify({ type, ts, prev: this.prev });
    const hash = await CryptoEngine.sha256hex(base);
    const id = "log_" + ts;
    await idbSet(this.db, "auditEnc", {
      id,
      payload: await CryptoEngine.aesEnc(
        JSON.stringify(data || {}),
        this.sm.masterKey,
      ),
    });
    await idbSet(this.db, "audit", { id, type, ts, prev: this.prev, hash });
    this.prev = hash;
  }
  async export() {
    const meta = (await idbAll(this.db, "audit")).sort((a, b) => a.ts - b.ts);
    const encRows = await idbAll(this.db, "auditEnc");
    const map = new Map(encRows.map((r) => [r.id, r.payload]));
    const out = [];
    for (const m of meta) {
      let data = null;
      const p = map.get(m.id);
      if (p) {
        try {
          data = JSON.parse(
            dec.decode(await CryptoEngine.aesDec(p, this.sm.masterKey)),
          );
        } catch {}
      }
      out.push({ ...m, data });
    }
    return out;
  }
  async verify() {
    const meta = (await idbAll(this.db, "audit")).sort((a, b) => a.ts - b.ts);
    let prev = "0".repeat(64);
    for (const r of meta) {
      const base = JSON.stringify({ type: r.type, ts: r.ts, prev });
      const h = await CryptoEngine.sha256hex(base);
      if (h !== r.hash) return false;
      prev = h;
    }
    return true;
  }
  async scan() {
    const t0 = performance.now();
    let x = 0;
    for (let i = 0; i < 4e6; i++) {
      x += i;
    }
    const lag = performance.now() - t0;
    const threat = lag > 200 ? "elevado" : lag > 120 ? "moderado" : "ok";
    await this.log("scan", { lag_ms: Math.round(lag), threat });
    return { lag_ms: Math.round(lag), threat };
  }
}

/* ================== App State ================== */
const App = {
  db: null,
  masterKey: null,
  secure: null,
  ecdsa: { pub: null, priv: null },
  kdf: { salt: null, mode: null },
  pIndex: null,
  hmacKey: null,
  bc: null,
  secmon: null,
  startedAt: Date.now(),
  mfa: { enabled: false, secret: null },
};

/* ================== Start ================== */
document.addEventListener("DOMContentLoaded", init);
async function init() {
  // integrity self-check (SRI against manifest)
  try {
    const man = await fetch("./integrity.json").then((r) => r.json());
    const res = await fetch("./app.js");
    const buf = new Uint8Array(await res.arrayBuffer());
    const h =
      "sha256-" +
      btoa(
        String.fromCharCode(
          ...new Uint8Array(await crypto.subtle.digest("SHA-256", buf)),
        ),
      );
    if (h !== man["app.js"]) console.warn("Integridade divergente de app.js");
  } catch (e) {
    console.warn("Integrity manifest não verificado", e);
  }

  App.db = await openDB();
  bindUI();
  await setupKeysUIState();
  App.bc = new MedicalBlockchain(App.db);
  await App.bc.init();
  await updateDashboard();
  await refreshBlockchainUI();
  await refreshLogs();
}

/* ================== UI Bindings ================== */
function bindUI() {
  $$(".tablink").forEach((b) =>
    b.addEventListener("click", () => {
      $$(".tablink").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      $$(".tab").forEach((s) => s.classList.remove("active"));
      $("#tab-" + b.dataset.tab).classList.add("active");
    }),
  );
  // keys
  $("#btnGenKeys").addEventListener("click", onGenKeys);
  $("#btnUnlock").addEventListener("click", onUnlock);
  $("#btnLock").addEventListener("click", onLock);
  // patients
  $("#frmPaciente").addEventListener("submit", onSavePatient);
  $("#btnNovoPaciente").addEventListener("click", () =>
    $("#frmPaciente").reset(),
  );
  $("#pacSearch").addEventListener("input", debounce(onSearchPatients, 250));
  // EHR
  $("#btnEhrApplyTemplate").addEventListener("click", applyEhrTemplate);
  $("#btnEhrSave").addEventListener("click", saveEhr);
  $("#btnEhrSign").addEventListener("click", signEhr);
  $("#btnEhrVerify").addEventListener("click", verifyEhr);
  $("#btnEhrExport").addEventListener("click", exportEhr);
  // Blockchain
  $("#btnBcAddTx").addEventListener("click", () => $("#modalTx").showModal());
  $("#btnMine").addEventListener("click", mineBlock);
  $("#btnMine2").addEventListener("click", mineBlock);
  $("#inpDiff").addEventListener("change", async (e) => {
    App.bc.diff = Math.max(1, Math.min(6, Number(e.target.value) || 3));
    await refreshBlockchainUI();
  });
  // Security
  $("#btnScan").addEventListener("click", async () => {
    const r = await App.secmon.scan();
    $("#scanOutput").textContent = JSON.stringify(r, null, 2);
  });
  $("#btnVerifyLogs").addEventListener("click", async () =>
    toast(
      (await App.secmon.verify()) ? "Integridade OK" : "Falha de integridade",
    ),
  );
  $("#btnExportLogs").addEventListener("click", exportLogs);
  $("#btnSelfCheck").addEventListener("click", selfCheck);
  // Sync (vault)
  $("#btnVaultSave").addEventListener("click", vaultSave);
  $("#btnVaultLoad").addEventListener("click", vaultLoad);
  $("#btnRegister").addEventListener("click", vaultRegister);
  // MFA
  $("#btnMfaEnable").addEventListener("click", mfaEnable);
  $("#btnMfaDisable").addEventListener("click", mfaDisable);
}

/* ================== Keys & Unlock ================== */
async function setupKeysUIState() {
  const wrap = localStorage.getItem("wrappedMaster_v3_1");
  $("#hasKeys").textContent = wrap ? "SIM" : "NÃO";
}
async function onGenKeys() {
  const pass = prompt("Passphrase (mín. 12 chars):");
  if (!pass || pass.length < 12) {
    toast("Passphrase fraca.");
    return;
  }
  // Derivar KDF (preferência Argon2id)
  const d = await KDF.derive(pass, null);
  App.kdf = { salt: d.salt, mode: d.mode };
  const master = await CryptoEngine.aesKey();
  App.masterKey = master;
  App.secure = new SecureMap(App.db, master);
  const ecdsa = await CryptoEngine.ecdsaGen();
  App.ecdsa = { priv: ecdsa.privateKey, pub: ecdsa.publicKey };
  // MFA: opcional agora, pode ser ativado depois
  const b64Master = await CryptoEngine.expRaw(master);
  const wrap = {
    alg: App.kdf.mode,
    salt: App.kdf.salt,
    key: await CryptoEngine.aesEnc(
      b64Master,
      await CryptoEngine.impRaw(await kdfToRaw(d.b64)),
    ),
    pub: await CryptoEngine.exportJwk(App.ecdsa.pub),
    priv: await CryptoEngine.aesEnc(
      JSON.stringify(await CryptoEngine.exportJwk(App.ecdsa.priv)),
      await CryptoEngine.impRaw(await kdfToRaw(d.b64)),
    ),
  };
  localStorage.setItem("wrappedMaster_v3_1", JSON.stringify(wrap));
  App.secmon = new SecurityMonitor(App.db, App.secure);
  await App.secmon.log("keys_generated", {
    ts: Date.now(),
    mode: App.kdf.mode,
  });
  toast("Chaves geradas.");
  await setupKeysUIState();
}
async function kdfToRaw(b64) {
  // reduce to 32 bytes
  const u = fromB64(b64);
  return toB64(u.length === 32 ? u : u.slice(0, 32));
}
async function onUnlock() {
  const pass = prompt("Passphrase:");
  if (!pass) {
    toast("Cancelado.");
    return;
  }
  const wrap = JSON.parse(localStorage.getItem("wrappedMaster_v3_1") || "null");
  if (!wrap) {
    toast("Gere chaves primeiro.");
    return;
  }
  // KDF
  const d = await KDF.derive(pass, wrap.salt);
  const kdfRaw = await CryptoEngine.impRaw(await kdfToRaw(d.b64));
  // MFA (se habilitada)
  const mfa = JSON.parse(localStorage.getItem("mfa_v3_1") || "null");
  if (mfa?.enabled) {
    const code = prompt("TOTP (6 dígitos):");
    const exp = await TOTP.code(mfa.secret, 30, 6);
    if (code !== exp) {
      toast("MFA incorreta.");
      return;
    }
  }
  // Unwrap
  try {
    const b64Master = dec.decode(await CryptoEngine.aesDec(wrap.key, kdfRaw));
    App.masterKey = await CryptoEngine.impRaw(b64Master);
    App.secure = new SecureMap(App.db, App.masterKey);
    const jwkPriv = JSON.parse(
      dec.decode(await CryptoEngine.aesDec(wrap.priv, kdfRaw)),
    );
    const jwkPub = wrap.pub;
    App.ecdsa.priv = await CryptoEngine.importJwk(jwkPriv, ["sign"]);
    App.ecdsa.pub = await CryptoEngine.importJwk(jwkPub, ["verify"]);
    // HMAC key for index (derive from KDF key locally)
    const hmacKey = await crypto.subtle.importKey(
      "raw",
      fromB64(await kdfToRaw(d.b64)),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    App.hmacKey = hmacKey;
    App.pIndex = new PatientIndex(App.db, hmacKey);
    App.bc = new MedicalBlockchain(App.db);
    await App.bc.init();
    App.secmon = new SecurityMonitor(App.db, App.secure);
    await App.secmon.log("keys_unwrapped", { ts: Date.now(), mode: d.mode });
    toast("Sessão desbloqueada.");
  } catch (e) {
    console.error(e);
    toast("Falha ao desbloquear.");
  }
}
async function onLock() {
  App.masterKey = null;
  App.secure = null;
  App.ecdsa = { pub: null, priv: null };
  App.hmacKey = null;
  App.pIndex = null;
  toast("Sessão bloqueada.");
}

/* ================== Patients & Search ================== */
async function onSavePatient(e) {
  e.preventDefault();
  if (!App.secure || !App.pIndex) {
    toast("Desbloqueie a sessão.");
    return;
  }
  const f = (id) => $("#" + id).value;
  const p = {
    id: $("#frmPaciente").dataset.editing || null,
    nome: f("p_nome").trim(),
    idade: Number(f("p_idade") || 0),
    sexo: f("p_sexo"),
    altura: Number(f("p_altura") || 0),
    peso: Number(f("p_peso") || 0),
    dm: $("#p_dm").checked,
    ha: $("#p_ha").checked,
    drc: $("#p_drc").checked,
    egfr: Number(f("p_egfr") || 0),
    k: Number(f("p_k") || 0),
    pas: Number(f("p_pas") || 0),
    consent: f("p_consent") || "sem",
  };
  if (!p.id) p.id = "pac_" + Date.now().toString(36);
  await App.secure.set("patient:" + p.id, p);
  await idbSet(App.db, "patients", { id: p.id });
  await App.pIndex.upsert(p);
  $("#frmPaciente").dataset.editing = p.id;
  toast("Paciente salvo.");
  await renderPatients();
}
async function allPatients() {
  const idx = await idbAll(App.db, "patients");
  const out = [];
  for (const it of idx) {
    const p = await App.secure.get("patient:" + it.id);
    if (p) out.push(p);
  }
  return out;
}
async function renderPatients(list) {
  const ul = $("#pacList");
  ul.innerHTML = "";
  const arr = list || (await allPatients());
  if (!arr.length) {
    ul.innerHTML = "<li>Nenhum paciente</li>";
    return;
  }
  for (const p of arr) {
    const li = document.createElement("li");
    li.innerHTML = `<div><div><strong>${p.nome}</strong> — ${p.sexo}, ${p.idade}a</div><small>eGFR ${p.egfr || "—"} | K ${p.k || "—"} | PAS ${p.pas || "—"} | Consent ${p.consent || "—"}</small></div><div><button class="ghost" data-id="${p.id}" data-act="open">Abrir</button></div>`;
    ul.appendChild(li);
  }
  ul.querySelectorAll('button[data-act="open"]').forEach((b) =>
    b.addEventListener("click", async (ev) => {
      const id = ev.target.dataset.id;
      const p = await App.secure.get("patient:" + id);
      if (!p) return;
      $("#frmPaciente").dataset.editing = id;
      $("#p_nome").value = p.nome || "";
      $("#p_idade").value = p.idade || "";
      $("#p_sexo").value = p.sexo || "M";
      $("#p_altura").value = p.altura || "";
      $("#p_peso").value = p.peso || "";
      $("#p_dm").checked = !!p.dm;
      $("#p_ha").checked = !!p.ha;
      $("#p_drc").checked = !!p.drc;
      $("#p_egfr").value = p.egfr || "";
      $("#p_k").value = p.k || "";
      $("#p_pas").value = p.pas || "";
      $("#p_consent").value = p.consent || "sem";
      $("#ehr_pid").value = id;
    }),
  );
}
async function onSearchPatients(e) {
  if (!App.pIndex) {
    toast("Desbloqueie.");
    return;
  }
  const q = e.target.value.trim();
  if (!q) {
    renderPatients();
    return;
  }
  const mode = $("#searchMode").value;
  let ids = [];
  if (mode === "word") {
    const words = PatientIndex.tokWords(q);
    ids = await App.pIndex.searchWords(words);
  } else {
    ids = await App.pIndex.searchNgrams(q);
  }
  const list = [];
  for (const id of ids) {
    const p = await App.secure.get("patient:" + id);
    if (p) list.push(p);
  }
  await renderPatients(list);
}

/* ================== EHR ================== */
function applyEhrTemplate() {
  const t = $("#ehr_template").value,
    pid = $("#ehr_pid").value.trim();
  if (!pid) {
    toast("Selecione paciente.");
    return;
  }
  $("#ehr_editor").value =
    t === "evol-nefro"
      ? `Histórico: Paciente ${pid}. Curso clínico atual...
Exame físico: PA ___/___, FC __, FR __, SatO2 __, t°, edema ___.
Laboratório: eGFR __, K __, Hb __, Na __, HCO3 __.
Impressão clínica: ...
Conduta: ...`
      : `Prescrição (exemplo)
• Dieta ___
• Hidratação ___
• Medicações: ...
• Hemodiálise: ...
• Monitorização: ...`;
  toast("Template aplicado.");
}
async function saveEhr() {
  if (!App.secure) {
    toast("Desbloqueie.");
    return;
  }
  const pid = $("#ehr_pid").value.trim();
  const txt = $("#ehr_editor").value;
  if (!pid) {
    toast("Informe ID.");
    return;
  }
  await App.secure.set("ehr:" + pid, { ts: Date.now(), text: txt });
  if (!App.secmon) App.secmon = new SecurityMonitor(App.db, App.secure);
  await App.secmon.log("ehr_saved", { pid });
  toast("EHR salvo.");
}
async function signEhr() {
  if (!App.ecdsa.priv) {
    toast("Desbloqueie.");
    return;
  }
  const pid = $("#ehr_pid").value.trim();
  const txt = $("#ehr_editor").value;
  const hash = await CryptoEngine.sha256hex(txt);
  const sig = await CryptoEngine.ecdsaSign(App.ecdsa.priv, enc.encode(hash));
  await App.secure.set("ehrSig:" + pid, { hash, sig, ts: Date.now() });
  $("#ehrSignInfo").textContent =
    `hash=${hash.slice(0, 16)}… sig=${sig.slice(0, 16)}…`;
  toast("Assinado.");
}
async function verifyEhr() {
  if (!App.ecdsa.pub) {
    toast("Desbloqueie.");
    return;
  }
  const pid = $("#ehr_pid").value.trim();
  const txt = $("#ehr_editor").value;
  const rec = await App.secure.get("ehrSig:" + pid);
  if (!rec) {
    toast("Sem assinatura.");
    return;
  }
  const hash = await CryptoEngine.sha256hex(txt);
  const ok =
    rec.hash === hash &&
    (await CryptoEngine.ecdsaVerify(App.ecdsa.pub, rec.sig, enc.encode(hash)));
  $("#ehrSignInfo").textContent = ok
    ? "Assinatura VÁLIDA."
    : "Assinatura INVÁLIDA";
}

/* ================== Blockchain UI ================== */
async function mineBlock() {
  const b = await App.bc.mine();
  toast("#" + b.index + " minerado");
  await refreshBlockchainUI();
}
async function refreshBlockchainUI() {
  const ok = await App.bc.validate();
  $("#threatLevel").textContent = ok ? "Ok" : "Alerta";
  const list = $("#bcList");
  list.innerHTML = "";
  for (const b of await App.bc.all()) {
    const li = document.createElement("li");
    li.innerHTML = `<div><div><strong>#${b.index}</strong> — ${new Date(b.ts).toLocaleString()}</div><small>hash=${b.hash.slice(0, 18)}… prev=${b.prevHash.slice(0, 12)}… diff=${b.difficulty} nonce=${b.nonce}</small></div>`;
    list.appendChild(li);
  }
}
async function updateDashboard() {
  const st = await App.bc.stats();
  $("#bcBlocks").textContent = st.blocks;
  $("#bcMempool").textContent = st.mempool;
  $("#bcDifficulty").textContent = st.diff;
}

/* ================== Security tools ================== */
async function exportLogs() {
  const logs = await new SecurityMonitor(
    App.db,
    App.secure || { masterKey: null },
  ).export();
  const ok = await new SecurityMonitor(
    App.db,
    App.secure || { masterKey: null },
  ).verify();
  const blob = new Blob([JSON.stringify({ ok, logs }, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "audit_logs.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
async function selfCheck() {
  const rep = {
    https: location.protocol === "https:",
    crossOriginIsolated,
    isSecureContext,
    headers: {},
  };
  try {
    const r = await fetch("./", { method: "HEAD" });
    for (const h of [
      "content-security-policy",
      "cross-origin-opener-policy",
      "cross-origin-embedder-policy",
      "x-frame-options",
      "x-content-type-options",
      "referrer-policy",
      "permissions-policy",
    ])
      rep.headers[h] = r.headers.get(h) || null;
  } catch {}
  const man = await fetch("./integrity.json")
    .then((r) => r.json())
    .catch(() => null);
  const s = JSON.stringify({ rep, integrity: !!man }, null, 2);
  $("#scanOutput").textContent = s;
}

/* ================== Vault Sync (E2EE) ================== */
async function vaultRegister() {
  const url = $("#vaultUrl").value.trim(),
    client = $("#vaultClient").value.trim(),
    key = $("#vaultKey").value.trim();
  if (!url || !client || !key) {
    toast("Preencha URL/Client/Key");
    return;
  }
  const r = await fetch(url + "/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId: client, apiKey: key }),
  });
  toast(r.ok ? "Registrado no vault." : "Falha no registro");
}
async function vaultSave() {
  if (!App.secure) {
    toast("Desbloqueie.");
    return;
  }
  const url = $("#vaultUrl").value.trim(),
    client = $("#vaultClient").value.trim(),
    key = $("#vaultKey").value.trim();
  if (!url || !client || !key) {
    toast("Configurar vault");
    return;
  }
  // Export snapshot criptografado do KV + blocks + audit enc (sem chaves)
  const stores = [
    "kv",
    "blocks",
    "audit",
    "auditEnc",
    "mempool",
    "patients",
    "pIndex",
    "pIndexNgram",
  ];
  const out = {};
  for (const s of stores) {
    out[s] = await idbAll(App.db, s);
  }
  const payloadB64 = toB64(enc.encode(JSON.stringify(out)));
  const docId = "snapshot_" + Date.now();
  const r = await fetch(url + "/vault/put", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + key,
    },
    body: JSON.stringify({
      clientId: client,
      docId,
      blobB64: payloadB64,
      meta: { ts: Date.now(), ver: DB_VER },
    }),
  });
  toast(r.ok ? "Backup E2EE enviado." : "Falha no PUT");
}
async function vaultLoad() {
  const url = $("#vaultUrl").value.trim(),
    client = $("#vaultClient").value.trim(),
    key = $("#vaultKey").value.trim(),
    doc = $("#vaultDoc").value.trim();
  if (!url || !client || !key || !doc) {
    toast("Preencha URL/Client/Key/Doc");
    return;
  }
  const r = await fetch(
    `${url}/vault/get?clientId=${encodeURIComponent(client)}&docId=${encodeURIComponent(doc)}`,
    { headers: { Authorization: "Bearer " + key } },
  );
  if (!r.ok) {
    toast("Falha no GET");
    return;
  }
  const j = await r.json();
  const data = JSON.parse(dec.decode(fromB64(j.blobB64)));
  await idbClear(App.db);
  for (const [store, rows] of Object.entries(data || {})) {
    for (const row of rows) {
      await idbSet(App.db, store, row);
    }
  }
  toast("Snapshot restaurado.");
  await renderPatients();
  await refreshBlockchainUI();
  await refreshLogs();
}

/* ================== Logs UI ================== */
async function refreshLogs() {
  const logs = await new SecurityMonitor(
    App.db,
    App.secure || { masterKey: null },
  ).export();
  const ul = $("#logList");
  ul.innerHTML = "";
  for (const l of logs.slice().reverse()) {
    const li = document.createElement("li");
    li.innerHTML = `<div><div><strong>${l.type}</strong> — ${new Date(l.ts).toLocaleString()}</div><small>hash=${(l.hash || "").slice(0, 16)}…</small></div>`;
    ul.appendChild(li);
  }
}
