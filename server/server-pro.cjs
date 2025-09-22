const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const { URL } = require("url");
const { z } = require("zod");
// Import shared contracts (prefer package scope then dist/src fallback)
let Contracts;
try {
  Contracts = require("@prontuario/contracts");
} catch {
  try {
    Contracts = require("../contracts/dist");
  } catch {
    try {
      Contracts = require("../contracts/src");
    } catch {
      Contracts = {};
    }
  }
}

const prisma = new PrismaClient();
const uploadsBaseDir = path.resolve(__dirname, "uploads");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});
const allowedAttachmentMimes = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
]);

const ensureDirectory = async (targetPath) => {
  if (!fs.existsSync(targetPath)) {
    await fsPromises.mkdir(targetPath, { recursive: true });
  }
};

const sanitizeFileName = (rawName) => {
  if (!rawName) return "arquivo";
  return (
    rawName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_\-.]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 120) || "arquivo"
  );
};

const formatYearMonth = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  return `${year}${month}`;
};

const saveAttachmentFile = async ({
  patientId,
  noteId,
  originalName,
  buffer,
  mimeType,
}) => {
  const sanitized = sanitizeFileName(originalName);
  const extension = path.extname(sanitized).toLowerCase();
  if (![".pdf", ".png", ".jpg", ".jpeg"].includes(extension)) {
    throw new Error("Extensão de arquivo não suportada");
  }
  const baseName = sanitized.slice(0, sanitized.length - extension.length);
  if (baseName.includes(".")) {
    throw new Error("Nome de arquivo inválido (dupla extensão)");
  }
  if (!allowedAttachmentMimes.has(mimeType)) {
    throw new Error("Tipo de arquivo não permitido");
  }
  const now = new Date();
  const folder = path.join(
    uploadsBaseDir,
    patientId,
    noteId,
    formatYearMonth(now)
  );
  await ensureDirectory(folder);
  const finalName = `${baseName || "arquivo"}-${now.getTime()}${extension}`;
  const targetPath = path.join(folder, finalName);
  await fsPromises.writeFile(targetPath, buffer);
  return path.relative(uploadsBaseDir, targetPath);
};

const resolveAttachmentPath = (relativePath) =>
  path.resolve(uploadsBaseDir, relativePath);

const writeInfo = (message) => {
  if (message) {
    process.stdout.write(`${message}\n`);
  }
};

const writeError = (error) => {
  const output =
    error instanceof Error
      ? (error.stack ?? error.message)
      : typeof error === "string"
        ? error
        : JSON.stringify(error);
  process.stderr.write(`${output}\n`);
};

const app = express();
app.disable("x-powered-by");

ensureDirectory(uploadsBaseDir).catch(() => undefined);

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const isProd =
  String(process.env.NODE_ENV || "").toLowerCase() === "production";
const connectSrc = ["'self'"];
if (!isProd) {
  connectSrc.push("ws:", "http://localhost:5173");
}
if (process.env.BIRDID_ISSUER) connectSrc.push(process.env.BIRDID_ISSUER);
if (process.env.MEMED_SSO_URL) connectSrc.push(process.env.MEMED_SSO_URL);

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc,
      },
    },
    crossOriginResourcePolicy: { policy: "same-origin" },
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(apiLimiter);
// Structured HTTP logs
app.use((req, res, next) => {
  const start = Date.now();
  const { method, url } = req;
  res.on("finish", () =>
    writeInfo(
      JSON.stringify({
        t: new Date().toISOString(),
        level: "info",
        msg: "http_request",
        method,
        url,
        status: res.statusCode,
        dur_ms: Date.now() - start,
        ua: req.headers["user-agent"] || null,
      })
    )
  );
  next();
});

// Idempotency TTL (seconds); can be overridden via env IDEMP_TTL_SEC
const IDEMP_TTL_SEC = Number(process.env.IDEMP_TTL_SEC || 600);

// Idempotency with optional Redis (REDIS_URL), fallback in-memory
let idempBackend = null;
let useRedis = false;
if (process.env.REDIS_URL) {
  try {
    const { createClient } = require("redis");
    const client = createClient({ url: process.env.REDIS_URL });
    client.on("error", (err) => writeError(err));
    client.connect().catch((e) => writeError(e));
    idempBackend = client;
    useRedis = true;
    writeInfo("Idempotency: Redis backend enabled");
  } catch {
    writeError("Redis not available, using in-memory idempotency.");
  }
}
const idempStore = new Map(); // key -> { hash, status, body, expiresAt }
require("timers")
  .setInterval(() => {
    const now = Date.now();
    for (const [k, v] of idempStore.entries()) {
      if (v.expiresAt <= now) idempStore.delete(k);
    }
  }, 30_000)
  .unref();

