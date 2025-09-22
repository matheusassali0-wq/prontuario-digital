import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  exportSettings,
  fetchFlags,
  fetchSecretMeta,
  fetchSettings,
  importSettings,
  revealSecret,
  rotateSecret,
  testBirdId,
  updateFlag,
  updateSetting,
  type SecretMeta,
} from '../services/settings';
import { formatDateTimeBr, nowIso } from '../utils/datetime';

type Role = 'Admin' | 'Medico' | 'Atendimento';
type TabKey = 'general' | 'templates' | 'exams' | 'integrations' | 'security' | 'backup';

const roleOrder: Record<Role, number> = { Atendimento: 1, Medico: 2, Admin: 3 };
const roleAtLeast = (role: Role, expected: Role) => roleOrder[role] >= roleOrder[expected];

const tabs: { key: TabKey; label: string; description: string }[] = [
  { key: 'general', label: 'Geral', description: 'Identidade do receituário e padrões regionais.' },
  { key: 'templates', label: 'Templates', description: 'Modelos clínicos herdados do PR6.' },
  { key: 'exams', label: 'Exames', description: 'Presets e fluxos de solicitação (PR7).' },
  { key: 'integrations', label: 'SSO & Integrações', description: 'Bird ID e Memed com segredos mascarados.' },
  { key: 'security', label: 'Segurança & Privacidade', description: 'CSP, CSRF, rate-limit e feature flags.' },
  { key: 'backup', label: 'Backup / Export', description: 'Exportar e importar configurações (dry-run).' },
];

const generalSchema = z.object({
  clinicName: z.string().trim().min(1, 'Informe o nome exibido no cabeçalho'),
  crm: z.string().trim().min(3, 'CRM inválido'),
  rqe: z.string().optional(),
  timezone: z.enum(['America/Sao_Paulo', 'Etc/GMT+3']),
  dateFormat: z.enum(['DD/MM/YYYY', 'YYYY-MM-DD']),
  timeFormat: z.enum(['HH:mm', 'HH:mm:ss']),
});

const integrationSchema = z.object({
  issuer: z.string().trim().url('URL inválida'),
  clientId: z.string().trim().min(3, 'Client ID obrigatório'),
  redirectUri: z.string().trim().url('URL inválida'),
  memedSsoUrl: z.string().trim().url('URL inválida'),
  memedReturnUrl: z.string().trim().url('URL inválida'),
});

const securitySchema = z.object({
  csrfEnabled: z.boolean(),
  devAllowInlineStyles: z.boolean(),
  cspReportOnly: z.boolean(),
  rateLimitGeneralLimit: z.number().min(50).max(1000),
  rateLimitGeneralWindow: z.number().min(1).max(60),
  rateLimitSensitiveLimit: z.number().min(10).max(300),
  rateLimitSensitiveWindow: z.number().min(1).max(60),
});

type GeneralFormValues = z.infer<typeof generalSchema>;
type IntegrationFormValues = z.infer<typeof integrationSchema>;
type SecurityFormValues = z.infer<typeof securitySchema>;

type FlagItem = { key: string; enabled: boolean; updatedAt: string };

type SettingsMap = Record<string, unknown>;
type RateLimitSetting = {
  general?: { limit?: number; windowMinutes?: number };
  sensitive?: { limit?: number; windowMinutes?: number };
};

const secretCatalog = [
  {
    key: 'sso.birdid.clientSecret',
    label: 'Bird ID · Client Secret',
    description: 'Utilizado na troca de código pelo token de acesso durante o SSO com a Bird ID.',
  },
  {
    key: 'integrations.memed.token',
    label: 'Memed · Token SSO',
    description: 'Token dedicado à integração Memed em modo Bird ID.',
  },
] as const;

const deepEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

const getStoredRole = (): Role => {
  if (typeof window === 'undefined') return 'Admin';
  const stored = window.localStorage.getItem('pd-role');
  if (stored === 'Admin' || stored === 'Medico' || stored === 'Atendimento') {
    return stored;
  }
  return 'Admin';
};

const storeRole = (role: Role) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('pd-role', role);
};

const storeUserId = () => {
  if (typeof window === 'undefined') return;
  if (!window.localStorage.getItem('pd-user')) {
    window.localStorage.setItem('pd-user', 'admin@clinic.local');
  }
};

const storeBirdStatus = (status: 'online' | 'offline', detail: string) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    'pd-birdid-status',
    JSON.stringify({ status, detail, checkedAt: nowIso() }),
  );
  window.dispatchEvent(new Event('bird-status-change'));
};

type HttpErrorLike = {
  response?: { data?: Record<string, unknown>; status?: number };
  message?: unknown;
};

const getHttpStatus = (error: unknown): number | null => {
  if (typeof error === 'object' && error !== null) {
    const response = (error as HttpErrorLike).response;
    if (response && typeof response.status === 'number') {
      return response.status;
    }
  }
  return null;
};

