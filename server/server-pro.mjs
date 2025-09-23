import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(path.join(__dirname, ".."));
const pub = path.join(root, "public");
const dataDir = path.join(root, "data");

async function readJson(f, def) {
  try {
    return JSON.parse((await fs.readFile(f, "utf8")) || "null") ?? def;
  } catch {
    return def;
  }
}
async function writeJson(f, obj) {
  const tmp = f + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(obj, null, 2));
  await fs.rename(tmp, f);
}
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const countersFile = path.join(dataDir, "counters.json");
const timelineFile = path.join(dataDir, "timeline.json");
const idempotencyFile = path.join(dataDir, "idempotency.json");
const auditFile = path.join(dataDir, "audit.json");

async function readCounters() {
  return readJson(countersFile, {});
}

async function getNextCounter(key) {
  const counters = await readCounters();
  const current = Number.isInteger(counters[key]) ? counters[key] : 0;
  const next = current + 1;
  counters[key] = next;
  await writeJson(countersFile, counters);
  return next;
}

async function appendTimelineEvent(event) {
  const events = await readJson(timelineFile, []);
  events.push(event);
  await writeJson(timelineFile, events.slice(-500));
}

async function cleanupIdempotency() {
  const map = await readJson(idempotencyFile, {});
  const now = Date.now();
  let mutated = false;
  for (const [key, value] of Object.entries(map)) {
    const expiresAt = value?.expiresAt;
    if (expiresAt) {
      const ts = new Date(expiresAt).getTime();
      if (Number.isFinite(ts) && ts < now) {
        delete map[key];
        mutated = true;
      }
    }
  }
  if (mutated) {
    await writeJson(idempotencyFile, map);
  }
}

async function maybeReplay(res, key) {
  if (!key) return false;
  const map = await readJson(idempotencyFile, {});
  const record = map[key];
  if (record && record.status === "OK" && record.response) {
    res.set("x-idempotency-replay", "true");
    res.json(record.response);
    return true;
  }
  return false;
}

async function persistIdempotency(key, status, response) {
  if (!key) return;
  const map = await readJson(idempotencyFile, {});
  map[key] = {
    status,
    response,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
  };
  await writeJson(idempotencyFile, map);
}

async function appendAuditLog(action, meta) {
  const entries = await readJson(auditFile, []);
  const prev = entries.length ? entries[entries.length - 1].hash : "";
  const payload = {
    id: genId(),
    action,
    meta,
    createdAt: new Date().toISOString(),
    hashPrev: prev,
  };
  payload.hash = createHash("sha256")
    .update(`${prev}:${JSON.stringify({ action, meta })}`)
    .digest("hex");
  entries.push(payload);
  await writeJson(auditFile, entries.slice(-1000));
}

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "4mb" }));
cleanupIdempotency().catch(() => undefined);
setInterval(
  () => {
    cleanupIdempotency().catch(() => undefined);
  },
  60 * 60 * 1000,
);
app.get("/api/health", (req, res) =>
  res.json({ ok: true, time: new Date().toISOString() }),
);

// login demo
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (email === "MATHEUS" && password === "a8hadTCy") {
    return res.json({
      ok: true,
      token: Buffer.from(Date.now().toString()).toString("base64"),
      user: { id: "1", email: "MATHEUS", name: "Matheus", role: "admin" },
    });
  }
  res.status(401).json({ ok: false, error: "credenciais" });
});