const idempotencyMiddleware = (routeKey) => async (req, res, next) => {
  try {
    const key = req.get("Idempotency-Key");
    const hash = req.get("X-Payload-Hash");
    if (!key || !hash) return next();
    const composite = `${routeKey}:${key}`;

    const readExisting = async () =>
      useRedis && idempBackend
        ? JSON.parse((await idempBackend.get(composite)) || "null")
        : idempStore.get(composite) || null;
    const writeRecord = async (value) =>
      useRedis && idempBackend
        ? idempBackend.set(composite, JSON.stringify(value), {
            EX: IDEMP_TTL_SEC,
          })
        : idempStore.set(composite, value);

    const existing = await readExisting();
    if (existing) {
      if (existing.hash !== hash) {
        return res.status(409).json({
          type: "about:blank",
          title: "Idempotência em conflito",
          status: 409,
          detail: "Chave já usada para payload diferente.",
        });
      }
      if (existing.status && existing.body !== undefined) {
        res.status(existing.status);
        return res.json(existing.body);
      }
    }
    await writeRecord({
      hash,
      status: null,
      body: undefined,
      expiresAt: Date.now() + IDEMP_TTL_SEC * 1000,
    });
    const originalJson = res.json.bind(res);
    res.json = (payload) => {
      const record = {
        hash,
        status: res.statusCode || 200,
        body: payload,
        expiresAt: Date.now() + IDEMP_TTL_SEC * 1000,
      };
      void writeRecord(record).catch(writeError);
      return originalJson(payload);
    };
    next();
  } catch (e) {
    next(e);
  }
};

// Optional CSRF double-submit (enable with ENABLE_CSRF=1)
if (process.env.ENABLE_CSRF === "1") {
  const parseCookies = (cookieHeader) => {
    const out = {};
    if (!cookieHeader) return out;
    String(cookieHeader)
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .forEach((pair) => {
        const idx = pair.indexOf("=");
        if (idx > -1) {
          const k = decodeURIComponent(pair.slice(0, idx).trim());
          const v = decodeURIComponent(pair.slice(idx + 1).trim());
          out[k] = v;
        }
      });
    return out;
  };

  app.use((req, res, next) => {
    const cookies = parseCookies(req.headers.cookie);
    let token = cookies["csrf-token"];
    if (!token) {
      token = crypto.randomBytes(16).toString("hex");
      const attrs = ["Path=/", "SameSite=Lax"];
      if (isProd) attrs.push("Secure");
      res.setHeader("Set-Cookie", `csrf-token=${token}; ${attrs.join("; ")}`);
    }
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      const header = req.get("x-csrf-token");
      if (header !== token) {
        return res.status(403).json({
          type: "about:blank",
          title: "CSRF inválido",
          status: 403,
          detail: "Token CSRF ausente ou inválido.",
        });
      }
    }
    next();
  });
}

const PATIENT_PAGE_SIZE_DEFAULT = 15;

const safeString = (value) =>
  typeof value === "string"
    ? value
    : value === null || value === undefined
      ? null
      : String(value);

const normalizeDateToISO = (value) => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const candidate = trimmed.includes("T")
    ? trimmed
    : `${trimmed}T00:00:00-03:00`;
  const date = new Date(candidate);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Data inválida");
  }
  return date.toISOString();
};

const patientBodySchema =
  Contracts?.PatientCreateUpdateSchema ??
  z
    .object({
      name: z.string().trim().min(1, "Nome obrigatório").max(160),
      document: z
        .string()
        .trim()
        .min(3, "Documento muito curto")
        .max(32, "Documento muito longo")
        .optional()
        .or(z.literal(""))
        .transform((value) => {
          const normalized = value?.trim();
          return normalized ? normalized : null;
        }),
      birthDate: z
        .string()
        .optional()
        .or(z.null())
        .transform((value) => {
          if (!value) return null;
          return normalizeDateToISO(value);
        }),
      contact: z
        .object({
          phone: z.string().trim().max(64).optional(),
          email: z.string().trim().email("E-mail inválido").max(120).optional(),
          notes: z.string().trim().max(280).optional(),
        })
        .partial()
        .optional()
        .transform((value) => {
          if (!value) return null;
          const cleanedEntries = Object.entries(value).filter(([, val]) => {
            if (typeof val !== "string") {
              return false;
            }
            return Boolean(val.trim());
          });
          if (!cleanedEntries.length) return null;
          return Object.fromEntries(
            cleanedEntries.map(([key, val]) => [
              key,
              typeof val === "string" ? val.trim() : val,
            ])
          );
        }),
      payer: z
        .string()
        .trim()
        .max(120)
        .optional()
        .or(z.literal(""))
        .transform((value) => {
          const normalized = value?.trim();
          return normalized ? normalized : null;
        }),
      allergies: z
        .array(z.string().trim().min(1, "Alergia inválida").max(80))
        .max(24)
        .optional()
        .default([]),
      tags: z
        .array(z.string().trim().min(1).max(60))
        .max(24)
        .optional()
        .default([]),
    })
    .strict();

const encounterBodySchema =
  Contracts?.EncounterCreateSchema ??
  z
    .object({
      patientId: z.string().trim().min(1, "Paciente obrigatório"),
      date: z
        .string()
        .optional()
        .or(z.null())
        .transform((value) => {
          if (!value) return null;
          return normalizeDateToISO(value);
        }),
      type: z.string().trim().min(1, "Tipo obrigatório").max(64),
    })
    .strict();