const parseError = (error: unknown) => {
  if (!error) return 'Erro inesperado.';
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error !== null) {
    const httpError = error as HttpErrorLike;
    const data = httpError.response?.data;
    if (data && typeof data === 'object') {
      const detail = data.detail;
      if (typeof detail === 'string') return detail;
      const message = data.message;
      if (typeof message === 'string') return message;
    }
    if (typeof httpError.message === 'string') {
      return httpError.message;
    }
  }
  return 'Não foi possível concluir a solicitação.';
};

const getMask = (meta?: SecretMeta) => meta?.maskedPreview ?? (meta?.hasValue ? '••••' : '—');
const maskSecretClient = (value: string) => (value.length >= 4 ? `***•••${value.slice(-4)}` : '••••');

export default function Configuracoes() {
  const [currentRole, setCurrentRole] = useState<Role>(() => {
    storeUserId();
    return getStoredRole();
  });
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsMap>({});
  const [settingsUpdatedAt, setSettingsUpdatedAt] = useState<Record<string, string>>({});
  const [role, setRole] = useState<Role>('Admin');
  const [flags, setFlags] = useState<FlagItem[]>([]);
  const [secretMeta, setSecretMeta] = useState<Record<string, SecretMeta>>({});
  const [generalStatus, setGeneralStatus] = useState<string | null>(null);
  const [integrationStatus, setIntegrationStatus] = useState<string | null>(null);
  const [securityStatus, setSecurityStatus] = useState<string | null>(null);
  const [ssoStatus, setSsoStatus] = useState<{ type: 'idle' | 'running' | 'success' | 'error'; message: string }>(
    { type: 'idle', message: '' },
  );
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [importInput, setImportInput] = useState('');
  const [importFeedback, setImportFeedback] = useState<
    | null
    | {
        dryRun: boolean;
        changes: { key: string; previous: unknown; next: unknown }[];
        featureFlags: { key: string; enabled: boolean }[];
      }
  >(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [secretValues, setSecretValues] = useState<Record<string, { value: string; visibleUntil: number }>>({});
  const [secretStatus, setSecretStatus] = useState<string | null>(null);
  const secretTimers = useRef<Record<string, number>>({});

  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      clinicName: '',
      crm: '',
      rqe: '',
      timezone: 'America/Sao_Paulo',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: 'HH:mm',
    },
  });

  const integrationForm = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationSchema),
    defaultValues: {
      issuer: '',
      clientId: '',
      redirectUri: '',
      memedSsoUrl: '',
      memedReturnUrl: '',
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      csrfEnabled: true,
      devAllowInlineStyles: false,
      cspReportOnly: false,
      rateLimitGeneralLimit: 300,
      rateLimitGeneralWindow: 10,
      rateLimitSensitiveLimit: 50,
      rateLimitSensitiveWindow: 10,
    },
  });

  const isAdmin = role === 'Admin';
  const isMedicoOuSuperior = roleAtLeast(role, 'Medico');

  const applySettingsToForms = useCallback(
    (map: SettingsMap) => {
      const header = (map['general.header'] as Record<string, unknown>) ?? {};
      const timezoneRaw = map['general.timezone'];
      const timezoneValue: GeneralFormValues['timezone'] =
        typeof timezoneRaw === 'string' &&
        (timezoneRaw === 'Etc/GMT+3' || timezoneRaw === 'America/Sao_Paulo')
          ? timezoneRaw
          : 'America/Sao_Paulo';

      generalForm.reset({
        clinicName: (header?.clinicName as string) ?? '',
        crm: (header?.crm as string) ?? '',
        rqe: ((header?.rqe as string | null) ?? '') || '',
        timezone: timezoneValue,
        dateFormat: ((map['general.datetimeFormat'] as Record<string, string>)?.dateFormat as GeneralFormValues['dateFormat'])
          ?? 'DD/MM/YYYY',
        timeFormat: ((map['general.datetimeFormat'] as Record<string, string>)?.timeFormat as GeneralFormValues['timeFormat'])
          ?? 'HH:mm',
      });

      const bird = (map['sso.birdid'] as Record<string, unknown>) ?? {};
      const memed = (map['integrations.memed'] as Record<string, unknown>) ?? {};
      integrationForm.reset({
        issuer: (bird?.issuer as string) ?? '',
        clientId: (bird?.clientId as string) ?? '',
        redirectUri: (bird?.redirectUri as string) ?? '',
        memedSsoUrl: (memed?.ssoUrl as string) ?? '',
        memedReturnUrl: (memed?.returnUrl as string) ?? '',
      });

    const security = (map['security.csrf'] as Record<string, unknown>) ?? {};
    const csp = (map['security.csp'] as Record<string, unknown>) ?? {};
    const rateLimit = (map['security.rateLimit'] as RateLimitSetting | undefined) ?? {};
    const generalRate = rateLimit.general ?? {};
    const sensitiveRate = rateLimit.sensitive ?? {};
    securityForm.reset({
      csrfEnabled: Boolean(security?.enabled ?? true),
      devAllowInlineStyles: Boolean(csp?.devAllowInlineStyles ?? false),
      cspReportOnly: Boolean(csp?.reportOnly ?? false),
      rateLimitGeneralLimit: Number(generalRate.limit ?? 300),
      rateLimitGeneralWindow: Number(generalRate.windowMinutes ?? 10),
      rateLimitSensitiveLimit: Number(sensitiveRate.limit ?? 50),
      rateLimitSensitiveWindow: Number(sensitiveRate.windowMinutes ?? 10),
      });
    },
    [generalForm, integrationForm, securityForm],
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const settingsResponse = await fetchSettings();
      setRole(settingsResponse.role);
      const map: SettingsMap = {};
      const updatedMap: Record<string, string> = {};
      settingsResponse.items.forEach((item) => {
        map[item.key] = item.value ?? null;
        updatedMap[item.key] = item.updatedAt;
      });
      setSettings(map);
      setSettingsUpdatedAt(updatedMap);
      applySettingsToForms(map);

      if (roleAtLeast(settingsResponse.role, 'Medico')) {
        try {
          const flagsResponse = await fetchFlags();
          setFlags(flagsResponse.items);
        } catch (flagError) {
          if (getHttpStatus(flagError) !== 403) {
            throw flagError;
          }
          setFlags([]);
        }
      } else {
        setFlags([]);
      }

      if (roleAtLeast(settingsResponse.role, 'Admin')) {
        const metaEntries = await Promise.all(
          secretCatalog.map(async ({ key }) => {
            try {
              const meta = await fetchSecretMeta(key);
              return [key, meta] as const;
            } catch (metaError) {
              if (getHttpStatus(metaError) === 404) {
                return [key, {
                  key,
                  hasValue: false,
                  maskedPreview: null,
                  updatedAt: null,
                  lastChangedBy: null,
                  lastChangedAt: null,
                }] as const;
              }
              throw metaError;
            }
          }),
        );
        setSecretMeta(Object.fromEntries(metaEntries));
      } else {
        setSecretMeta({});
      }
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  }, [applySettingsToForms]);

  useEffect(() => {
    storeRole(currentRole);
    loadData().catch(() => undefined);
  }, [currentRole, loadData]);

  useEffect(() => {
    setSecretStatus(null);
  }, [role]);

  useEffect(() => {
    return () => {
      Object.values(secretTimers.current).forEach((timerId) => {
        window.clearTimeout(timerId);
      });
    };
  }, []);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextRole = event.target.value as Role;
    setCurrentRole(nextRole);
  };

  const handleSaveGeneral = generalForm.handleSubmit(async (values) => {
    if (!isAdmin) {
      setGeneralStatus('Somente administradores podem atualizar esses dados.');
      return;
    }
    setGeneralStatus('Salvando alterações…');
    const updates: Promise<unknown>[] = [];
    const headerValue = {
      clinicName: values.clinicName.trim(),
      crm: values.crm.trim(),
      rqe: values.rqe?.trim() ? values.rqe.trim() : null,
    };
    if (!deepEqual(settings['general.header'], headerValue)) {
      updates.push(
        updateSetting('general.header', headerValue).then((updated) => {
          setSettings((prev) => ({ ...prev, 'general.header': headerValue }));
          setSettingsUpdatedAt((prev) => ({ ...prev, 'general.header': updated.updatedAt }));
        }),
      );
    }
    if ((settings['general.timezone'] as string | undefined) !== values.timezone) {
      updates.push(
        updateSetting('general.timezone', values.timezone).then((updated) => {
          setSettings((prev) => ({ ...prev, 'general.timezone': values.timezone }));
          setSettingsUpdatedAt((prev) => ({ ...prev, 'general.timezone': updated.updatedAt }));
        }),
      );
    }
    const datetimeValue = { dateFormat: values.dateFormat, timeFormat: values.timeFormat };
    if (!deepEqual(settings['general.datetimeFormat'], datetimeValue)) {
      updates.push(
        updateSetting('general.datetimeFormat', datetimeValue).then((updated) => {
          setSettings((prev) => ({ ...prev, 'general.datetimeFormat': datetimeValue }));
          setSettingsUpdatedAt((prev) => ({ ...prev, 'general.datetimeFormat': updated.updatedAt }));
        }),
      );
    }

    if (updates.length === 0) {
      setGeneralStatus('Nenhuma alteração detectada.');
      return;
    }

    try {
      await Promise.all(updates);
      setGeneralStatus('Configurações salvas com sucesso.');
    } catch (saveError) {
      setGeneralStatus(parseError(saveError));
    }
  });

  const handleSaveIntegrations = integrationForm.handleSubmit(async (values) => {
    if (!isAdmin) {
      setIntegrationStatus('Somente administradores podem atualizar integrações.');
      return;
    }
    setIntegrationStatus('Sincronizando integrações…');
    const birdValue = {
      issuer: values.issuer.trim(),
      clientId: values.clientId.trim(),
      redirectUri: values.redirectUri.trim(),
    };
    const memedValue = {
      ssoUrl: values.memedSsoUrl.trim(),
      returnUrl: values.memedReturnUrl.trim(),
    };
    const updates: Promise<unknown>[] = [];
    if (!deepEqual(settings['sso.birdid'], birdValue)) {
      updates.push(
        updateSetting('sso.birdid', birdValue).then((updated) => {
          setSettings((prev) => ({ ...prev, 'sso.birdid': birdValue }));
          setSettingsUpdatedAt((prev) => ({ ...prev, 'sso.birdid': updated.updatedAt }));
        }),
      );
    }
    if (!deepEqual(settings['integrations.memed'], memedValue)) {
      updates.push(
        updateSetting('integrations.memed', memedValue).then((updated) => {
          setSettings((prev) => ({ ...prev, 'integrations.memed': memedValue }));
          setSettingsUpdatedAt((prev) => ({ ...prev, 'integrations.memed': updated.updatedAt }));
        }),
      );
    }
    if (updates.length === 0) {
      setIntegrationStatus('Nenhuma alteração detectada.');
      return;
    }
    try {
      await Promise.all(updates);
      setIntegrationStatus('Integrações atualizadas com sucesso.');
    } catch (saveError) {
      setIntegrationStatus(parseError(saveError));
    }
  });

  const handleSaveSecurity = securityForm.handleSubmit(async (values) => {
    if (!isAdmin) {
      setSecurityStatus('Somente administradores podem editar segurança.');
      return;
    }
    setSecurityStatus('Aplicando políticas…');
    const updates: Promise<unknown>[] = [];
    const csrfValue = { enabled: values.csrfEnabled };
    if (!deepEqual(settings['security.csrf'], csrfValue)) {
      updates.push(
        updateSetting('security.csrf', csrfValue).then((updated) => {
          setSettings((prev) => ({ ...prev, 'security.csrf': csrfValue }));
          setSettingsUpdatedAt((prev) => ({ ...prev, 'security.csrf': updated.updatedAt }));
        }),
      );
    }
    const cspValue = { devAllowInlineStyles: values.devAllowInlineStyles, reportOnly: values.cspReportOnly };
    if (!deepEqual(settings['security.csp'], cspValue)) {
      updates.push(
        updateSetting('security.csp', cspValue).then((updated) => {
          setSettings((prev) => ({ ...prev, 'security.csp': cspValue }));
          setSettingsUpdatedAt((prev) => ({ ...prev, 'security.csp': updated.updatedAt }));
        }),
      );
    }
    const rateLimitValue = {
      general: {
        limit: values.rateLimitGeneralLimit,
        windowMinutes: values.rateLimitGeneralWindow,
      },
      sensitive: {
        limit: values.rateLimitSensitiveLimit,
        windowMinutes: values.rateLimitSensitiveWindow,
      },
    };
    if (!deepEqual(settings['security.rateLimit'], rateLimitValue)) {
      updates.push(
        updateSetting('security.rateLimit', rateLimitValue).then((updated) => {
          setSettings((prev) => ({ ...prev, 'security.rateLimit': rateLimitValue }));
          setSettingsUpdatedAt((prev) => ({ ...prev, 'security.rateLimit': updated.updatedAt }));
        }),
      );
    }
    if (updates.length === 0) {
      setSecurityStatus('Nenhuma alteração detectada.');
      return;
    }
    try {
      await Promise.all(updates);
      setSecurityStatus('Políticas aplicadas com sucesso.');
    } catch (saveError) {
      setSecurityStatus(parseError(saveError));
    }
  });

  const handleToggleFlag = async (flag: FlagItem) => {
    if (!isAdmin) {
      setSecurityStatus('Feature flags exigem perfil Admin.');
      return;
    }
    try {
      const updated = await updateFlag(flag.key, !flag.enabled);
      setFlags((prev) =>
        prev.map((item) => (item.key === flag.key ? { ...item, enabled: updated.enabled, updatedAt: updated.updatedAt } : item)),
      );
      setSecurityStatus(`Flag ${flag.key} atualizada.`);
    } catch (flagError) {
      setSecurityStatus(parseError(flagError));
    }
  };

  const handleSecretReveal = async (key: string) => {
    setSecretStatus(null);
    try {
      const result = await revealSecret(key);
      setSecretValues((prev) => ({ ...prev, [key]: { value: result.value, visibleUntil: Date.now() + 15_000 } }));
      if (secretTimers.current[key]) {
        window.clearTimeout(secretTimers.current[key]);
      }
      secretTimers.current[key] = window.setTimeout(() => {
        setSecretValues((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 15_000);
      setSecretStatus('Segredo revelado por 15 segundos.');
    } catch (err) {
      setSecretStatus(parseError(err));
    }
  };

  const handleSecretRotate = async (key: string, value: string) => {
    setSecretStatus(null);
    if (!isAdmin) {
      setSecretStatus('Somente Admin pode rotacionar segredos.');
      return;
    }
    if (!value.trim()) {
      setSecretStatus('Informe um valor válido para o segredo.');
      return;
    }
    try {
      const result = await rotateSecret(key, value.trim());
      setSecretMeta((prev) => ({
        ...prev,
        [key]: {
          ...(prev[key] ?? { key, hasValue: true, maskedPreview: null, updatedAt: null, lastChangedAt: null, lastChangedBy: null }),
          hasValue: true,
          maskedPreview: maskSecretClient(value.trim()),
          updatedAt: result.updatedAt,
        },
      }));
      setSecretStatus('Segredo salvo com sucesso.');
      setSecretValues((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      loadData().catch(() => undefined);
    } catch (err) {
      setSecretStatus(parseError(err));
    }
  };

  const handleTestSso = async () => {
    const values = integrationForm.getValues();
    if (!values.issuer || !values.redirectUri) {
      setSsoStatus({ type: 'error', message: 'Preencha emissor e redirect antes de testar.' });
      return;
    }
    setSsoStatus({ type: 'running', message: 'Consultando discovery OIDC…' });
    try {
      const result = await testBirdId({ issuer: values.issuer.trim(), redirectUri: values.redirectUri.trim() });
      setSsoStatus({ type: 'success', message: `Discovery OK: ${result.authorizationEndpoint}` });
      storeBirdStatus('online', result.authorizationEndpoint);
    } catch (err) {
      const message = parseError(err);
      setSsoStatus({ type: 'error', message });
      storeBirdStatus('offline', message);
    }
  };

  const handleExport = async () => {
    if (!isAdmin) {
      setExportStatus('Somente administradores podem exportar.');
      return;
    }
    setExportStatus('Gerando pacote JSON…');
    try {
      const payload = await exportSettings();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const timestamp = new Date(payload.generatedAt).toISOString().replace(/[:.]/g, '-');
      link.href = url;
      link.download = `settings-${timestamp}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setExportStatus('Export concluído. Arquivo baixado.');
    } catch (err) {
      setExportStatus(parseError(err));
    }
  };

  const submitImport = async (dryRun: boolean) => {
    if (!isAdmin) {
      setImportError('Somente administradores podem importar.');
      return;
    }
    if (!importInput.trim()) {
      setImportError('Cole o JSON exportado antes de enviar.');
      return;
    }
    try {
      const parsed = JSON.parse(importInput) as { settings?: Record<string, unknown>; flags?: Record<string, boolean> };
      const response = await importSettings(
        { settings: parsed.settings ?? {}, flags: parsed.flags },
        dryRun,
      );
      setImportFeedback({ dryRun: response.dryRun, changes: response.changes, featureFlags: response.featureFlags });
      setImportError(null);
      if (!dryRun && response.applied) {
        loadData().catch(() => undefined);
      }
    } catch (err) {
      setImportFeedback(null);
      setImportError(parseError(err));
    }
  };

  const renderUpdatedAt = (key: string) => {
    const updatedAt = settingsUpdatedAt[key];
    if (!updatedAt) return 'Nunca atualizado';
    return `Atualizado em ${formatDateTimeBr(updatedAt)}`;
  };

  const renderGeneralTab = () => (
    <form
      className="settings-card"
      onSubmit={(event) => {
        void handleSaveGeneral(event);
      }}
      aria-labelledby="tab-geral"
    >
      <div className="card-header">
        <div>
          <h2 id="tab-geral">Identidade do consultório</h2>
          <p className="card-subtitle">Nome oficial e registros usados no cabeçalho do receituário.</p>
        </div>
        <span className="card-meta">{renderUpdatedAt('general.header')}</span>
      </div>
      <div className="field-grid">
        <label className="field">
          <span>Nome exibido</span>
          <input type="text" {...generalForm.register('clinicName')} disabled={!isAdmin} required />
        </label>
        <label className="field">
          <span>CRM</span>
          <input type="text" {...generalForm.register('crm')} disabled={!isAdmin} required />
        </label>
        <label className="field">
          <span>RQE (opcional)</span>
          <input type="text" {...generalForm.register('rqe')} disabled={!isAdmin} />
        </label>
      </div>
      <div className="card-divider"></div>
      <div className="card-header">
        <div>
          <h3>Formato regional</h3>
          <p className="card-subtitle">Fuso horário (GMT-3) e padrões de data/hora.</p>
        </div>
        <span className="card-meta">{renderUpdatedAt('general.datetimeFormat')}</span>
      </div>
      <div className="field-grid">
        <label className="field">
          <span>Fuso horário</span>
          <select {...generalForm.register('timezone')} disabled={!isAdmin}>
            <option value="America/Sao_Paulo">America/Sao_Paulo (GMT-3)</option>
            <option value="Etc/GMT+3">Etc/GMT+3</option>
          </select>
        </label>
        <label className="field">
          <span>Formato de data</span>
          <select {...generalForm.register('dateFormat')} disabled={!isAdmin}>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </label>
        <label className="field">
          <span>Formato de hora</span>
          <select {...generalForm.register('timeFormat')} disabled={!isAdmin}>
            <option value="HH:mm">HH:mm</option>
            <option value="HH:mm:ss">HH:mm:ss</option>
          </select>
        </label>
      </div>
      {generalStatus && <p className="form-feedback">{generalStatus}</p>}
      <div className="actions-row">
        <button type="submit" className="primary" disabled={!isAdmin}>
          Salvar ajustes gerais
        </button>
      </div>
    </form>
  );

  const renderTemplatesTab = () => (
    <div className="settings-card" aria-labelledby="tab-templates">
      <div className="card-header">
        <div>
          <h2 id="tab-templates">Templates clínicos</h2>
          <p className="card-subtitle">
            Importe e exporte modelos de evolução diretamente na tela de prontuários. Os templates configurados aqui impactam os fluxos de PR6.
          </p>
        </div>
      </div>
      <div className="info-block">
        <p>
          Utilize os botões abaixo para acessar rapidamente a gestão de templates e a central de importação/exportação criada no PR6.
        </p>
        <div className="actions-row">
          <a className="secondary" href="/prontuarios">
            Abrir gestão de templates
          </a>
          <a className="secondary" href="/prontuarios#templates-import">
            Ir para Import/Export JSON
          </a>
        </div>
      </div>
      <div className="info-block" role="note">
        <strong>Dica:</strong> mantenha um backup dos modelos exportados após ajustes significativos.
      </div>
    </div>
  );

  const renderExamsTab = () => (
    <div className="settings-card" aria-labelledby="tab-exames">
      <div className="card-header">
        <div>
          <h2 id="tab-exames">Presets de exames</h2>
          <p className="card-subtitle">Centralize aqui os conjuntos padrão de exames solicitados com mais frequência.</p>
        </div>
      </div>
      <div className="info-block">
        <p>
          A lista de presets é administrada na tela de prescrições/exames (PR7). Ajustes feitos lá ficam imediatamente disponíveis
          nas integrações e no modo offline.
        </p>
        <div className="actions-row">
          <a className="secondary" href="/prescricoes">
            Gerenciar presets de exame
          </a>
        </div>
      </div>
      <div className="info-block" role="note">
        <strong>Auditoria:</strong> alterações nos presets ficam registradas na timeline do paciente quando aplicadas.
      </div>
    </div>
  );

  const renderSecretCard = (item: typeof secretCatalog[number]) => {
    const meta = secretMeta[item.key];
    const visible = secretValues[item.key];
    const isVisible = visible && visible.visibleUntil > Date.now();
    const masked = getMask(meta);
    return (
      <article key={item.key} className="secret-card">
        <header>
          <div>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
          </div>
          <span className="card-meta">{meta?.updatedAt ? formatDateTimeBr(meta.updatedAt) : 'Nunca definido'}</span>
        </header>
        <div className="secret-value" aria-live="polite">
          {isVisible ? <code>{visible.value}</code> : <code>{masked}</code>}
        </div>
        <div className="secret-meta">
          <span>Última alteração: {formatDateTimeBr(meta?.lastChangedAt ?? meta?.updatedAt ?? null)}</span>
          <span>Responsável: {meta?.lastChangedBy ?? '—'}</span>
        </div>
        <div className="secret-actions">
          <button type="button" className="secondary" onClick={() => { void handleSecretReveal(item.key); }} disabled={!isAdmin}>
            Revelar (15s)
          </button>
          <SecretRotationForm
            disabled={!isAdmin}
            onSubmit={(value) => {
              void handleSecretRotate(item.key, value);
            }}
          />
        </div>
      </article>
    );
  };

  const renderIntegrationsTab = () => {
    if (!roleAtLeast(role, 'Medico')) {
      return (
        <div className="settings-card" aria-labelledby="tab-integracoes">
          <div className="card-header">
            <div>
              <h2 id="tab-integracoes">SSO & Integrações</h2>
              <p className="card-subtitle">Somente perfis Médico ou Admin podem acessar estes dados.</p>
            </div>
          </div>
          <p className="info-block">Solicite acesso a um administrador para visualizar e editar estas integrações.</p>
        </div>
      );
    }

    return (
      <div className="stack">
        <form
          className="settings-card"
          onSubmit={(event) => {
            void handleSaveIntegrations(event);
          }}
          aria-labelledby="tab-integracoes"
        >
          <div className="card-header">
            <div>
              <h2 id="tab-integracoes">Bird ID · OpenID Connect</h2>
              <p className="card-subtitle">Issuer, Client ID e redirect utilizados pelo fluxo OIDC.</p>
            </div>
            <span className="card-meta">{renderUpdatedAt('sso.birdid')}</span>
          </div>
          <div className="field-grid">
            <label className="field">
              <span>Issuer (URL)</span>
              <input type="url" {...integrationForm.register('issuer')} disabled={!isAdmin} required />
            </label>
            <label className="field">
              <span>Client ID</span>
              <input type="text" {...integrationForm.register('clientId')} disabled={!isAdmin} required />
            </label>
            <label className="field">
              <span>Redirect URI</span>
              <input type="url" {...integrationForm.register('redirectUri')} disabled={!isAdmin} required />
            </label>
          </div>
          <div className="actions-row">
            <button
              type="button"
              className="secondary"
              onClick={() => {
                void handleTestSso();
              }}
              disabled={!isAdmin || ssoStatus.type === 'running'}
            >
              {ssoStatus.type === 'running' ? 'Testando…' : 'Testar SSO'}
            </button>
            <button type="submit" className="primary" disabled={!isAdmin}>
              Salvar credenciais Bird ID
            </button>
          </div>
          {ssoStatus.type !== 'idle' && <p className={`form-feedback ${ssoStatus.type}`}>{ssoStatus.message}</p>}
          {integrationStatus && <p className="form-feedback">{integrationStatus}</p>}
        </form>

        <form
          className="settings-card"
          onSubmit={(event) => {
            void handleSaveIntegrations(event);
          }}
          aria-labelledby="memed-section"
        >
          <div className="card-header">
            <div>
              <h2 id="memed-section">Memed · Single Sign-On</h2>
              <p className="card-subtitle">URLs necessárias para a jornada de prescrição integrada.</p>
            </div>
            <span className="card-meta">{renderUpdatedAt('integrations.memed')}</span>
          </div>
          <div className="field-grid">
            <label className="field">
              <span>SSO URL</span>
              <input type="url" {...integrationForm.register('memedSsoUrl')} disabled={!isAdmin} required />
            </label>
            <label className="field">
              <span>Return URL</span>
              <input type="url" {...integrationForm.register('memedReturnUrl')} disabled={!isAdmin} required />
            </label>
          </div>
          <div className="actions-row">
            <button type="submit" className="primary" disabled={!isAdmin}>
              Salvar configurações Memed
            </button>
          </div>
          {integrationStatus && <p className="form-feedback">{integrationStatus}</p>}
        </form>

        {isAdmin && (
          <>
            {secretCatalog.map(renderSecretCard)}
            {secretStatus && <p className="form-feedback">{secretStatus}</p>}
          </>
        )}
      </div>
    );
  };

  const renderSecurityTab = () => (
    <div className="stack">
      <form
        className="settings-card"
        onSubmit={(event) => {
          void handleSaveSecurity(event);
        }}
        aria-labelledby="tab-seguranca"
      >
        <div className="card-header">
          <div>
            <h2 id="tab-seguranca">Políticas principais</h2>
            <p className="card-subtitle">Configurações aplicadas no backend (CSP, CSRF e rate-limit).</p>
          </div>
        </div>
        <div className="field-grid">
          <label className="field checkbox">
            <input type="checkbox" {...securityForm.register('csrfEnabled')} disabled={!isAdmin} />
            <span>CSRF Double-Submit ativo</span>
          </label>
          <label className="field checkbox">
            <input type="checkbox" {...securityForm.register('devAllowInlineStyles')} disabled={!isAdmin} />
            <span>Permitir style inline no Vite (apenas desenvolvimento)</span>
          </label>
          <label className="field checkbox">
            <input type="checkbox" {...securityForm.register('cspReportOnly')} disabled={!isAdmin} />
            <span>CSP em modo Report-Only</span>
          </label>
        </div>
        <div className="card-divider"></div>
        <div className="rate-grid">
          <div>
            <h3>Rate limit geral</h3>
            <label className="field">
              <span>Limite (req/10 min)</span>
              <input type="number" {...securityForm.register('rateLimitGeneralLimit', { valueAsNumber: true })} disabled={!isAdmin} min={50} max={1000} />
            </label>
            <label className="field">
              <span>Janela (minutos)</span>
              <input type="number" {...securityForm.register('rateLimitGeneralWindow', { valueAsNumber: true })} disabled={!isAdmin} min={1} max={60} />
            </label>
          </div>
          <div>
            <h3>Endpoints sensíveis</h3>
            <label className="field">
              <span>Limite (req/10 min)</span>
              <input type="number" {...securityForm.register('rateLimitSensitiveLimit', { valueAsNumber: true })} disabled={!isAdmin} min={10} max={300} />
            </label>
            <label className="field">
              <span>Janela (minutos)</span>
              <input type="number" {...securityForm.register('rateLimitSensitiveWindow', { valueAsNumber: true })} disabled={!isAdmin} min={1} max={60} />
            </label>
          </div>
        </div>
        {securityStatus && <p className="form-feedback">{securityStatus}</p>}
        <div className="actions-row">
          <button type="submit" className="primary" disabled={!isAdmin}>
            Salvar políticas de segurança
          </button>
        </div>
      </form>

      {isMedicoOuSuperior && (
        <section className="settings-card" aria-labelledby="flags-section">
          <div className="card-header">
            <div>
              <h2 id="flags-section">Feature flags</h2>
              <p className="card-subtitle">Controle rápido de funcionalidades experimentais.</p>
            </div>
          </div>
          {flags.length === 0 ? (
            <p className="info-block">Nenhuma flag disponível para este perfil.</p>
          ) : (
            <ul className="flag-list">
              {flags.map((flag) => (
                <li key={flag.key} className="flag-item">
                  <div>
                    <strong>{flag.key}</strong>
                    <span className="flag-meta">Última atualização: {formatDateTimeBr(flag.updatedAt)}</span>
                  </div>
                  <button
                    type="button"
                    className={flag.enabled ? 'chip success' : 'chip'}
                    onClick={() => {
                      void handleToggleFlag(flag);
                    }}
                  >
                    {flag.enabled ? 'Ativada' : 'Desativada'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="settings-card" aria-labelledby="privacidade-links">
        <div className="card-header">
          <div>
            <h2 id="privacidade-links">Documentação de privacidade</h2>
            <p className="card-subtitle">Links para termos e política de privacidade publicados no aplicativo.</p>
          </div>
        </div>
        <div className="actions-row">
          <a className="secondary" href="/legal/termos">Ver termos de uso</a>
          <a className="secondary" href="/legal/privacidade">Ver política de privacidade</a>
        </div>
      </section>
    </div>
  );

  const renderBackupTab = () => (
    <section className="stack" aria-labelledby="tab-backup">
      <div className="settings-card">
        <div className="card-header">
          <div>
            <h2 id="tab-backup">Exportar configurações</h2>
            <p className="card-subtitle">Gere um pacote JSON (sem segredos) pronto para backup.</p>
          </div>
        </div>
        <div className="actions-row">
          <button
            type="button"
            className="primary"
            onClick={() => {
              void handleExport();
            }}
            disabled={!isAdmin}
          >
            Exportar agora
          </button>
        </div>
        {exportStatus && <p className="form-feedback">{exportStatus}</p>}
      </div>

      <div className="settings-card">
        <div className="card-header">
          <div>
            <h2>Importar configurações</h2>
            <p className="card-subtitle">Cole o JSON exportado e execute primeiro um Dry-run para visualizar o diff.</p>
          </div>
        </div>
        <label className="field">
          <span>JSON de configurações</span>
          <textarea
            rows={8}
            value={importInput}
            onChange={(event) => setImportInput(event.target.value)}
            placeholder="Cole aqui o arquivo gerado pelo export…"
          ></textarea>
        </label>
        <div className="actions-row">
          <button
            type="button"
            className="secondary"
            onClick={() => {
              void submitImport(true);
            }}
            disabled={!isAdmin}
          >
            Dry-run (validar)
          </button>
          <button
            type="button"
            className="primary"
            onClick={() => {
              void submitImport(false);
            }}
            disabled={!isAdmin}
          >
            Aplicar alterações
          </button>
        </div>
        {importError && <p className="form-feedback error">{importError}</p>}
        {importFeedback && (
          <div className="import-feedback" aria-live="polite">
            <h3>{importFeedback.dryRun ? 'Dry-run concluído' : 'Importação aplicada'}</h3>
            <ul>
              {importFeedback.changes.length === 0 && <li>Nenhuma configuração alterada.</li>}
              {importFeedback.changes.map((change) => (
                <li key={change.key}>
                  <strong>{change.key}</strong>: {JSON.stringify(change.previous)} → {JSON.stringify(change.next)}
                </li>
              ))}
            </ul>
            {importFeedback.featureFlags.length > 0 && (
              <div className="import-flags">
                <h4>Feature flags</h4>
                <ul>
                  {importFeedback.featureFlags.map((flag) => (
                    <li key={flag.key}>
                      {flag.key}: {flag.enabled ? 'ativada' : 'desativada'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralTab();
      case 'templates':
        return renderTemplatesTab();
      case 'exams':
        return renderExamsTab();
      case 'integrations':
        return renderIntegrationsTab();
      case 'security':
        return renderSecurityTab();
      case 'backup':
        return renderBackupTab();
      default:
        return null;
    }
  };

  return (
    <section className="settings-page" aria-labelledby="configuracoes-title">
      <header className="settings-header">
        <div>
          <h1 id="configuracoes-title">Central de Configurações</h1>
          <p className="page-subtitle">
            Administre integrações, segurança e exportação de dados com controles auditáveis.
          </p>
        </div>
        <label className="role-selector">
          <span>Perfil atual</span>
          <select value={currentRole} onChange={handleRoleChange}>
            <option value="Admin">Admin</option>
            <option value="Medico">Médico</option>
            <option value="Atendimento">Atendimento</option>
          </select>
        </label>
      </header>

      {loading && <div className="settings-card">Carregando configurações…</div>}
      {error && !loading && <div className="settings-card error">{error}</div>}
      {!loading && !error && (
        <div className="settings-container">
          <nav className="settings-tabs" role="tablist" aria-label="Seções de configuração">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={activeTab === tab.key ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(tab.key)}
              >
                <span>{tab.label}</span>
                <small>{tab.description}</small>
              </button>
            ))}
          </nav>
          <div className="settings-content">{renderActiveTab()}</div>
        </div>
      )}
    </section>
  );
}

type SecretRotationFormProps = {
  disabled: boolean;
  onSubmit: (value: string) => void;
};

function SecretRotationForm({ disabled, onSubmit }: SecretRotationFormProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button type="button" className="primary" onClick={() => setOpen(true)} disabled={disabled}>
        Rotacionar segredo
      </button>
    );
  }

  return (
    <form className="secret-rotate" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Novo valor seguro"
        disabled={disabled}
        required
      />
      <div className="actions-row">
        <button type="submit" className="primary" disabled={disabled}>
          Salvar
        </button>
        <button type="button" className="secondary" onClick={() => setOpen(false)}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
