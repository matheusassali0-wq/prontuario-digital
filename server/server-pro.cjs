const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

const writeInfo = (message) => {
  if (message) {
    process.stdout.write(`${message}\n`);
  }
};

const writeError = (error) => {
  const output =
    error instanceof Error ? error.stack ?? error.message : typeof error === 'string' ? error : JSON.stringify(error);
  process.stderr.write(`${output}\n`);
};

const app = express();
app.disable('x-powered-by');

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'same-origin' },
  }),
);
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(apiLimiter);

const PATIENT_PAGE_SIZE_DEFAULT = 15;

const safeString = (value) =>
  typeof value === 'string' ? value : value === null || value === undefined ? null : String(value);

const normalizeDateToISO = (value) => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const candidate = trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00-03:00`;
  const date = new Date(candidate);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return date.toISOString();
};

const patientBodySchema = z
  .object({
    name: z.string().trim().min(1, 'Nome obrigatório').max(160),
    document: z
      .string()
      .trim()
      .min(3, 'Documento muito curto')
      .max(32, 'Documento muito longo')
      .optional()
      .or(z.literal(''))
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
        email: z
          .string()
          .trim()
          .email('E-mail inválido')
          .max(120)
          .optional(),
        notes: z.string().trim().max(280).optional(),
      })
      .partial()
      .optional()
      .transform((value) => {
        if (!value) return null;
        const cleanedEntries = Object.entries(value).filter(([, val]) => {
          if (typeof val !== 'string') {
            return false;
          }
          return Boolean(val.trim());
        });
        if (!cleanedEntries.length) return null;
        return Object.fromEntries(
          cleanedEntries.map(([key, val]) => [key, typeof val === 'string' ? val.trim() : val]),
        );
      }),
    payer: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal(''))
      .transform((value) => {
        const normalized = value?.trim();
        return normalized ? normalized : null;
      }),
    allergies: z
      .array(z.string().trim().min(1, 'Alergia inválida').max(80))
      .max(24)
      .optional()
      .default([]),
    tags: z.array(z.string().trim().min(1).max(60)).max(24).optional().default([]),
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
        if (!Number.isFinite(parsed) || parsed <= 0) return PATIENT_PAGE_SIZE_DEFAULT;
        return Math.min(parsed, 50);
      }),
  })
  .transform((params) => ({
    query: params.query?.trim() ?? '',
    page: params.page ?? 1,
    perPage: params.perPage ?? PATIENT_PAGE_SIZE_DEFAULT,
  }));

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const computeHash = (payload) =>
  crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');

const appendAuditLog = async ({ who, what, meta }) => {
  const lastLog = await prisma.auditLog.findFirst({
    orderBy: { when: 'desc' },
    select: { meta: true },
  });
  const previousHash = typeof lastLog?.meta?.hash === 'string' ? lastLog.meta.hash : null;
  const baseEntry = {
    who: who ?? null,
    what,
    when: new Date(),
    hashPrev: previousHash,
    meta: meta ?? {},
  };
  const currentHash = computeHash({ ...baseEntry, meta: meta ?? {}, hashPrev: previousHash });
  const entryWithHash = {
    ...baseEntry,
    meta: { ...(meta ?? {}), hash: currentHash },
  };
  return prisma.auditLog.create({ data: entryWithHash });
};

const appendEvent = async (patientId, type, payload) => {
  const lastEvent = await prisma.event.findFirst({
    where: { patientId },
    orderBy: { createdAt: 'desc' },
    select: { payload: true },
  });
  const previousHash = typeof lastEvent?.payload?.hash === 'string' ? lastEvent.payload.hash : null;
  const basePayload = {
    ...payload,
    hashPrev: previousHash,
  };
  const currentHash = computeHash({ patientId, type, payload: basePayload, hashPrev: previousHash });
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
    name: patient.name ?? '',
    document: patient.document ?? '',
    payer: patient.payer ?? '',
  };
  const contactText = safeString(patient.contact?.phone ?? patient.contact?.email ?? patient.contact?.notes ?? '');
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

app.get(
  '/api/v1/health',
  asyncHandler(async (req, res) => {
    const patientCount = await prisma.patient.count();
    res.json({ status: 'ok', patients: patientCount, timestamp: new Date().toISOString() });
  }),
);

app.get(
  '/api/v1/patients',
  asyncHandler(async (req, res) => {
    const { query, page, perPage } = querySchema.parse(req.query ?? {});
    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { document: { contains: query, mode: 'insensitive' } },
            { payer: { contains: query, mode: 'insensitive' } },
            { contactJson: { path: ['phone'], string_contains: query, string_mode: 'insensitive' } },
            { contactJson: { path: ['email'], string_contains: query, string_mode: 'insensitive' } },
            { contactJson: { path: ['notes'], string_contains: query, string_mode: 'insensitive' } },
          ],
        }
      : {};

    const [total, records] = await Promise.all([
      prisma.patient.count({ where }),
      prisma.patient.findMany({
        where,
        orderBy: [{ updatedAt: 'desc' }],
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
  }),
);

app.get(
  '/api/v1/patients/metrics',
  asyncHandler(async (req, res) => {
    const [totalPatients, encountersToday, prescriptions, allergyAlerts] = await Promise.all([
      prisma.patient.count(),
      prisma.event.count({
        where: {
          type: 'ENCOUNTER',
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
      prisma.event.count({ where: { type: 'PRESCRIPTION' } }),
      prisma.patient.count({ where: { allergies: { isEmpty: false } } }),
    ]);

    res.json({
      totalPatients,
      encountersToday,
      activePrescriptions: prescriptions,
      allergyAlerts,
    });
  }),
);

app.get(
  '/api/v1/patients/:id',
  asyncHandler(async (req, res) => {
    const record = await prisma.patient.findUnique({ where: { id: req.params.id } });
    if (!record) {
      return res.status(404).json({
        type: 'about:blank',
        title: 'Paciente não encontrado',
        status: 404,
        detail: `Paciente ${req.params.id} inexistente`,
      });
    }
    res.json({ patient: serializePatient(record) });
  }),
);

app.post(
  '/api/v1/patients',
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

    await appendEvent(created.id, 'PATIENT_CREATE', {
      summary: 'Paciente cadastrado',
      snapshot: serializePatient(created),
    });
    await appendAuditLog({
      who: req.header('x-user-id') ?? null,
      what: `Paciente ${created.id} criado`,
      meta: { patientId: created.id },
    });

    res.status(201).json({ patient: serializePatient(created) });
  }),
);

app.put(
  '/api/v1/patients/:id',
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

    await appendEvent(updated.id, 'PATIENT_UPDATE', {
      summary: 'Dados do paciente atualizados',
      snapshot: serializePatient(updated),
    });
    await appendAuditLog({
      who: req.header('x-user-id') ?? null,
      what: `Paciente ${updated.id} atualizado`,
      meta: { patientId: updated.id },
    });

    res.json({ patient: serializePatient(updated) });
  }),
);

app.delete(
  '/api/v1/patients/:id',
  asyncHandler(async (req, res) => {
    const removed = await prisma.patient.delete({ where: { id: req.params.id } });

    await appendEvent(removed.id, 'PATIENT_DELETE', {
      summary: 'Paciente removido',
      snapshot: { id: removed.id, name: removed.name },
    });
    await appendAuditLog({
      who: req.header('x-user-id') ?? null,
      what: `Paciente ${removed.id} excluído`,
      meta: { patientId: removed.id },
    });

    res.status(204).send();
  }),
);

app.get(
  '/api/v1/patients/:id/events',
  asyncHandler(async (req, res) => {
    const events = await prisma.event.findMany({
      where: { patientId: req.params.id },
      orderBy: { createdAt: 'desc' },
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
  }),
);

app.use((req, res) => {
  res.status(404).json({
    type: 'about:blank',
    title: 'Recurso não encontrado',
    status: 404,
    detail: `${req.method} ${req.path}`,
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      type: 'https://zod.dev/error',
      title: 'Requisição inválida',
      status: 400,
      detail: err.issues.map((issue) => issue.message).join(', '),
    });
  }

  if (err?.code === 'P2002') {
    return res.status(409).json({
      type: 'about:blank',
      title: 'Violação de unicidade',
      status: 409,
      detail: 'Documento já cadastrado',
    });
  }

  if (err?.code === 'P2025') {
    return res.status(404).json({
      type: 'about:blank',
      title: 'Registro não encontrado',
      status: 404,
      detail: 'Recurso informado não existe mais.',
    });
  }

  writeError(err);
  res.status(500).json({
    type: 'about:blank',
    title: 'Erro interno',
    status: 500,
    detail: 'Falha inesperada. Consulte os logs do servidor.',
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

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = app;