const noteCreateSchema =
  Contracts?.NoteCreateSchema ??
  z
    .object({
      encounterId: z.string().trim().min(1, "Encontro obrigatório"),
      authorId: z.string().trim().optional(),
      contentText: z.string().trim().min(1, "Conteúdo obrigatório"),
    })
    .strict();

const noteUpdateSchema =
  Contracts?.NoteUpdateSchema ??
  z
    .object({
      contentText: z.string().trim().min(1, "Conteúdo obrigatório"),
      authorId: z.string().trim().optional(),
    })
    .strict();

const prescriptionCreateSchema = Contracts?.PrescriptionCreateSchema
  ? Contracts.PrescriptionCreateSchema
  : z
      .object({
        patientId: z.string().trim().min(1, "Paciente obrigatório"),
        formato: z.enum(["A4", "A5"]).default("A4"),
        cid: z
          .string()
          .trim()
          .optional()
          .or(z.literal(""))
          .transform((v) => (v?.trim() ? v.trim() : null)),
        observacoes: z
          .string()
          .trim()
          .optional()
          .or(z.literal(""))
          .transform((v) => (v?.trim() ? v.trim() : null)),
        items: z
          .array(
            z.object({
              nome: z.string().trim().min(1),
              dose: z.string().trim().optional().or(z.literal("")),
              via: z.string().trim().optional().or(z.literal("")),
              horario: z.string().trim().optional().or(z.literal("")),
              observacao: z.string().trim().optional().or(z.literal("")),
            })
          )
          .min(1, "Informe ao menos um item"),
      })
      .strict();

const querySchema = z
  .object({
    query: z.string().trim().optional(),
    page: z
      .string()
      .optional()
      .transform((value) => {
        if (!value) return 1;
        const parsed = Number.parseInt(value, 10);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
      }),
    perPage: z
      .string()
      .optional()
      .transform((value) => {
        if (!value) return PATIENT_PAGE_SIZE_DEFAULT;
        const parsed = Number.parseInt(value, 10);
        if (!Number.isFinite(parsed) || parsed <= 0)
          return PATIENT_PAGE_SIZE_DEFAULT;
        return Math.min(parsed, 50);
      }),
  })
  .transform((params) => ({
    query: params.query?.trim() ?? "",
    page: params.page ?? 1,
    perPage: params.perPage ?? PATIENT_PAGE_SIZE_DEFAULT,
  }));

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const computeHash = (payload) =>
  crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");

const appendAuditLog = async ({ who, what, meta }) => {
  const lastLog = await prisma.auditLog.findFirst({
    orderBy: { when: "desc" },
    select: { meta: true },
  });
  const previousHash =
    typeof lastLog?.meta?.hash === "string" ? lastLog.meta.hash : null;
  const baseEntry = {
    who: who ?? null,
    what,
    when: new Date(),
    hashPrev: previousHash,
    meta: meta ?? {},
  };
  const currentHash = computeHash({
    ...baseEntry,
    meta: meta ?? {},
    hashPrev: previousHash,
  });
  const entryWithHash = {
    ...baseEntry,
    meta: { ...(meta ?? {}), hash: currentHash },
  };
  return prisma.auditLog.create({ data: entryWithHash });
};

const appendEvent = async (patientId, type, payload) => {
  const lastEvent = await prisma.event.findFirst({
    where: { patientId },
    orderBy: { createdAt: "desc" },
    select: { payload: true },
  });
  const previousHash =
    typeof lastEvent?.payload?.hash === "string"
      ? lastEvent.payload.hash
      : null;
  const basePayload = {
    ...payload,
    hashPrev: previousHash,
  };
  const currentHash = computeHash({
    patientId,
    type,
    payload: basePayload,
    hashPrev: previousHash,
  });
  const storedPayload = {
    ...basePayload,
    hash: currentHash,
  };
  return prisma.event.create({
    data: {
      patientId,
      type,
      hashPrev: previousHash,
      payload: storedPayload,
    },
  });
};

const serializePatient = (record) => ({
  id: record.id,
  name: record.name,
  document: record.document,
  birthDate: record.birthDate ? record.birthDate.toISOString() : null,
  contact: record.contactJson ?? null,
  payer: record.payer,
  allergies: record.allergies ?? [],
  tags: record.tags ?? [],
  createdAt: record.createdAt.toISOString(),
  updatedAt: record.updatedAt.toISOString(),
});

const computeHighlights = (patient, query) => {
  if (!query) return {};
  const target = query.toLowerCase();
  const fields = {
    name: patient.name ?? "",
    document: patient.document ?? "",
    payer: patient.payer ?? "",
  };
  const contactText = safeString(
    patient.contact?.phone ??
      patient.contact?.email ??
      patient.contact?.notes ??
      ""
  );
  if (contactText) {
    fields.contact = contactText;
  }
  const highlights = {};
  const buildRanges = (text) => {
    const ranges = [];
    const lower = text.toLowerCase();
    let index = lower.indexOf(target);
    while (index !== -1) {
      ranges.push([index, index + target.length]);
      index = lower.indexOf(target, index + target.length);
    }
    return ranges;
  };
  Object.entries(fields).forEach(([field, value]) => {
    if (!value) return;
    const ranges = buildRanges(value.toString());
    if (ranges.length) {
      highlights[field] = ranges;
    }
  });
  return highlights;
};

