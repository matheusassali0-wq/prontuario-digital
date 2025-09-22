import assert from 'node:assert/strict';
import test from 'node:test';

const settingsService = await import('../server/settings-service.cjs');
const {
  encryptSecret,
  decryptSecret,
  validateSettingPayload,
  validateSecretPayload,
  filterSettingsForRole,
  normalizeRole,
  maskSecretPreview,
} = settingsService.default ?? settingsService;

test('AES-256-GCM round-trip mantém o valor original', () => {
  const key = Buffer.alloc(32, 7);
  process.env.SERVER_ENC_KEY = `base64:${key.toString('base64')}`;
  const secret = 'segredo-super-confidencial';
  const { nonce, payload } = encryptSecret(secret);
  assert.ok(Buffer.isBuffer(nonce));
  assert.ok(Buffer.isBuffer(payload));
  const restored = decryptSecret(payload, nonce);
  assert.equal(restored, secret);
});

test('validateSettingPayload normaliza cabeçalho do receituário', () => {
  const result = validateSettingPayload('general.header', {
    clinicName: 'Clínica Exemplo',
    crm: '12345',
    rqe: '',
  });
  assert.deepEqual(result, {
    clinicName: 'Clínica Exemplo',
    crm: '12345',
    rqe: null,
  });
});

test('validateSecretPayload impõe comprimento mínimo', () => {
  const key = Buffer.alloc(32, 9);
  process.env.SERVER_ENC_KEY = `base64:${key.toString('base64')}`;
  assert.throws(() => validateSecretPayload('sso.birdid.clientSecret', '123'));
  const value = validateSecretPayload('sso.birdid.clientSecret', 'segredo-valido');
  assert.equal(value, 'segredo-valido');
});

test('filterSettingsForRole restringe chaves por RBAC', () => {
  const items = [
    { key: 'general.header', value: null, updatedAt: new Date() },
    { key: 'security.rateLimit', value: null, updatedAt: new Date() },
  ];
  const medico = filterSettingsForRole(items, 'Medico');
  assert.equal(medico.length, 2);
  const atendimento = filterSettingsForRole(items, 'Atendimento');
  assert.equal(atendimento.length, 1);
  assert.equal(atendimento[0].key, 'general.header');
  assert.equal(normalizeRole('ADMINISTRADOR'), 'Admin');
});

test('chave desconhecida gera erro informativo', () => {
  assert.throws(() => validateSettingPayload('desconhecida', {}), /não suportada/);
});

test('maskSecretPreview preserva os 4 últimos caracteres', () => {
  assert.equal(maskSecretPreview('abcd1234'), '***•••1234');
  assert.equal(maskSecretPreview('abc'), '••••');
});
