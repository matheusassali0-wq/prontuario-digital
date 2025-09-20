import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TimelineEvent, useActivePatientStore } from '../stores/patientStore';

const resolveApiBase = () => {
  const meta = import.meta as { env?: Record<string, string | undefined> };
  const candidate = meta.env?.VITE_API_BASE_URL;
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate;
  }
  return '/api/v1';
};

const API_ROOT = (() => {
  const base = resolveApiBase();
  return base.endsWith('/') ? base.slice(0, -1) : base;
})();

const patientFormSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome').max(160),
  document: z.string().trim().max(32).optional().or(z.literal('')).default(''),
  birthDate: z.string().trim().max(32).optional().or(z.literal('')).default(''),
  contactPhone: z.string().trim().max(64).optional().or(z.literal('')).default(''),
  contactEmail: z.string().trim().email('E-mail inválido').max(120).optional().or(z.literal('')).default(''),
  contactNotes: z.string().trim().max(280).optional().or(z.literal('')).default(''),
  payer: z.string().trim().max(120).optional().or(z.literal('')).default(''),
  allergies: z.array(z.string().trim().min(1).max(80)).default([]),
  tags: z.array(z.string().trim().min(1).max(60)).default([]),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;

export type PatientRecord = {
  id: string;
  name: string;
  document: string | null;
  birthDate: string | null;
  contact: Record<string, unknown> | null;
  payer: string | null;
  allergies: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

type HighlightRanges = Record<string, [number, number][]>;

type PatientListItem = {
  patient: PatientRecord;
  highlights?: HighlightRanges;
};

type Metrics = {
  totalPatients: number;
  encountersToday: number;
  activePrescriptions: number;
  allergyAlerts: number;
};

const EMPTY_FORM: PatientFormValues = {
  name: '',
  document: '',
  birthDate: '',
  contactPhone: '',
  contactEmail: '',
  contactNotes: '',
  payer: '',
  allergies: [],
  tags: [],
};

const buildUrl = (path: string) => `${API_ROOT}${path}`;

const fetchJson = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

    if (!response.ok) {
      let detail: string | undefined;
      try {
        const body = (await response.json()) as unknown;
        if (body && typeof body === 'object') {
          const record = body as Record<string, unknown>;
          const candidate = record.detail ?? record.error;
          if (typeof candidate === 'string' && candidate.trim().length > 0) {
            detail = candidate;
          }
        }
      } catch {
        detail = undefined;
      }
      const fallback = response.statusText?.trim().length ? response.statusText : undefined;
      throw new Error(detail || fallback || 'Falha inesperada ao comunicar com a API.');
    }

  if (response.status === 204) {
    return undefined as T;
  }


    const text = await response.text();
    if (!text) {
      return undefined as T;
    }
    const parsed = JSON.parse(text) as unknown;
    return parsed as T;
  };


const toISODate = (value: string) => {
  if (!value) return null;
  const normalized = value.includes('T') ? value : `${value}T00:00:00-03:00`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: value.includes('T') ? 'short' : undefined,
    timeZone: 'America/Sao_Paulo',
  }).format(date);
};

const formatDateTime = (value: string | null | undefined) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date);
};

const renderHighlight = (
  text: string,
  ranges?: [number, number][],
  fallbackQuery?: string,
): (string | JSX.Element)[] => {
  if (!text) return ['—'];
  if (ranges && ranges.length) {
    const fragments: (string | JSX.Element)[] = [];
    let cursor = 0;
    ranges.forEach(([start, end], index) => {
      const safeStart = Math.max(0, start);
      const safeEnd = Math.min(text.length, end);
      if (cursor < safeStart) {
        fragments.push(text.slice(cursor, safeStart));
      }
      fragments.push(
        <mark key={`highlight-${index}`} className="search-highlight">
          {text.slice(safeStart, safeEnd)}
        </mark>,
      );
      cursor = safeEnd;
    });
    if (cursor < text.length) {
      fragments.push(text.slice(cursor));
    }
    return fragments;

  }

  if (!fallbackQuery) return [text];
  const normalized = fallbackQuery.trim();
  if (!normalized) return [text];
  const regex = new RegExp(`(${normalized.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})`, 'ig');
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === normalized.toLowerCase() ? (
      <mark key={`fallback-${index}`} className="search-highlight">
        {part}
      </mark>
    ) : (
      <span key={`fallback-${index}`}>{part}</span>
    ),
  );
};