const serializeEncounter = (record) => ({
  id: record.id,
  patientId: record.patientId,
  date: record.date.toISOString(),
  type: record.type,
  createdAt: record.createdAt.toISOString(),
});

const serializeNote = (record) => ({
  id: record.id,
  encounterId: record.encounterId,
  authorId: record.authorId ?? null,
  contentText: record.contentText,
  version: record.version,
  createdAt: record.createdAt.toISOString(),
  updatedAt: record.updatedAt.toISOString(),
  encounter:
    record.encounter && record.encounter.patientId
      ? {
          id: record.encounter.id,
          patientId: record.encounter.patientId,
          date:
            record.encounter.date?.toISOString?.() ??
            new Date(record.encounter.date).toISOString(),
          type: record.encounter.type,
        }
      : undefined,
  attachments: Array.isArray(record.Attachments)
    ? record.Attachments.map((attachment) => ({
        id: attachment.id,
        noteId: attachment.noteId,
        fileName: attachment.fileName,
        mime: attachment.mime,
        size: attachment.size,
        createdAt: attachment.createdAt.toISOString(),
      }))
    : [],
});

const serializeNoteVersion = (record) => ({
  id: record.id,
  noteId: record.noteId,
  version: record.version,
  contentText: record.contentText,
  createdAt: record.createdAt.toISOString(),
});

const summarizeContent = (content) => {
  const normalized = content.replace(/\s+/g, " ").trim();
  return normalized.length > 160
    ? `${normalized.slice(0, 157)}...`
    : normalized;
};

app.get(
  "/api/v1/health",
  asyncHandler(async (req, res) => {
    const patientCount = await prisma.patient.count();
    res.json({
      status: "ok",
      patients: patientCount,
      timestamp: new Date().toISOString(),
    });
  })
);