// pacientes + autocomplete
app.get("/api/pacientes", async (req, res) => {
  const q = (req.query.search || "").toString().trim().toLowerCase();
  const items = await readJson(path.join(dataDir, "pacientes.json"), []);
  const filtered = q
    ? items.filter(
        (p) =>
          (p.nome || "").toLowerCase().includes(q) ||
          (p.doc || "").toLowerCase().includes(q),
      )
    : items;
  res.json({ ok: true, items: filtered });
});
app.post("/api/pacientes", async (req, res) => {
  const key = (req.get("x-idempotency-key") || "").trim();
  if (key && (await maybeReplay(res, key))) return;
  const b = req.body || {};
  if (!(b.nome && b.nascimento)) {
    if (key)
      await persistIdempotency(key, "ERROR", {
        ok: false,
        error: "nome/nascimento",
      });
    return res.status(400).json({ ok: false, error: "nome/nascimento" });
  }
  await fs.mkdir(dataDir, { recursive: true });
  const items = await readJson(path.join(dataDir, "pacientes.json"), []);
  const id = genId();
  const novo = { id, criadoEm: new Date().toISOString(), ...b };
  items.push(novo);
  await writeJson(path.join(dataDir, "pacientes.json"), items);
  const payload = { ok: true, item: novo };
  await appendTimelineEvent({
    id: `evt_${id}`,
    patientId: id,
    type: "PATIENT_CREATE",
    createdAt: novo.criadoEm,
    payload: {},
  });
  await appendAuditLog("PATIENT_CREATE", { patientId: id });
  if (key) await persistIdempotency(key, "OK", payload);
  res.json(payload);
});
app.get("/api/pacientes/quick", async (req, res) => {
  const t = (req.query.term || "").toString().trim().toLowerCase();
  const items = await readJson(path.join(dataDir, "pacientes.json"), []);
  let list = t
    ? items.filter(
        (p) =>
          (p.nome || "").toLowerCase().includes(t) ||
          (p.doc || "").toLowerCase().includes(t),
      )
    : items;
  list = list
    .sort((a, b) => (a.nome || "").localeCompare(b.nome || ""))
    .slice(0, 12);
  res.json({
    ok: true,
    items: list.map((p) => ({
      id: p.id,
      nome: p.nome,
      nascimento: p.nascimento,
      doc: p.doc,
    })),
  });
});

// evoluções
app.get("/api/pacientes/:id/evolucoes", async (req, res) => {
  const all = await readJson(path.join(dataDir, "evolucoes.json"), []);
  const list = all
    .filter((e) => e.pacienteId === req.params.id)
    .sort((a, b) => b.data.localeCompare(a.data));
  res.json({ ok: true, items: list });
});
app.get("/api/pacientes/:id/evolucoes/last", async (req, res) => {
  const all = await readJson(path.join(dataDir, "evolucoes.json"), []);
  const list = all
    .filter((e) => e.pacienteId === req.params.id)
    .sort((a, b) => b.data.localeCompare(a.data));
  res.json({ ok: true, item: list[0] || null });
});
app.post("/api/pacientes/:id/evolucoes", async (req, res) => {
  const key = (req.get("x-idempotency-key") || "").trim();
  if (key && (await maybeReplay(res, key))) return;
  const { texto, tipo, data } = req.body || {};
  if (!texto) {
    if (key)
      await persistIdempotency(key, "ERROR", {
        ok: false,
        error: "texto vazio",
      });
    return res.status(400).json({ ok: false, error: "texto vazio" });
  }
  const all = await readJson(path.join(dataDir, "evolucoes.json"), []);
  const evo = {
    id: genId(),
    pacienteId: req.params.id,
    tipo: tipo || "Evolução",
    data: data || new Date().toISOString(),
    texto,
  };
  all.push(evo);
  await writeJson(path.join(dataDir, "evolucoes.json"), all);
  const payload = { ok: true, item: evo };
  await appendTimelineEvent({
    id: `evt_evo_${evo.id}`,
    patientId: req.params.id,
    type: "NOTE_CREATE",
    createdAt: evo.data,
    payload: { tipo: evo.tipo },
  });
  await appendAuditLog("NOTE_CREATE", {
    patientId: req.params.id,
    noteId: evo.id,
  });
  if (key) await persistIdempotency(key, "OK", payload);
  res.json(payload);
});

app.get("/api/pacientes/:id/prescricoes", async (req, res) => {
  const all = await readJson(path.join(dataDir, "prescricoes.json"), []);
  const list = all
    .filter((p) => p.pacienteId === req.params.id)
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
  res.json({ ok: true, items: list });
});

