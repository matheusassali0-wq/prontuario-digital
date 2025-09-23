import type { PrescriptionItem, PrescriptionRecord, PrescriptionCreateInput } from '@contracts/prescriptions';
import { requestJson, sha256Base16 } from '../utils/http';

// Types now sourced from shared contracts (@contracts)

type StatusPayload = {
  ok: boolean;
  online: boolean;
  mode: string;
  issuer: string | null;
};

export const loadAuthStatus = async (): Promise<StatusPayload> =>
  requestJson<StatusPayload>('/auth/status');

export const requestAuthorizeUrl = async (
  payload: { codeChallenge: string; state?: string },
): Promise<{ ok: boolean; authorizeUrl: string; returnUrl?: string }> =>
  requestJson('/auth/login', 'POST', payload);

export const listPrescriptions = async (patientId: string): Promise<PrescriptionRecord[]> => {
  const response = await requestJson<{ items?: PrescriptionRecord[] }>(
    `/pacientes/${patientId}/prescricoes`,
    'GET'
  );
  return Array.isArray(response.items) ? response.items : [];
};

export const printPrescription = async (input: {
  patientId: string;
  formato: PrescriptionCreateInput['formato'];
  cid?: string;
  observacoes?: string;
  items: PrescriptionItem[];
}): Promise<PrescriptionRecord> => {
  const body = {
    pacienteId: input.patientId,
    formato: input.formato,
    cid: input.cid,
    observacoes: input.observacoes,
    items: input.items,
  };
  const idKey = `print:${await sha256Base16(body)}`;
  const payload = await requestJson<{ item: PrescriptionRecord }>(
    '/prescricoes/print',
    'POST',
    body,
    { idempotencyKey: idKey, payloadHash: await sha256Base16(body) }
  );
  return payload.item;
};

export const loadPrescription = async (id: string): Promise<PrescriptionRecord | null> => {
  const response = await requestJson<{ item?: PrescriptionRecord }>(`/prescricoes/${id}`);
  return response.item ?? null;
};

export type { PrescriptionItem, PrescriptionRecord, StatusPayload };