app.get(
  "/api/v1/patients",
  asyncHandler(async (req, res) => {
    const { query, page, perPage } = querySchema.parse(req.query ?? {});
    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { document: { contains: query, mode: "insensitive" } },
            { payer: { contains: query, mode: "insensitive" } },
            {
              contactJson: {
                path: ["phone"],
                string_contains: query,
                string_mode: "insensitive",
              },
            },
            {
              contactJson: {
                path: ["email"],
                string_contains: query,
                string_mode: "insensitive",
              },
            },
            {
              contactJson: {
                path: ["notes"],
                string_contains: query,
                string_mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const [total, records] = await Promise.all([
      prisma.patient.count({ where }),
      prisma.patient.findMany({
        where,
        orderBy: [{ updatedAt: "desc" }],
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    const items = records.map((record) => {
      const serialized = serializePatient(record);
      return {
        patient: serialized,
        highlights: computeHighlights(serialized, query),
      };
    });

    res.json({
      page,
      perPage,
      total,
      items,
    });
  })
);

app.get(
  "/api/v1/patients/metrics",
  asyncHandler(async (req, res) => {
    const [totalPatients, encountersToday, prescriptions, allergyAlerts] =
      await Promise.all([
        prisma.patient.count(),
        prisma.event.count({
          where: {
            type: "ENCOUNTER",
            createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
          },
        }),
        prisma.event.count({ where: { type: "PRESCRIPTION" } }),
        prisma.patient.count({ where: { allergies: { isEmpty: false } } }),
      ]);

    res.json({
      totalPatients,
      encountersToday,
      activePrescriptions: prescriptions,
      allergyAlerts,
    });
  })
);

app.get(
  "/api/v1/patients/:id",
  asyncHandler(async (req, res) => {
    const record = await prisma.patient.findUnique({
      where: { id: req.params.id },
    });
    if (!record) {
      return res.status(404).json({
        type: "about:blank",
        title: "Paciente não encontrado",
        status: 404,
        detail: `Paciente ${req.params.id} inexistente`,
      });
    }
    res.json({ patient: serializePatient(record) });
  })
);

app.post(
  "/api/v1/patients",
  asyncHandler(async (req, res) => {
    const payload = patientBodySchema.parse(req.body ?? {});
    const created = await prisma.patient.create({
      data: {
        name: payload.name,
        document: payload.document,
        birthDate: payload.birthDate ? new Date(payload.birthDate) : null,
        contactJson: payload.contact,
        payer: payload.payer,
        allergies: payload.allergies,
        tags: payload.tags,
      },
    });

    await appendEvent(created.id, "PATIENT_CREATE", {
      summary: "Paciente cadastrado",
      snapshot: serializePatient(created),
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Paciente ${created.id} criado`,
      meta: { patientId: created.id },
    });

    res.status(201).json({ patient: serializePatient(created) });
  })
);

app.put(
  "/api/v1/patients/:id",
  asyncHandler(async (req, res) => {
    const payload = patientBodySchema.parse(req.body ?? {});

    const updated = await prisma.patient.update({
      where: { id: req.params.id },
      data: {
        name: payload.name,
        document: payload.document,
        birthDate: payload.birthDate ? new Date(payload.birthDate) : null,
        contactJson: payload.contact,
        payer: payload.payer,
        allergies: payload.allergies,
        tags: payload.tags,
      },
    });

    await appendEvent(updated.id, "PATIENT_UPDATE", {
      summary: "Dados do paciente atualizados",
      snapshot: serializePatient(updated),
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Paciente ${updated.id} atualizado`,
      meta: { patientId: updated.id },
    });

    res.json({ patient: serializePatient(updated) });
  })
);

app.delete(
  "/api/v1/patients/:id",
  asyncHandler(async (req, res) => {
    const removed = await prisma.patient.delete({
      where: { id: req.params.id },
    });

    await appendEvent(removed.id, "PATIENT_DELETE", {
      summary: "Paciente removido",
      snapshot: { id: removed.id, name: removed.name },
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Paciente ${removed.id} excluído`,
      meta: { patientId: removed.id },
    });

    res.status(204).send();
  })
);

app.get(
  "/api/v1/patients/:id/events",
  asyncHandler(async (req, res) => {
    const events = await prisma.event.findMany({
      where: { patientId: req.params.id },
      orderBy: { createdAt: "desc" },
    });
    const serialized = events.map((event) => ({
      id: event.id,
      patientId: event.patientId,
      type: event.type,
      createdAt: event.createdAt.toISOString(),
      hashPrev: event.hashPrev,
      payload: event.payload ?? null,
    }));
    res.json({ items: serialized });
  })
);

app.post(
  "/api/v1/encounters",
  asyncHandler(async (req, res) => {
    const payload = encounterBodySchema.parse(req.body ?? {});
    const patient = await prisma.patient.findUnique({
      where: { id: payload.patientId },
    });
    if (!patient) {
      return res.status(404).json({
        type: "about:blank",
        title: "Paciente não encontrado",
        status: 404,
        detail: `Paciente ${payload.patientId} inexistente`,
      });
    }

    const encounter = await prisma.encounter.create({
      data: {
        patientId: payload.patientId,
        date: payload.date ? new Date(payload.date) : undefined,
        type: payload.type,
      },
    });

    await appendEvent(payload.patientId, "ENCOUNTER", {
      encounterId: encounter.id,
      type: encounter.type,
      date: encounter.date.toISOString(),
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Encontro ${encounter.id} criado`,
      meta: { patientId: payload.patientId, encounterId: encounter.id },
    });

    res.status(201).json({ encounter: serializeEncounter(encounter) });
  })
);

app.get(
  "/api/v1/encounters",
  asyncHandler(async (req, res) => {
    const patientId =
      typeof req.query?.patient_id === "string"
        ? req.query.patient_id.trim()
        : "";
    if (!patientId) {
      return res.status(400).json({
        type: "about:blank",
        title: "Paciente obrigatório",
        status: 400,
        detail: "Informe patient_id na consulta.",
      });
    }
    const page = Number.parseInt(req.query?.page ?? "1", 10);
    const pageSize = Number.parseInt(req.query?.page_size ?? "10", 10);
    const normalizedPage = Number.isFinite(page) && page > 0 ? page : 1;
    const normalizedPageSize =
      Number.isFinite(pageSize) && pageSize > 0 ? Math.min(pageSize, 50) : 10;

    const [total, records] = await Promise.all([
      prisma.encounter.count({ where: { patientId } }),
      prisma.encounter.findMany({
        where: { patientId },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        skip: (normalizedPage - 1) * normalizedPageSize,
        take: normalizedPageSize,
        include: {
          notes: {
            orderBy: { updatedAt: "desc" },
            take: 1,
          },
        },
      }),
    ]);

    const items = records.map((record) => ({
      encounter: serializeEncounter(record),
      latestNote: record.notes?.[0]
        ? {
            id: record.notes[0].id,
            version: record.notes[0].version,
            updatedAt: record.notes[0].updatedAt.toISOString(),
            summary: summarizeContent(record.notes[0].contentText),
          }
        : null,
    }));

    res.json({
      page: normalizedPage,
      pageSize: normalizedPageSize,
      total,
      items,
    });
  })
);

app.get(
  "/api/v1/encounters/:id",
  asyncHandler(async (req, res) => {
    const encounter = await prisma.encounter.findUnique({
      where: { id: req.params.id },
      include: {
        notes: {
          include: { Attachments: true },
          orderBy: { updatedAt: "desc" },
        },
      },
    });

    if (!encounter) {
      return res.status(404).json({
        type: "about:blank",
        title: "Encontro não encontrado",
        status: 404,
        detail: `Encontro ${req.params.id} inexistente`,
      });
    }

    res.json({
      encounter: serializeEncounter(encounter),
      notes: encounter.notes.map((note) => serializeNote(note)),
    });
  })
);

app.post(
  "/api/v1/notes",
  asyncHandler(async (req, res) => {
    const payload = noteCreateSchema.parse(req.body ?? {});
    const encounter = await prisma.encounter.findUnique({
      where: { id: payload.encounterId },
      include: { patient: true },
    });

    if (!encounter) {
      return res.status(404).json({
        type: "about:blank",
        title: "Encontro não encontrado",
        status: 404,
        detail: `Encontro ${payload.encounterId} inexistente`,
      });
    }

    const note = await prisma.note.create({
      data: {
        encounterId: payload.encounterId,
        authorId: payload.authorId ?? null,
        contentText: payload.contentText,
      },
      include: { Attachments: true, encounter: true },
    });

    await prisma.noteVersion.create({
      data: {
        noteId: note.id,
        version: 1,
        contentText: payload.contentText,
      },
    });

    const contentHash = computeHash({
      noteId: note.id,
      version: 1,
      content: payload.contentText,
    });

    await appendEvent(encounter.patientId, "NOTE_CREATE", {
      noteId: note.id,
      encounterId: payload.encounterId,
      version: 1,
      summary: summarizeContent(payload.contentText),
      hash: contentHash,
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Nota ${note.id} criada`,
      meta: {
        patientId: encounter.patientId,
        encounterId: payload.encounterId,
        noteId: note.id,
        contentHash,
      },
    });

    res.status(201).json({ note: serializeNote(note) });
  })
);

app.put(
  "/api/v1/notes/:id",
  asyncHandler(async (req, res) => {
    const payload = noteUpdateSchema.parse(req.body ?? {});
    const existing = await prisma.note.findUnique({
      where: { id: req.params.id },
      include: { encounter: true, Attachments: true },
    });

    if (!existing) {
      return res.status(404).json({
        type: "about:blank",
        title: "Nota não encontrada",
        status: 404,
        detail: `Nota ${req.params.id} inexistente`,
      });
    }

    const nextVersion = existing.version + 1;

    const note = await prisma.note.update({
      where: { id: req.params.id },
      data: {
        contentText: payload.contentText,
        authorId: payload.authorId ?? existing.authorId,
        version: nextVersion,
      },
      include: { Attachments: true, encounter: true },
    });

    await prisma.noteVersion.create({
      data: {
        noteId: note.id,
        version: nextVersion,
        contentText: payload.contentText,
      },
    });

    const contentHash = computeHash({
      noteId: note.id,
      version: nextVersion,
      content: payload.contentText,
    });

    await appendEvent(existing.encounter.patientId, "NOTE_UPDATE", {
      noteId: note.id,
      encounterId: note.encounterId,
      version: nextVersion,
      summary: summarizeContent(payload.contentText),
      hash: contentHash,
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Nota ${note.id} atualizada`,
      meta: {
        patientId: existing.encounter.patientId,
        encounterId: note.encounterId,
        noteId: note.id,
        contentHash,
      },
    });

    res.json({ note: serializeNote(note) });
  })
);

app.get(
  "/api/v1/notes/:id",
  asyncHandler(async (req, res) => {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id },
      include: { Attachments: true, encounter: true },
    });

    if (!note) {
      return res.status(404).json({
        type: "about:blank",
        title: "Nota não encontrada",
        status: 404,
        detail: `Nota ${req.params.id} inexistente`,
      });
    }

    res.json({ note: serializeNote(note) });
  })
);

app.get(
  "/api/v1/notes/:id/versions",
  asyncHandler(async (req, res) => {
    const versions = await prisma.noteVersion.findMany({
      where: { noteId: req.params.id },
      orderBy: { version: "desc" },
    });

    res.json({
      versions: versions.map((version) => serializeNoteVersion(version)),
    });
  })
);

app.post(
  "/api/v1/attachments",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const noteId =
      typeof req.body?.noteId === "string" ? req.body.noteId.trim() : "";
    if (!noteId) {
      return res.status(400).json({
        type: "about:blank",
        title: "Nota obrigatória",
        status: 400,
        detail: "Informe noteId no formulário.",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        type: "about:blank",
        title: "Arquivo ausente",
        status: 400,
        detail: "Envie um arquivo pdf/png/jpg/jpeg de até 10 MB.",
      });
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId },
      include: { encounter: true },
    });

    if (!note) {
      return res.status(404).json({
        type: "about:blank",
        title: "Nota não encontrada",
        status: 404,
        detail: `Nota ${noteId} inexistente`,
      });
    }

    const relativePath = await saveAttachmentFile({
      patientId: note.encounter.patientId,
      noteId,
      originalName: req.file.originalname,
      buffer: req.file.buffer,
      mimeType: req.file.mimetype,
    });

    const attachment = await prisma.attachment.create({
      data: {
        noteId,
        filePath: relativePath,
        fileName: sanitizeFileName(req.file.originalname),
        mime: req.file.mimetype,
        size: req.file.size,
      },
    });

    const attachmentHash = computeHash({
      noteId,
      attachmentId: attachment.id,
      mime: attachment.mime,
      size: attachment.size,
      fileName: attachment.fileName,
    });

    await appendEvent(note.encounter.patientId, "ATTACHMENT", {
      noteId,
      attachmentId: attachment.id,
      fileName: attachment.fileName,
      mime: attachment.mime,
      size: attachment.size,
      hash: attachmentHash,
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Anexo ${attachment.id} enviado`,
      meta: {
        patientId: note.encounter.patientId,
        encounterId: note.encounterId,
        noteId,
        attachmentId: attachment.id,
        attachmentHash,
      },
    });

    res.status(201).json({
      attachment: {
        id: attachment.id,
        noteId: attachment.noteId,
        fileName: attachment.fileName,
        mime: attachment.mime,
        size: attachment.size,
        createdAt: attachment.createdAt.toISOString(),
      },
    });
  })
);

// Auth status / login stubs for prescriptions SSO (Bird ID / Memed)
app.get("/auth/status", (req, res) => {
  const issuer = process.env.BIRDID_ISSUER || "";
  const clientId = process.env.BIRDID_CLIENT_ID || "";
  const redirectUri = process.env.BIRDID_REDIRECT_URI || "";
  const memedUrl = process.env.MEMED_SSO_URL || "";
  const mode = (process.env.MEMED_MODE || "print").toLowerCase();
  const online = Boolean(
    issuer && clientId && redirectUri && memedUrl && mode === "sso_birdid"
  );
  res.json({ ok: true, online, issuer: online ? issuer : null, mode });
});
// Alias expected by webapp API base (/api)
app.get("/api/auth/status", (req, res) => {
  const issuer = process.env.BIRDID_ISSUER || "";
  const clientId = process.env.BIRDID_CLIENT_ID || "";
  const redirectUri = process.env.BIRDID_REDIRECT_URI || "";
  const memedUrl = process.env.MEMED_SSO_URL || "";
  const mode = (process.env.MEMED_MODE || "print").toLowerCase();
  const online = Boolean(
    issuer && clientId && redirectUri && memedUrl && mode === "sso_birdid"
  );
  res.json({ ok: true, online, issuer: online ? issuer : null, mode });
});

app.post("/auth/login", (req, res) => {
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
// Alias expected by webapp API base (/api)
app.post("/api/auth/login", (req, res) => {
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

// Prescriptions endpoints (v1)
const serializePrescription = (record, patientName) => ({
  id: record.id,
  numero: record.number,
  pacienteId: record.patientId,
  pacienteNome: patientName || "Paciente",
  cid: record.cid ?? null,
  observacoes: record.observacoes ?? null,
  formato: record.formato,
  itens: Array.isArray(record.items) ? record.items : [],
  criadoEm: record.createdAt.toISOString(),
  tipo: "PRINT",
});

app.get(
  "/api/v1/patients/:id/prescriptions",
  asyncHandler(async (req, res) => {
    const patientId = req.params.id;
    const items = await prisma.prescription.findMany({
      where: { patientId },
      orderBy: { createdAt: "desc" },
      include: { patient: true },
    });
    const list = items.map((p) => serializePrescription(p, p.patient?.name));
    res.json({ items: list });
  })
);

app.get(
  "/api/v1/prescriptions/:id",
  asyncHandler(async (req, res) => {
    const p = await prisma.prescription.findUnique({
      where: { id: req.params.id },
      include: { patient: true },
    });
    if (!p)
      return res
        .status(404)
        .json({ ok: false, error: "prescrição não encontrada" });
    res.json({ item: serializePrescription(p, p.patient?.name) });
  })
);

app.post(
  "/api/v1/prescriptions/print",
  idempotencyMiddleware("POST:/api/v1/prescriptions/print"),
  asyncHandler(async (req, res) => {
    const input = prescriptionCreateSchema.parse(req.body || {});
    const patient = await prisma.patient.findUnique({
      where: { id: input.patientId },
    });
    if (!patient)
      return res
        .status(404)
        .json({ ok: false, error: "Paciente não encontrado" });
    // normalize items with ordem
    const normalizedItems = input.items
      .map((it, idx) => ({
        ordem: idx + 1,
        nome: it.nome,
        dose: it.dose || undefined,
        via: it.via || undefined,
        horario: it.horario || undefined,
        observacao: it.observacao || undefined,
      }))
      .filter((i) => i.nome || i.dose || i.via || i.horario || i.observacao);
    if (normalizedItems.length === 0)
      return res.status(400).json({ ok: false, error: "Itens inválidos" });

    const created = await prisma.prescription.create({
      data: {
        patientId: input.patientId,
        formato: input.formato,
        cid: input.cid,
        observacoes: input.observacoes,
        items: normalizedItems,
      },
      include: { patient: true },
    });

    await appendEvent(input.patientId, "PRESCRIPTION", {
      prescriptionId: created.id,
      numero: created.number,
      formato: created.formato,
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Prescrição ${created.id} emitida`,
      meta: {
        patientId: input.patientId,
        prescriptionId: created.id,
        numero: created.number,
      },
    });

    res.json({ item: serializePrescription(created, created.patient?.name) });
  })
);