const contactFromRecord = (record: PatientRecord): { phone?: string; email?: string; notes?: string } => {
  if (!record.contact || typeof record.contact !== 'object') return {};
  const phone = typeof record.contact.phone === 'string' ? record.contact.phone : undefined;
  const email = typeof record.contact.email === 'string' ? record.contact.email : undefined;
  const notes = typeof record.contact.notes === 'string' ? record.contact.notes : undefined;
  return { phone, email, notes };
};

const summarizeEvent = (event: TimelineEvent) => {
  const summary = typeof event.payload?.summary === 'string' ? event.payload.summary : undefined;
  if (summary) return summary;
  if (event.type === 'PATIENT_CREATE') return 'Paciente cadastrado';
  if (event.type === 'PATIENT_UPDATE') return 'Atualização de dados cadastrais';
  if (event.type === 'PATIENT_DELETE') return 'Remoção do cadastro';
  return event.type.replace(/_/g, ' ');
};

const iconForEvent = (type: string) => {
  switch (type) {
    case 'PATIENT_CREATE':
      return '🆕';
    case 'PATIENT_UPDATE':
      return '✏️';
    case 'PATIENT_DELETE':
      return '🗑️';
    case 'ENCOUNTER':
      return '🩺';
    case 'PRESCRIPTION':
      return '💊';
    case 'EXAM_ORDER':
      return '🧪';
    default:
      return '📄';
  }

};

const groupTimelineByDay = (events: TimelineEvent[]) => {
  const groups = new Map<string, TimelineEvent[]>();
  events.forEach((event) => {
    const dayKey = new Date(event.createdAt).toISOString().slice(0, 10);
    const list = groups.get(dayKey) ?? [];
    list.push(event);
    groups.set(dayKey, list);
  });
  return Array.from(groups.entries())
    .map(([day, items]) => ({
      day,
      items: items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    }))
    .sort((a, b) => b.day.localeCompare(a.day));
};

const ChipInput = ({
  label,
  placeholder,
  value,
  disabled,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string[];
  disabled?: boolean;
  onChange: (next: string[]) => void;
}) => {
  const [draft, setDraft] = useState('');

  const commitDraft = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) {
      setDraft('');
      return;
    }
    onChange([...value, trimmed]);
    setDraft('');
  };

  const removeValue = (tag: string) => {
    onChange(value.filter((item) => item !== tag));
  };

  return (
    <label className="form-field">
      <span>{label}</span>
      <div className="chip-input" aria-live="polite">
        {value.map((tag) => (
          <button
            key={tag}
            type="button"
            className="chip"
            onClick={() => removeValue(tag)}
            disabled={disabled}
            aria-label={`Remover ${tag}`}
          >
            {tag}
            <span aria-hidden>×</span>
          </button>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ',') {
              event.preventDefault();
              commitDraft();
            }
            if (event.key === 'Backspace' && !draft && value.length) {
              event.preventDefault();
              removeValue(value[value.length - 1]);
            }
          }}
          onBlur={commitDraft}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </label>
  );
};

