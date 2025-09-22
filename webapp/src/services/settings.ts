import api from '../api';

export type SettingsResponse = {
  items: { key: string; value: unknown; updatedAt: string }[];
  role: 'Admin' | 'Medico' | 'Atendimento';
};

export type FlagsResponse = {
  items: { key: string; enabled: boolean; updatedAt: string }[];
};

export type SecretMeta = {
  key: string;
  hasValue: boolean;
  maskedPreview: string | null;
  updatedAt: string | null;
  lastChangedBy: string | null;
  lastChangedAt: string | null;
};

export const fetchSettings = async () => {
  const { data } = await api.get<SettingsResponse>('/settings');
  return data;
};

export const updateSetting = async (key: string, value: unknown) => {
  const { data } = await api.put<{ setting: { key: string; value: unknown; updatedAt: string } }>(
    `/settings/${encodeURIComponent(key)}`,
    { value },
  );
  return data.setting;
};

export const fetchSecretMeta = async (key: string) => {
  const { data } = await api.get<SecretMeta>(`/secrets/${encodeURIComponent(key)}/meta`);
  return data;
};

export const revealSecret = async (key: string) => {
  const { data } = await api.get<{ key: string; value: string; updatedAt: string }>(
    `/secrets/${encodeURIComponent(key)}`,
  );
  return data;
};

export const rotateSecret = async (key: string, value: string) => {
  const { data } = await api.put<{ key: string; updatedAt: string }>(
    `/secrets/${encodeURIComponent(key)}`,
    { value },
  );
  return data;
};

export const fetchFlags = async () => {
  const { data } = await api.get<FlagsResponse>('/flags');
  return data;
};

export const updateFlag = async (key: string, enabled: boolean) => {
  const { data } = await api.put<{ flag: { key: string; enabled: boolean; updatedAt: string } }>(
    `/flags/${encodeURIComponent(key)}`,
    { enabled },
  );
  return data.flag;
};

export const testBirdId = async (payload: { issuer: string; redirectUri: string }) => {
  const { data } = await api.post<{ ok: boolean; issuer: string; authorizationEndpoint: string }>(
    '/settings/test/sso-birdid',
    payload,
  );
  return data;
};

export const exportSettings = async () => {
  const { data } = await api.post<{ generatedAt: string; settings: Record<string, unknown>; featureFlags: Record<string, boolean> }>(
    '/settings/export',
    {},
  );
  return data;
};

export type ImportPayload = {
  settings: Record<string, unknown>;
  flags?: Record<string, boolean>;
};

export const importSettings = async (payload: ImportPayload, dryRun: boolean) => {
  const { data } = await api.post<{
    dryRun: boolean;
    applied: boolean;
    changes: { key: string; previous: unknown; next: unknown }[];
    featureFlags: { key: string; enabled: boolean }[];
  }>(
    '/settings/import',
    payload,
    { params: { dryRun: dryRun ? 1 : 0 } },
  );
  return data;
};