// Portuguese alias routes used by webapp client (API_BASE=/api)
app.get(
  "/api/pacientes/:id/prescricoes",
  asyncHandler(async (req, res) => {
    const patientId = req.params.id;
    const items = await prisma.prescription.findMany({
      where: { patientId },
      orderBy: { createdAt: "desc" },
      include: { patient: true },
    });
    const list = items.map((p) => serializePrescription(p, p.patient?.name));
    res.json({ items: list });
  })
);

app.get(
  "/api/prescricoes/:id",
  asyncHandler(async (req, res) => {
    const p = await prisma.prescription.findUnique({
      where: { id: req.params.id },
      include: { patient: true },
    });
    if (!p)
      return res
        .status(404)
        .json({ ok: false, error: "prescrição não encontrada" });
    res.json({ item: serializePrescription(p, p.patient?.name) });
  })
);

app.post(
  "/api/prescricoes/print",
  idempotencyMiddleware("POST:/api/prescricoes/print"),
  asyncHandler(async (req, res) => {
    const body = req.body || {};
    // map alias key pacienteId -> patientId
    if (typeof body.pacienteId === "string" && !body.patientId) {
      body.patientId = body.pacienteId;
    }
    const input = prescriptionCreateSchema.parse(body);
    const patient = await prisma.patient.findUnique({
      where: { id: input.patientId },
    });
    if (!patient)
      return res
        .status(404)
        .json({ ok: false, error: "Paciente não encontrado" });
    const normalizedItems = input.items
      .map((it, idx) => ({
        ordem: idx + 1,
        nome: it.nome,
        dose: it.dose || undefined,
        via: it.via || undefined,
        horario: it.horario || undefined,
        observacao: it.observacao || undefined,
      }))
      .filter((i) => i.nome || i.dose || i.via || i.horario || i.observacao);
    if (normalizedItems.length === 0)
      return res.status(400).json({ ok: false, error: "Itens inválidos" });

    const created = await prisma.prescription.create({
      data: {
        patientId: input.patientId,
        formato: input.formato,
        cid: input.cid,
        observacoes: input.observacoes,
        items: normalizedItems,
      },
      include: { patient: true },
    });

    await appendEvent(input.patientId, "PRESCRIPTION", {
      prescriptionId: created.id,
      numero: created.number,
      formato: created.formato,
    });
    await appendAuditLog({
      who: req.header("x-user-id") ?? null,
      what: `Prescrição ${created.id} emitida`,
      meta: {
        patientId: input.patientId,
        prescriptionId: created.id,
        numero: created.number,
      },
    });

    res.json({ item: serializePrescription(created, created.patient?.name) });
  })
);

