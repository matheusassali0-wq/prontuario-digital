const crypto = require('crypto');
const { z } = require('zod');

const ROLE_ORDER = {
  Atendimento: 1,
  Medico: 2,
  Médico: 2,
  Admin: 3,
  Administrador: 3,
};

const normalizeRole = (rawRole) => {
  if (!rawRole) return 'Atendimento';
  const normalized = rawRole.trim();
  if (normalized.toLowerCase() === 'admin' || normalized.toLowerCase() === 'administrador') {
    return 'Admin';
  }
  if (normalized.toLowerCase() === 'medico' || normalized.toLowerCase() === 'médico') {
    return 'Medico';
  }
  return 'Atendimento';
};

const clinicHeaderSchema = z
  .object({
    clinicName: z.string().trim().min(1).max(120),
    crm: z.string().trim().min(3).max(32),
    rqe: z
      .string()
      .trim()
      .max(32)
      .optional()
      .or(z.literal(''))
      .transform((value) => {
        const normalized = value?.trim();
        return normalized ? normalized : null;
      }),
  })
  .strict();

const timezoneSchema = z
  .string()
  .trim()
  .min(1)
  .max(64)
  .refine((value) => value === 'America/Sao_Paulo' || value === 'Etc/GMT+3', {
    message: 'Fuso horário suportado: GMT-3',
  });

const dateTimeFormatSchema = z
  .object({
    dateFormat: z.enum(['DD/MM/YYYY', 'YYYY-MM-DD']).default('DD/MM/YYYY'),
    timeFormat: z.enum(['HH:mm', 'HH:mm:ss']).default('HH:mm'),
  })
  .strict();

const ssoBirdIdSchema = z
  .object({
    issuer: z.string().trim().url().max(255),
    clientId: z.string().trim().min(3).max(160),
    redirectUri: z.string().trim().url().max(255),
  })
  .strict();

const memedSchema = z
  .object({
    ssoUrl: z.string().trim().url().max(255),
    returnUrl: z.string().trim().url().max(255),
  })
  .strict();

const securityCsrfSchema = z
  .object({
    enabled: z.boolean(),
  })
  .strict();

const securityCspSchema = z
  .object({
    devAllowInlineStyles: z.boolean().default(false),
    reportOnly: z.boolean().default(false),
  })
  .strict();

const rateLimitSchema = z
  .object({
    general: z
      .object({
        limit: z.number().int().min(50).max(1000),
        windowMinutes: z.number().int().min(1).max(60),
      })
      .strict(),
    sensitive: z
      .object({
        limit: z.number().int().min(10).max(300),
        windowMinutes: z.number().int().min(1).max(60),
      })
      .strict(),
  })
  .strict();

const SETTINGS_SCHEMAS = {
  'general.header': clinicHeaderSchema,
  'general.timezone': timezoneSchema,
  'general.datetimeFormat': dateTimeFormatSchema,
  'integrations.memed': memedSchema,
  'sso.birdid': ssoBirdIdSchema,
  'security.csrf': securityCsrfSchema,
  'security.csp': securityCspSchema,
  'security.rateLimit': rateLimitSchema,
};

const SECRET_SCHEMAS = {
  'sso.birdid.clientSecret': z.string().trim().min(8).max(160),
  'integrations.memed.token': z.string().trim().min(8).max(160),
};

const FEATURE_FLAG_SCHEMA = z.boolean();

const readableKeysByRole = {
  Admin: null,
  Medico: new Set([
    'general.header',
    'general.timezone',
    'general.datetimeFormat',
    'integrations.memed',
    'security.rateLimit',
  ]),
  Atendimento: new Set(['general.header', 'general.timezone']),
};

const getEncryptionKey = () => {
  const rawKey = process.env.SERVER_ENC_KEY;
  if (!rawKey) {
    throw new Error('SERVER_ENC_KEY não configurada');
  }
  const normalized = rawKey.startsWith('base64:') ? rawKey.slice('base64:'.length) : rawKey;
  const keyBuffer = Buffer.from(normalized, 'base64');
  if (keyBuffer.length !== 32) {
    throw new Error('SERVER_ENC_KEY deve ter 32 bytes (base64)');
  }
  return keyBuffer;
};

const encryptSecret = (plaintext) => {
  if (typeof plaintext !== 'string') {
    throw new TypeError('Valor secreto deve ser string');
  }
  const key = getEncryptionKey();
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, nonce);
  const ciphertext = Buffer.concat([cipher.update(Buffer.from(plaintext, 'utf8')), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const payload = Buffer.concat([ciphertext, authTag]);
  return { nonce, payload };
};

const decryptSecret = (cipherBuffer, nonceBuffer) => {
  if (!cipherBuffer || !nonceBuffer) {
    throw new Error('Dados do segredo incompletos');
  }
  const key = getEncryptionKey();
  const cipherBytes = Buffer.isBuffer(cipherBuffer) ? cipherBuffer : Buffer.from(cipherBuffer);
  const nonce = Buffer.isBuffer(nonceBuffer) ? nonceBuffer : Buffer.from(nonceBuffer);
  if (cipherBytes.length <= 16) {
    throw new Error('Cipher inválido');
  }
  const authTag = cipherBytes.subarray(cipherBytes.length - 16);
  const encrypted = cipherBytes.subarray(0, cipherBytes.length - 16);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
};

const validateSettingPayload = (key, value) => {
  const schema = SETTINGS_SCHEMAS[key];
  if (!schema) {
    throw new Error(`Configuração ${key} não suportada`);
  }
  return schema.parse(value);
};

const validateSecretPayload = (key, value) => {
  const schema = SECRET_SCHEMAS[key];
  if (!schema) {
    throw new Error(`Segredo ${key} não suportado`);
  }
  return schema.parse(value);
};

const validateFeatureFlagPayload = (value) => FEATURE_FLAG_SCHEMA.parse(value);

const filterSettingsForRole = (records, role) => {
  if (!Array.isArray(records)) return [];
  const normalizedRole = normalizeRole(role);
  const allowedKeys = readableKeysByRole[normalizedRole];
  if (!allowedKeys) return records;
  return records.filter((record) => allowedKeys.has(record.key));
};

const compareSettings = (currentMap, incomingMap) => {
  const deltas = [];
  const keys = new Set([...Object.keys(currentMap), ...Object.keys(incomingMap)]);
  keys.forEach((key) => {
    const previous = currentMap[key];
    const next = incomingMap[key];
    if (JSON.stringify(previous) !== JSON.stringify(next)) {
      deltas.push({ key, previous, next });
    }
  });
  return deltas;
};

const maskSecretPreview = (value) => {
  if (typeof value !== 'string' || value.length < 4) return '••••';
  const visible = value.slice(-4);
  return `***•••${visible}`;
};

const roleAtLeast = (role, expected) => {
  const currentValue = ROLE_ORDER[normalizeRole(role)] ?? 0;
  const expectedValue = ROLE_ORDER[normalizeRole(expected)] ?? Number.MAX_SAFE_INTEGER;
  return currentValue >= expectedValue;
};

module.exports = {
  normalizeRole,
  roleAtLeast,
  getEncryptionKey,
  encryptSecret,
  decryptSecret,
  validateSettingPayload,
  validateSecretPayload,
  validateFeatureFlagPayload,
  filterSettingsForRole,
  compareSettings,
  maskSecretPreview,
  readableKeysByRole,
  SETTINGS_SCHEMAS,
  SECRET_SCHEMAS,
};
