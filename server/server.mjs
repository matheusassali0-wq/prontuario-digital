// server/server.mjs — HTTPS + COOP/COEP + Zero‑Knowledge Vault
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import https from "node:https";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.join(__dirname, "..", "public");
const DATA = path.join(__dirname, "..", "data");
const CERTS = path.join(__dirname, "..", "certs");
fs.mkdirSync(DATA, { recursive: true });

const PORT = Number(process.env.PORT || 5173);
const MAX_BODY = 5 * 1024 * 1024; // 5MB por requisição
const RATE = { windowMs: 60_000, max: 100 }; // 100 req/min/IP simples
const ipBucket = new Map();

function rateLimitOk(ip) {
  const now = Date.now();
  const e = ipBucket.get(ip) || { count: 0, start: now };
  if (now - e.start > RATE.windowMs) {
    e.count = 0;
    e.start = now;
  }
  e.count++;
  ipBucket.set(ip, e);
  return e.count <= RATE.max;
}

function setSecurityHeaders(res) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
  );
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
  );
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
}

const usersFile = path.join(DATA, "users.json");
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
  } catch {
    return {};
  }
}
function saveUsers(obj) {
  fs.writeFileSync(usersFile, JSON.stringify(obj, null, 2));
}

function hashKeyPBKDF2(apiKey, salt = crypto.randomBytes(16)) {
  const iter = 200_000;
  const dk = crypto.pbkdf2Sync(apiKey, salt, iter, 32, "sha256");
  return {
    algo: "pbkdf2",
    salt: salt.toString("base64"),
    iter,
    dk: dk.toString("base64"),
  };
}
function verifyKeyPBKDF2(apiKey, rec) {
  const dk = crypto
    .pbkdf2Sync(apiKey, Buffer.from(rec.salt, "base64"), rec.iter, 32, "sha256")
    .toString("base64");
  return crypto.timingSafeEqual(Buffer.from(dk), Buffer.from(rec.dk));
}

function notFound(res) {
  res
    .writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
    .end("Not found");
}
function bad(res, code = 400, msg = "Bad request") {
  res
    .writeHead(code, { "Content-Type": "application/json" })
    .end(JSON.stringify({ error: msg }));
}
function okJson(res, body) {
  res
    .writeHead(200, { "Content-Type": "application/json" })
    .end(JSON.stringify(body));
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function serveStatic(req, res) {
  let p = req.url.split("?")[0];
  if (p === "/") p = "/index.html";
  const file = path.join(PUB, p);
  if (!file.startsWith(PUB)) return notFound(res);
  fs.readFile(file, (err, data) => {
    if (err) {
      notFound(res);
      return;
    }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(file)] || "application/octet-stream",
    });
    res.end(data);
  });
}

async function handleApi(req, res, ip) {
  if (!rateLimitOk(ip)) return bad(res, 429, "rate limit");
  if (req.method === "HEAD" && req.url === "/") {
    setSecurityHeaders(res);
    res.writeHead(200).end();
    return;
  }
  if (req.method === "GET" && req.url.startsWith("/healthz")) {
    setSecurityHeaders(res);
    return okJson(res, { ok: true, ts: Date.now() });
  }

  // Register client: {clientId, apiKey}
  if (req.method === "POST" && req.url === "/api/register") {
    setSecurityHeaders(res);
    const body = await readJson(req, res);
    if (!body) return;
    const { clientId, apiKey } = body;
    if (!clientId || !apiKey) return bad(res, 400, "clientId/apiKey required");
    const users = loadUsers();
    if (!users[clientId]) users[clientId] = {};
    users[clientId].api = hashKeyPBKDF2(apiKey);
    saveUsers(users);
    return okJson(res, { ok: true });
  }

  // Vault PUT
  if (req.method === "POST" && req.url === "/vault/put") {
    setSecurityHeaders(res);
    const auth = (req.headers["authorization"] || "").split(" ")[1];
    const body = await readJson(req, res);
    if (!body) return;
    const { clientId, docId, blobB64, meta } = body || {};
    if (!clientId || !docId || !blobB64) return bad(res, 400, "missing fields");
    const users = loadUsers();
    const u = users[clientId];
    if (!u || !u.api || !auth || !verifyKeyPBKDF2(auth, u.api))
      return bad(res, 401, "unauthorized");
    const dir = path.join(DATA, clientId);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, docId + ".json"),
      JSON.stringify({ blobB64, meta: meta || {}, ts: Date.now() }, null, 2),
    );
    return okJson(res, { ok: true });
  }

  // Vault GET
  if (req.method === "GET" && req.url.startsWith("/vault/get")) {
    setSecurityHeaders(res);
    const u = new URL(req.url, "https://x");
    const clientId = u.searchParams.get("clientId");
    const docId = u.searchParams.get("docId");
    const auth = (req.headers["authorization"] || "").split(" ")[1];
    const users = loadUsers();
    const user = users[clientId];
    if (!user || !user.api || !auth || !verifyKeyPBKDF2(auth, user.api))
      return bad(res, 401, "unauthorized");
    const file = path.join(DATA, clientId, docId + ".json");
    if (!fs.existsSync(file)) return notFound(res);
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return okJson(res, data);
  }
  return null;
}

function readJson(req, res) {
  return new Promise((resolve) => {
    let chunks = [];
    let len = 0;
    req.on("data", (c) => {
      len += c.length;
      if (len > MAX_BODY) {
        resolve(null);
      } else {
        chunks.push(c);
      }
    });
    req.on("end", () => {
      try {
        const buf = Buffer.concat(chunks);
        const s = buf.toString("utf8");
        const json = JSON.parse(s);
        resolve(json);
      } catch (e) {
        resolve(null);
      }
    });
  });
}

function handler(req, res) {
  setSecurityHeaders(res);
  const ip = req.socket.remoteAddress || "0.0.0.0";
  if (req.method === "HEAD" && req.url === "/") {
    res.writeHead(200);
    return res.end();
  }
  if (req.url.startsWith("/api/") || req.url.startsWith("/vault/")) {
    handleApi(req, res, ip).then((done) => {
      if (done === null) notFound(res);
    });
    return;
  }
  serveStatic(req, res);
}

function httpsServer() {
  try {
    const key = fs.readFileSync(path.join(CERTS, "localhost-key.pem"));
    const cert = fs.readFileSync(path.join(CERTS, "localhost.pem"));
    const s = https.createServer({ key, cert }, handler);
    s.listen(PORT, () =>
      console.log("[NSA-Secure] HTTPS on https://localhost:" + PORT),
    );
  } catch (e) {
    console.warn(
      "[NSA-Secure] Certificados não encontrados em ./certs/. Rodando HTTP de fallback (apenas dev).",
    );
    const s = http.createServer(handler);
    s.listen(PORT, () =>
      console.log("[NSA-Secure] HTTP on http://localhost:" + PORT),
    );
  }
}

httpsServer();