app.get(
  "/api/v1/attachments/:id/download",
  asyncHandler(async (req, res) => {
    const attachment = await prisma.attachment.findUnique({
      where: { id: req.params.id },
    });
    if (!attachment) {
      return res.status(404).json({
        type: "about:blank",
        title: "Anexo não encontrado",
        status: 404,
        detail: `Anexo ${req.params.id} inexistente`,
      });
    }

    const absolutePath = resolveAttachmentPath(attachment.filePath);
    const normalizedBase = `${uploadsBaseDir}${path.sep}`;
    if (
      !(
        absolutePath === uploadsBaseDir ||
        absolutePath.startsWith(normalizedBase)
      )
    ) {
      return res.status(400).json({
        type: "about:blank",
        title: "Caminho inválido",
        status: 400,
        detail: "Arquivo fora do diretório autorizado.",
      });
    }

    try {
      await fsPromises.access(absolutePath);
    } catch {
      return res.status(410).json({
        type: "about:blank",
        title: "Arquivo indisponível",
        status: 410,
        detail: "O arquivo informado não está mais disponível.",
      });
    }

    res.setHeader("Content-Type", attachment.mime);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${attachment.fileName}"`
    );
    fs.createReadStream(absolutePath).pipe(res);
  })
);

// Static assets and SPA routes (serve built webapp from /public)
const rootDir = path.resolve(path.join(__dirname, ".."));
const publicDir = path.join(rootDir, "public");

