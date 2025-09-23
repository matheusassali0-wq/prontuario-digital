import type { PrescriptionItem, PrescriptionRecord, PrescriptionCreateInput } from '@contracts/prescriptions';
const API_BASE = 'http://127.0.0.1:3030/api';

// Types now sourced from shared contracts (@contracts)

type StatusPayload = {
  ok: boolean;
  online: boolean;
  mode: string;
  issuer: string | null;
};

const withCredentials = (init: RequestInit = {}): RequestInit => ({
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(init.headers ?? {}),
  },
  ...init,
});

const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, withCredentials(init));
  if (!response.ok) {
    const message = await response.text().catch(() => 'Falha ao comunicar com a API.');
    throw new Error(message || 'Erro inesperado na API.');
  }
  if (response.status === 204) {
    return undefined as T;
  }
  const text = await response.text();
  if (!text) {
    return undefined as T;
  }
  return JSON.parse(text) as T;
};

export const loadAuthStatus = async (): Promise<StatusPayload> =>
  fetchJson<StatusPayload>('/auth/status');

export const requestAuthorizeUrl = async (
  payload: { codeChallenge: string; state?: string },
): Promise<{ ok: boolean; authorizeUrl: string; returnUrl?: string }> =>
  fetchJson('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const listPrescriptions = async (patientId: string): Promise<PrescriptionRecord[]> => {
  const response = await fetchJson<{ items?: PrescriptionRecord[] }>(
    `/pacientes/${patientId}/prescricoes`,
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
  const payload = await fetchJson<{ item: PrescriptionRecord }>('/prescricoes/print', {
    method: 'POST',
    body: JSON.stringify({
      pacienteId: input.patientId,
      formato: input.formato,
      cid: input.cid,
      observacoes: input.observacoes,
      items: input.items,
    }),
  });
  return payload.item;
};

export const loadPrescription = async (
  id: string,
) => {
  const response = await fetchJson<{ item?: PrescriptionRecord }>(`/prescricoes/${id}`);
  if (response.item) {
    return response.item;
  }
  return null;
};

export type { StatusPayload };