app.get("/api/prescricoes/:id", async (req, res) => {
  const all = await readJson(path.join(dataDir, "prescricoes.json"), []);
  const item = all.find((p) => p.id === req.params.id);
  if (!item)
    return res
      .status(404)
      .json({ ok: false, error: "prescrição não encontrada" });
  res.json({ ok: true, item });
});

app.post("/api/prescricoes/print", async (req, res) => {
  const key = (req.get("x-idempotency-key") || "").trim();
  if (key && (await maybeReplay(res, key))) return;
  const body = req.body || {};
  const pacienteId = body.pacienteId;
  if (!pacienteId) {
    if (key)
      await persistIdempotency(key, "ERROR", {
        ok: false,
        error: "pacienteId obrigatório",
      });
    return res.status(400).json({ ok: false, error: "pacienteId obrigatório" });
  }
  const items = Array.isArray(body.items) ? body.items.filter(Boolean) : [];
  if (items.length === 0) {
    if (key)
      await persistIdempotency(key, "ERROR", {
        ok: false,
        error: "Informe ao menos um item",
      });
    return res
      .status(400)
      .json({ ok: false, error: "Informe ao menos um item" });
  }
  await fs.mkdir(dataDir, { recursive: true });
  const pacientes = await readJson(path.join(dataDir, "pacientes.json"), []);
  const paciente = pacientes.find((p) => p.id === pacienteId);
  if (!paciente) {
    if (key)
      await persistIdempotency(key, "ERROR", {
        ok: false,
        error: "Paciente não encontrado",
      });
    return res
      .status(404)
      .json({ ok: false, error: "Paciente não encontrado" });
  }
  const presc = {
    id: genId(),
    numero: await getNextCounter("PRESCRIPTION"),
    pacienteId,
    pacienteNome: paciente.nome || paciente.name || "Paciente",
    cid: body.cid || null,
    observacoes: body.observacoes || null,
    formato: body.formato || "A4",
    itens: items.map((item, index) => ({
      ordem: index + 1,
      nome: typeof item.nome === "string" ? item.nome.trim() : "",
      dose: typeof item.dose === "string" ? item.dose.trim() : "",
      via: typeof item.via === "string" ? item.via.trim() : "",
      horario: typeof item.horario === "string" ? item.horario.trim() : "",
      observacao:
        typeof item.observacao === "string" ? item.observacao.trim() : "",
    })),
    criadoEm: new Date().toISOString(),
    tipo: "PRINT",
  };
  presc.itens = presc.itens.filter(
    (i) => i.nome || i.dose || i.via || i.horario || i.observacao,
  );
  if (presc.itens.length === 0)
    return res.status(400).json({ ok: false, error: "Itens inválidos" });
  const all = await readJson(path.join(dataDir, "prescricoes.json"), []);
  all.push(presc);
  await writeJson(path.join(dataDir, "prescricoes.json"), all);
  await appendTimelineEvent({
    id: `evt_${presc.id}`,
    patientId: pacienteId,
    type: "PRESCRIPTION_PRINT",
    createdAt: presc.criadoEm,
    payload: { numero: presc.numero, formato: presc.formato },
  });
  await appendAuditLog("PRESCRIPTION_PRINT", {
    patientId: pacienteId,
    prescriptionId: presc.id,
    numero: presc.numero,
  });
  const payload = { ok: true, item: presc };
  if (key) await persistIdempotency(key, "OK", payload);
  res.json(payload);
});

app.get("/api/pacientes/:id/events", async (req, res) => {
  const events = await readJson(timelineFile, []);
  const list = events
    .filter((e) => e.patientId === req.params.id)
    .sort((a, b) => {
      const aDate = typeof a.createdAt === "string" ? a.createdAt : "";
      const bDate = typeof b.createdAt === "string" ? b.createdAt : "";
      return bDate.localeCompare(aDate);
    });
  res.json({ ok: true, items: list });
});