// static assets
app.use("/app/assets", express.static(path.join(publicDir, "app", "assets")));
app.use("/assets", express.static(path.join(publicDir, "assets")));

// redirect root to SPA entry
app.get(["/", "/app"], (req, res) => res.redirect("/app/"));

// SPA fallback
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(publicDir, "app", "index.html"));
});

app.use((req, res) => {
  res.status(404).json({
    type: "about:blank",
    title: "Recurso não encontrado",
    status: 404,
    detail: `${req.method} ${req.path}`,
  });
});

app.use((err, req, res, _next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      type: "https://zod.dev/error",
      title: "Requisição inválida",
      status: 400,
      detail: err.issues.map((issue) => issue.message).join(", "),
    });
  }

  if (err?.code === "P2002") {
    return res.status(409).json({
      type: "about:blank",
      title: "Violação de unicidade",
      status: 409,
      detail: "Documento já cadastrado",
    });
  }

  if (err?.code === "P2025") {
    return res.status(404).json({
      type: "about:blank",
      title: "Registro não encontrado",
      status: 404,
      detail: "Recurso informado não existe mais.",
    });
  }

  writeError(err);
  res.status(500).json({
    type: "about:blank",
    title: "Erro interno",
    status: 500,
    detail: "Falha inesperada. Consulte os logs do servidor.",
  });
});

const PORT = Number(process.env.PORT || 3030);

const server = app.listen(PORT, () => {
  writeInfo(`API pronta em http://127.0.0.1:${PORT}`);
});

const shutdown = async () => {
  await prisma.$disconnect().catch(() => undefined);
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = app;