export default function Pacientes() {
  const [patients, setPatients] = useState<PatientListItem[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const {
    activePatientId,
    eventsByPatient,
    isLoading: isLoadingTimeline,
    error: timelineError,
    setActivePatient,
    refreshEvents,
    clearError,
    dropPatientEvents,
  } = useActivePatientStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: EMPTY_FORM,
    mode: 'onChange',
  });

  useEffect(() => {
    const handle = window.setTimeout(() => setDebouncedSearch(searchTerm.trim()), 320);
    return () => window.clearTimeout(handle);
  }, [searchTerm]);

  const loadMetrics = async () => {
    try {
      const payload = await fetchJson<Metrics>('/patients/metrics');
      setMetrics(payload);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar os indicadores.');
    }
  };

  const loadPatients = async () => {
    setIsLoadingList(true);
    try {
      const query = debouncedSearch ? `?query=${encodeURIComponent(debouncedSearch)}` : '';
      const payload = await fetchJson<{ items?: PatientListItem[] }>(`/patients${query}`);
      setPatients(payload?.items ?? []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao carregar pacientes.');
    } finally {
      setIsLoadingList(false);
    }
  };


    useEffect(() => {
      void loadPatients();
    }, [debouncedSearch]);

    useEffect(() => {
      void loadMetrics();
    }, []);


  useEffect(() => {
    if (timelineError) {
      setErrorMessage(timelineError);
      clearError();
    }
  }, [timelineError, clearError]);

  useEffect(() => {
    if (!feedback) return;
    const handle = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(handle);
  }, [feedback]);

  const activePatient = useMemo(() => {
    if (!activePatientId) return null;
    return patients.find((item) => item.patient.id === activePatientId)?.patient ?? null;
  }, [activePatientId, patients]);

  useEffect(() => {
    if (activePatient) {
      const contact = contactFromRecord(activePatient);
      reset({
        name: activePatient.name,
        document: activePatient.document ?? '',
        birthDate: activePatient.birthDate ? activePatient.birthDate.slice(0, 10) : '',
        contactPhone: contact.phone ?? '',
        contactEmail: contact.email ?? '',
        contactNotes: contact.notes ?? '',
        payer: activePatient.payer ?? '',
        allergies: activePatient.allergies ?? [],
        tags: activePatient.tags ?? [],
      });
    } else {
      reset(EMPTY_FORM);
    }
  }, [activePatient, reset]);

  const onSubmit = async (values: PatientFormValues) => {
    try {
      setErrorMessage(null);
      const contactCandidate = {
        phone: values.contactPhone.trim() || undefined,
        email: values.contactEmail.trim() || undefined,
        notes: values.contactNotes.trim() || undefined,
      };
      const hasContactInfo = Boolean(contactCandidate.phone || contactCandidate.email || contactCandidate.notes);

      const payload = {
        name: values.name.trim(),
        document: values.document.trim() || null,
        birthDate: toISODate(values.birthDate.trim()),
        ...(hasContactInfo ? { contact: contactCandidate } : {}),
        payer: values.payer.trim() || null,
        allergies: values.allergies,
        tags: values.tags,
      };

      let response: PatientRecord;
      if (activePatientId) {
        const data = await fetchJson<{ patient: PatientRecord }>(`/patients/${activePatientId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        response = data.patient;
      } else {
        const data = await fetchJson<{ patient: PatientRecord }>('/patients', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        response = data.patient;
      }

      setPatients((previous) => {
        const existingIndex = previous.findIndex((item) => item.patient.id === response.id);
        if (existingIndex >= 0) {
          const clone = [...previous];
          clone[existingIndex] = { patient: response, highlights: previous[existingIndex]?.highlights };
          return clone;
        }
        return [{ patient: response }, ...previous];
      });


        await setActivePatient(response.id);
        void loadMetrics();

      setFeedback(activePatientId ? 'Dados do paciente atualizados.' : 'Paciente cadastrado com sucesso.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível salvar o paciente.');
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit((values) => onSubmit(values))(event);
  };

    const handleNewPatient = () => {
      void setActivePatient(null);
      reset(EMPTY_FORM);
    };

    const handleDeletePatient = async () => {
      if (!activePatientId) return;
      const selected = activePatient?.name ?? 'este paciente';
      if (!window.confirm(`Remover permanentemente ${selected}?`)) return;
      try {
        await fetchJson(`/patients/${activePatientId}`, { method: 'DELETE' });
        setPatients((previous) => previous.filter((item) => item.patient.id !== activePatientId));
        dropPatientEvents(activePatientId);
        await setActivePatient(null);
        void loadMetrics();
        setFeedback('Paciente removido com sucesso.');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Falha ao remover paciente.');
      }
    };


  const handleSelectPatient = async (id: string) => {
    await setActivePatient(id);
  };

  const selectedTimeline = useMemo(() => {
    if (!activePatientId) return [] as TimelineEvent[];
    return eventsByPatient[activePatientId] ?? [];
  }, [eventsByPatient, activePatientId]);

  const groupedTimeline = useMemo(() => groupTimelineByDay(selectedTimeline), [selectedTimeline]);

  return (
    <div className="pacientes-page">
      <header className="page-header">
        <h1 className="page-title">Pacientes</h1>
        <p className="page-subtitle">Gestão de cadastro, seleção ativa e visão 360° dos atendimentos.</p>
      </header>

      {feedback && (
        <div role="status" className="toast toast-success">
          {feedback}
        </div>
      )}
      {errorMessage && (
        <div role="alert" className="toast toast-error">
          {errorMessage}
        </div>
      )}

      <section className="patient-counters" aria-label="Indicadores de pacientes">
        <article className="card-tile">
          <span className="card-metric">Total de pacientes</span>
          <strong className="card-value">{metrics?.totalPatients ?? '—'}</strong>
          <span className="card-footnote">Cadastro ativo na base relacional</span>
        </article>
        <article className="card-tile">
          <span className="card-metric">Atendimentos hoje</span>
          <strong className="card-value">{metrics?.encountersToday ?? '—'}</strong>
          <span className="card-footnote">Eventos clínicos do dia (Timeline)</span>
        </article>
        <article className="card-tile">
          <span className="card-metric">Prescrições ativas</span>
          <strong className="card-value">{metrics?.activePrescriptions ?? '—'}</strong>
          <span className="card-footnote">Últimas prescrições vinculadas</span>
        </article>
        <article className="card-tile">
          <span className="card-metric">Alertas de alergias</span>
          <strong className="card-value">{metrics?.allergyAlerts ?? '—'}</strong>
          <span className="card-footnote">Pacientes com alergias registradas</span>
        </article>
      </section>

      <section className="patient-content">
        <div className="patient-list" aria-label="Lista de pacientes">
          <div className="list-header">
            <label className="form-field search-field">
              <span>Busca rápida</span>
              <input
                type="search"
                value={searchTerm}
                placeholder="Nome, documento ou contato"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
              <button
                type="button"
                className="ghost"
                onClick={() => void loadPatients()}
                disabled={isLoadingList}
              >
                Atualizar lista
              </button>

          </div>

          <ul className="patient-table" role="list">
            {isLoadingList && <li className="empty-state">Carregando pacientes…</li>}
            {!isLoadingList && patients.length === 0 && (
              <li className="empty-state">Nenhum paciente encontrado para a busca atual.</li>
            )}
            {patients.map(({ patient, highlights }) => {
              const contact = contactFromRecord(patient);
              return (
                <li key={patient.id} className={patient.id === activePatientId ? 'selected' : ''}>

                    <button type="button" onClick={() => void handleSelectPatient(patient.id)}>

                    <div className="patient-main">
                      <h3>{renderHighlight(patient.name, highlights?.name, debouncedSearch)}</h3>
                      <span className="patient-document">
                        {renderHighlight(patient.document ?? '—', highlights?.document, debouncedSearch)}
                      </span>
                    </div>
                    <dl className="patient-meta">
                      <div>
                        <dt>Nascimento</dt>
                        <dd>{formatDate(patient.birthDate)}</dd>
                      </div>
                      <div>
                        <dt>Contato</dt>
                        <dd>
                          {contact.phone || contact.email || contact.notes
                            ? renderHighlight(
                                contact.phone || contact.email || contact.notes || '—',
                                highlights?.contact,
                                debouncedSearch,
                              )
                            : '—'}
                        </dd>
                      </div>
                      <div>
                        <dt>Convênio</dt>
                        <dd>{renderHighlight(patient.payer ?? '—', highlights?.payer, debouncedSearch)}</dd>
                      </div>
                    </dl>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="patient-form" aria-label="Formulário do paciente">
          <form onSubmit={handleFormSubmit}>
            <div className="form-grid">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <label className="form-field">
                    <span>Nome completo *</span>
                    <input type="text" {...field} required />
                    {errors.name && <small className="error-message">{errors.name.message}</small>}
                  </label>
                )}
              />

              <Controller
                name="document"
                control={control}
                render={({ field }) => (
                  <label className="form-field">
                    <span>Documento / ID interno</span>
                    <input type="text" {...field} />
                    {errors.document && <small className="error-message">{errors.document.message}</small>}
                  </label>
                )}
              />

              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <label className="form-field">
                    <span>Data de nascimento</span>
                    <input type="date" {...field} />
                  </label>
                )}
              />

              <Controller
                name="payer"
                control={control}
                render={({ field }) => (
                  <label className="form-field">
                    <span>Convênio / Pagador</span>
                    <input type="text" {...field} />
                  </label>
                )}
              />

              <Controller
                name="contactPhone"
                control={control}
                render={({ field }) => (
                  <label className="form-field">
                    <span>Telefone</span>
                    <input type="tel" {...field} />
                  </label>
                )}
              />

              <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                  <label className="form-field">
                    <span>E-mail</span>
                    <input type="email" {...field} />
                    {errors.contactEmail && <small className="error-message">{errors.contactEmail.message}</small>}
                  </label>
                )}
              />

              <Controller
                name="contactNotes"
                control={control}
                render={({ field }) => (
                  <label className="form-field full-width">
                    <span>Notas de contato</span>
                    <textarea rows={3} {...field} />
                  </label>
                )}
              />

              <Controller
                name="allergies"
                control={control}
                render={({ field }) => (
                  <ChipInput
                    label="Alergias"
                    placeholder="Digite e pressione Enter"
                    value={field.value}
                    onChange={(next) => field.onChange(next)}
                    disabled={isSubmitting}
                  />
                )}
              />

              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <ChipInput
                    label="Tags clínicas"
                    placeholder="Ex.: crônico, retorno, telemed"
                    value={field.value}
                    onChange={(next) => field.onChange(next)}
                    disabled={isSubmitting}
                  />
                )}
              />
            </div>

            <div className="form-actions">
                <button type="button" className="ghost" onClick={handleNewPatient}>

                Novo paciente
              </button>
              <button type="submit" className="primary" disabled={isSubmitting}>
                {activePatientId ? 'Salvar alterações' : 'Cadastrar paciente'}
              </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => void handleDeletePatient()}
                  disabled={!activePatientId || isSubmitting}
                >
                Remover
              </button>
              <button
                type="button"
                className="ghost"
                onClick={() => {
                  if (activePatient) {
                    const contact = contactFromRecord(activePatient);
                    reset({
                      name: activePatient.name,
                      document: activePatient.document ?? '',
                      birthDate: activePatient.birthDate ? activePatient.birthDate.slice(0, 10) : '',
                      contactPhone: contact.phone ?? '',
                      contactEmail: contact.email ?? '',
                      contactNotes: contact.notes ?? '',
                      payer: activePatient.payer ?? '',
                      allergies: activePatient.allergies ?? [],
                      tags: activePatient.tags ?? [],
                    });
                  } else {
                    reset(EMPTY_FORM);
                  }
                }}
              >
                Limpar
              </button>
            </div>
          </form>
        </div>

        <aside className="patient-timeline" aria-label="Timeline 360°">
          <header className="timeline-header">
            <h2>Timeline 360°</h2>
            {isLoadingTimeline && <span className="timeline-status">Sincronizando…</span>}
            {!isLoadingTimeline && activePatientId && (
              <button type="button" className="ghost" onClick={() => void refreshEvents(activePatientId)}>
                Atualizar eventos
              </button>
            )}
          </header>

          {!activePatientId && <p className="empty-state">Selecione um paciente para visualizar a timeline.</p>}

          {activePatientId && groupedTimeline.length === 0 && !isLoadingTimeline && (
            <p className="empty-state">Nenhum evento registrado ainda para este paciente.</p>
          )}

          <div className="timeline-group-container">
            {groupedTimeline.map((group) => (
              <section key={group.day} className="timeline-group">
                <h3>{formatDate(group.day)}</h3>
                <ul>
                  {group.items.map((event) => (
                    <li key={event.id}>
                      <div className="timeline-icon" aria-hidden>
                        {iconForEvent(event.type)}
                      </div>
                      <div className="timeline-body">
                        <strong>{summarizeEvent(event)}</strong>
                        <time dateTime={event.createdAt}>{formatDateTime(event.createdAt)}</time>
                        {typeof event.payload?.hash === 'string' && event.payload.hash && (
                          <small className="hash-chain">Hash: {event.payload.hash.slice(0, 16)}…</small>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