app.get("/api/pacientes/:id/export", async (req, res) => {
  const patientId = req.params.id;
  const pacientes = await readJson(path.join(dataDir, "pacientes.json"), []);
  const paciente = pacientes.find((p) => p.id === patientId);
  if (!paciente)
    return res
      .status(404)
      .json({ ok: false, error: "Paciente não encontrado" });
  const evolucoes = await readJson(path.join(dataDir, "evolucoes.json"), []);
  const prescricoes = await readJson(
    path.join(dataDir, "prescricoes.json"),
    [],
  );
  const events = await readJson(timelineFile, []);
  const payload = {
    paciente: {
      id: paciente.id,
      createdAt: paciente.criadoEm || paciente.createdAt || null,
      updatedAt: paciente.atualizadoEm || paciente.updatedAt || null,
      tags: paciente.tags || [],
      allergies: paciente.alergias || paciente.allergies || [],
      payer: paciente.payer || null,
      document: paciente.doc || paciente.document || null,
      birthDate: paciente.nascimento || paciente.birthDate || null,
      name: paciente.nome || paciente.name || null,
    },
    evolucoes: evolucoes.filter((e) => e.pacienteId === patientId),
    prescricoes: prescricoes.filter((p) => p.pacienteId === patientId),
    eventos: events.filter((e) => e.patientId === patientId),
  };
  await appendAuditLog("EXPORT_PATIENT_JSON", {
    patientId,
    exportedAt: new Date().toISOString(),
  });
  res.json({ ok: true, exportedAt: new Date().toISOString(), data: payload });
});

app.get("/auth/status", (req, res) => {
  const issuer = process.env.BIRDID_ISSUER || "";
  const clientId = process.env.BIRDID_CLIENT_ID || "";
  const redirectUri = process.env.BIRDID_REDIRECT_URI || "";
  const memedUrl = process.env.MEMED_SSO_URL || "";
  const mode = (process.env.MEMED_MODE || "print").toLowerCase();
  const online = Boolean(
    issuer && clientId && redirectUri && memedUrl && mode === "sso_birdid",
  );
  res.json({ ok: true, online, issuer: online ? issuer : null, mode });
});

app.post("/auth/login", async (req, res) => {
  const issuer = process.env.BIRDID_ISSUER || "";
  const clientId = process.env.BIRDID_CLIENT_ID || "";
  const redirectUri = process.env.BIRDID_REDIRECT_URI || "";
  const memedUrl = process.env.MEMED_SSO_URL || "";
  if (!issuer || !clientId || !redirectUri || !memedUrl) {
    return res
      .status(503)
      .json({ ok: false, error: "Configuração Bird ID ausente" });
  }
  const body = req.body || {};
  const codeChallenge =
    typeof body.codeChallenge === "string" ? body.codeChallenge : "";
  const state = typeof body.state === "string" ? body.state : "";
  if (!codeChallenge) {
    return res
      .status(400)
      .json({ ok: false, error: "codeChallenge obrigatório" });
  }
  const authorizeUrl = new URL(`${issuer.replace(/\/$/, "")}/authorize`);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "openid profile");
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  if (state) authorizeUrl.searchParams.set("state", state);
  res.json({
    ok: true,
    authorizeUrl: authorizeUrl.toString(),
    returnUrl: memedUrl,
  });
});

app.post("/auth/callback", (req, res) => {
  res.status(202).json({
    ok: false,
    error:
      "Implementação completa do callback deve ser feita com credenciais reais.",
  });
});

// stats
app.get("/api/stats", async (req, res) => {
  const pac = await readJson(path.join(dataDir, "pacientes.json"), []);
  const evo = await readJson(path.join(dataDir, "evolucoes.json"), []);
  res.json({
    ok: true,
    pacientes: pac.length,
    evolucoes: evo.length,
    prescricoes: 0,
    consultasHoje: 0,
  });
});

// estáticos e SPA
app.use("/app/assets", express.static(path.join(pub, "app", "assets")));
app.use("/assets", express.static(path.join(pub, "assets")));
app.get(["/", "/app"], (req, res) => res.redirect("/app/"));
app.get("/app/*", (req, res) =>
  res.sendFile(path.join(pub, "app", "index.html")),
);

const PORT = 3030;
app.listen(PORT, () => console.log("OK http://127.0.0.1:" + PORT + "/app/"));
