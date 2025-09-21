import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimelineEvent, useActivePatientStore } from '../stores/patientStore';

type Patient = {
  id: string;
  name: string;
  document: string | null;
  birthDate: string | null;
  payer: string | null;
  contact?: { phone?: string; email?: string; notes?: string } | null;
};

type EncounterSummary = {
  encounter: {
    id: string;
    patientId: string;
    date: string;
    type: string;
    createdAt: string;
  };
  latestNote: {
    id: string;
    version: number;
    updatedAt: string;
    summary: string;
  } | null;
};

type Attachment = {
  id: string;
  noteId: string;
  fileName: string;
  mime: string;
  size: number;
  createdAt: string;
};

type Note = {
  id: string;
  encounterId: string;
  authorId: string | null;
  contentText: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  encounter?: {
    id: string;
    patientId: string;
    date: string;
    type: string;
  };
  attachments: Attachment[];
};

type NoteVersion = {
  id: string;
  noteId: string;
  version: number;
  contentText: string;
  createdAt: string;
};

type EvolutionTemplate = {
  id: string;
  name: string;
  type: string;
  content: string;
};

const resolveApiBase = () => {
  const meta = import.meta as { env?: Record<string, string | undefined> };
  const candidate = meta.env?.VITE_API_BASE_URL;
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate;
  }
  return '/api/v1';
};

const buildUrl = (path: string) => {
  const base = resolveApiBase();
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${normalizedBase}${path}`;
};

const requestJson = async <T,>(path: string, init?: RequestInit & { rawBody?: unknown }) => {
  const headers = new Headers(init?.headers ?? {});
  let body = init?.body ?? null;
  if (init?.rawBody !== undefined) {
    body = JSON.stringify(init.rawBody);
  }
  if (!(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
    body,
    credentials: 'include',
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(detail || 'Falha ao comunicar com o servidor');
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
};

const formatDateTime = (value: string) => {
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return value;
  }
};

const formatDate = (value: string) => {
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  } catch {
    return value;
  }
};

const humanFileSize = (size: number) => {
  if (!Number.isFinite(size)) return `${size}`;
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (size >= 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${size} B`;
};

const groupEventsByDay = (events: TimelineEvent[]) => {
  const groups = new Map<string, TimelineEvent[]>();
  events.forEach((event) => {
    const key = formatDate(event.createdAt);
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(event);
    } else {
      groups.set(key, [event]);
    }
  });
  return Array.from(groups.entries()).map(([date, eventsForDate]) => ({ date, events: eventsForDate }));
};

export default function Prontuarios() {
  const navigate = useNavigate();
  const {
    activePatientId,
    eventsByPatient,
    isLoading: isTimelineLoading,
    refreshEvents,
  } = useActivePatientStore();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [templates, setTemplates] = useState<EvolutionTemplate[]>([]);
  const [encounters, setEncounters] = useState<EncounterSummary[]>([]);
  const [selectedEncounterId, setSelectedEncounterId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteVersions, setNoteVersions] = useState<NoteVersion[]>([]);
  const [editorContent, setEditorContent] = useState('');
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isLoadingEncounters, setIsLoadingEncounters] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const autosaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedContent = useRef<string>('');

  const timelineEvents = useMemo(() => {
    if (!activePatientId) return [];
    return eventsByPatient[activePatientId] ?? [];
  }, [activePatientId, eventsByPatient]);

  const groupedTimeline = useMemo(() => groupEventsByDay(timelineEvents), [timelineEvents]);

  const loadTemplates = useCallback(async () => {
    try {
      const response = await fetch('/templates/templates_evolucao.json', { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('Falha ao carregar templates');
      }
      const payload = (await response.json()) as EvolutionTemplate[];
      setTemplates(payload);
    } catch {
      setTemplates([]);
    }
  }, []);

  const loadPatient = useCallback(
    async (patientId: string) => {
      try {
        const payload = await requestJson<{ patient: Patient }>(`/patients/${patientId}`);
        setPatient(payload.patient);
      } catch (err: unknown) {
        setPatient(null);
        setErrorMessage(err instanceof Error ? err.message : 'Falha ao carregar paciente');
      }
    },
    [],
  );

  const loadVersions = useCallback(async (noteId: string) => {
    try {
      const payload = await requestJson<{ versions: NoteVersion[] }>(`/notes/${noteId}/versions`);
      setNoteVersions(payload.versions ?? []);
    } catch {
      setNoteVersions([]);
    }
  }, []);

  const applyNoteSelection = useCallback(
    async (note: Note | null) => {
      setSelectedNote(note);
      setEditorContent(note?.contentText ?? '');
      lastSavedContent.current = note?.contentText ?? '';
      if (note?.id) {
        await loadVersions(note.id);
      } else {
        setNoteVersions([]);
      }
    },
    [loadVersions],
  );

  const loadEncounterDetails = useCallback(
    async (encounterId: string, preferredNoteId?: string | null) => {
      try {
        const payload = await requestJson<{ encounter: EncounterSummary['encounter']; notes: Note[] }>(
          `/encounters/${encounterId}`,
        );
        setNotes(payload.notes ?? []);
        const nextNote =
          (preferredNoteId ? payload.notes.find((item) => item.id === preferredNoteId) : undefined) ??
          payload.notes[0] ??
          null;
        await applyNoteSelection(nextNote);
      } catch (err: unknown) {
        setNotes([]);
        await applyNoteSelection(null);
        setErrorMessage(err instanceof Error ? err.message : 'Falha ao carregar evolução');
      }
    },
    [applyNoteSelection],
  );

  const loadEncounters = useCallback(
    async (patientId: string, preferredEncounterId?: string | null, preferredNoteId?: string | null) => {
      setIsLoadingEncounters(true);
      try {
        const payload = await requestJson<{ items: EncounterSummary[] }>(
          `/encounters?patient_id=${encodeURIComponent(patientId)}&page=1&page_size=50`,
        );
        const items = payload.items ?? [];
        setEncounters(items);
        const nextEncounter =
          (preferredEncounterId
            ? items.find((item) => item.encounter.id === preferredEncounterId)?.encounter.id
            : undefined) ||
          items[0]?.encounter.id ||
          null;
        setSelectedEncounterId(nextEncounter);
        if (nextEncounter) {
          await loadEncounterDetails(nextEncounter, preferredNoteId);
        } else {
          await applyNoteSelection(null);
        }
      } catch (err: unknown) {
        setEncounters([]);
        setSelectedEncounterId(null);
        await applyNoteSelection(null);
        setErrorMessage(err instanceof Error ? err.message : 'Falha ao carregar encontros');
      } finally {
        setIsLoadingEncounters(false);
      }
    },
    [applyNoteSelection, loadEncounterDetails],
  );

  const refreshPatientContext = useCallback(
    async (patientId: string) => {
      await Promise.all([loadPatient(patientId), loadEncounters(patientId), refreshEvents(patientId)]);
    },
    [loadEncounters, loadPatient, refreshEvents],
  );

  useEffect(() => {
    loadTemplates().catch(() => undefined);
  }, [loadTemplates]);

  useEffect(() => {
    if (!activePatientId) {
      setPatient(null);
      setEncounters([]);
      setNotes([]);
      applyNoteSelection(null).catch(() => undefined);
      return;
    }
    refreshPatientContext(activePatientId).catch((err: unknown) => {
      setErrorMessage(err instanceof Error ? err.message : 'Falha ao carregar dados');
    });
  }, [activePatientId, applyNoteSelection, refreshPatientContext]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsPaletteOpen(true);
      }
      if (event.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saveNoteContent = useCallback(
    async (noteId: string, content: string) => {
      setAutosaveStatus('saving');
      try {
        const payload = await requestJson<{ note: Note }>(`/notes/${noteId}`, {
          method: 'PUT',
          rawBody: { contentText: content },
        });
        setNotes((current) =>
          current.map((item) => (item.id === payload.note.id ? { ...item, ...payload.note } : item)),
        );
        setSelectedNote(payload.note);
        setEditorContent(payload.note.contentText);
        lastSavedContent.current = payload.note.contentText;
        await loadVersions(payload.note.id);
        if (activePatientId) {
          await refreshEvents(activePatientId);
        }
        setEncounters((current) =>
          current.map((entry) =>
            entry.encounter.id === payload.note.encounterId
              ? {
                  ...entry,
                  latestNote: {
                    id: payload.note.id,
                    version: payload.note.version,
                    updatedAt: payload.note.updatedAt,
                    summary: payload.note.contentText.slice(0, 160),
                  },
                }
              : entry,
          ),
        );
        setAutosaveStatus('saved');
      } catch (err: unknown) {
        setAutosaveStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Não foi possível salvar a evolução');
      }
    },
    [activePatientId, loadVersions, refreshEvents],
  );

  useEffect(() => {
    if (!selectedNote) {
      setAutosaveStatus('idle');
      return () => undefined;
    }
    if (editorContent === lastSavedContent.current) {
      setAutosaveStatus('idle');
      return () => undefined;
    }
    setAutosaveStatus('saving');
    if (autosaveTimeout.current) {
      clearTimeout(autosaveTimeout.current);
    }
    autosaveTimeout.current = setTimeout(() => {
      saveNoteContent(selectedNote.id, editorContent).catch(() => undefined);
    }, 1500);
    return () => {
      if (autosaveTimeout.current) {
        clearTimeout(autosaveTimeout.current);
        autosaveTimeout.current = null;
      }
    };
  }, [editorContent, saveNoteContent, selectedNote]);

  const handleSelectEncounter = useCallback(
    async (encounterId: string) => {
      setSelectedEncounterId(encounterId);
      await loadEncounterDetails(encounterId);
    },
    [loadEncounterDetails],
  );

  const handleSelectNote = useCallback(
    async (noteId: string) => {
      const next = notes.find((item) => item.id === noteId) ?? null;
      await applyNoteSelection(next);
    },
    [applyNoteSelection, notes],
  );

  const handleCreateEvolution = useCallback(
    async (template: EvolutionTemplate) => {
      if (!activePatientId) {
        setErrorMessage('Selecione um paciente para criar evolução.');
        return;
      }
      setIsCreating(true);
      try {
        const encounterPayload = await requestJson<{ encounter: EncounterSummary['encounter'] }>(`/encounters`, {
          method: 'POST',
          rawBody: { patientId: activePatientId, type: template.type },
        });
        const notePayload = await requestJson<{ note: Note }>(`/notes`, {
          method: 'POST',
          rawBody: { encounterId: encounterPayload.encounter.id, contentText: template.content },
        });
        await loadEncounters(activePatientId, encounterPayload.encounter.id, notePayload.note.id);
        if (activePatientId) {
          await refreshEvents(activePatientId);
        }
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : 'Falha ao iniciar evolução');
      } finally {
        setIsCreating(false);
      }
    },
    [activePatientId, loadEncounters, refreshEvents],
  );

  const handleUploadAttachment = useCallback(
    async (file: File) => {
      if (!selectedNote) return;
      const formData = new FormData();
      formData.set('noteId', selectedNote.id);
      formData.append('file', file);
      setIsUploading(true);
      try {
        const payload = await requestJson<{ attachment: Attachment }>(`/attachments`, {
          method: 'POST',
          body: formData,
        });
        setSelectedNote((current) =>
          current && current.id === selectedNote.id
            ? { ...current, attachments: [...current.attachments, payload.attachment] }
            : current,
        );
        setNotes((current) =>
          current.map((item) =>
            item.id === selectedNote.id
              ? { ...item, attachments: [...item.attachments, payload.attachment] }
              : item,
          ),
        );
        if (activePatientId) {
          await refreshEvents(activePatientId);
        }
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : 'Falha ao anexar arquivo');
      } finally {
        setIsUploading(false);
      }
    },
    [activePatientId, refreshEvents, selectedNote],
  );

  const handleRestoreVersion = useCallback(
    async (version: NoteVersion) => {
      if (!selectedNote) return;
      await saveNoteContent(selectedNote.id, version.contentText);
    },
    [saveNoteContent, selectedNote],
  );

  const handleEditorChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setEditorContent(event.currentTarget.value);
  }, []);

  const handleAttachmentInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        void handleUploadAttachment(file);
        event.currentTarget.value = '';
      }
    },
    [handleUploadAttachment],
  );

  const paletteActions = useMemo(() => {
    const initialTemplate = templates.find((item) => item.type === 'INITIAL') ?? templates[0];
    const followUpTemplate = templates.find((item) => item.type === 'FOLLOW_UP') ?? templates[1];
    const actions: { id: string; label: string; disabled?: boolean; run: () => void }[] = [];
    if (initialTemplate) {
      actions.push({
        id: 'new-initial',
        label: 'Nova Evolução (1ª)',
        run: () => {
          void handleCreateEvolution(initialTemplate);
        },
      });
    }
    if (followUpTemplate) {
      actions.push({
        id: 'new-follow-up',
        label: 'Nova Evolução (Retorno)',
        run: () => {
          void handleCreateEvolution(followUpTemplate);
        },
      });
    }
    actions.push({
      id: 'attach',
      label: 'Anexar Arquivo',
      disabled: !selectedNote,
      run: () => {
        const input = document.getElementById('attachment-input');
        if (input instanceof HTMLInputElement) {
          input.click();
        }
      },
    });
    actions.push({
      id: 'print',
      label: 'Imprimir Evolução Atual',
      disabled: !selectedNote,
      run: () => {
        if (selectedNote) {
          navigate(`/prontuarios/imprimir/${selectedNote.id}`);
        }
      },
    });
    return actions;
  }, [handleCreateEvolution, navigate, selectedNote, templates]);

  const renderPalette = () => {
    if (!isPaletteOpen) return null;
    return (
      <div className="command-palette" role="dialog" aria-modal="true">
        <div className="command-palette-card">
          <header className="command-palette-header">
            <h2>Comando rápido</h2>
            <button type="button" className="ghost-button" onClick={() => setIsPaletteOpen(false)}>
              Fechar
            </button>
          </header>
          <ul className="command-palette-list">
            {paletteActions.map((action) => (
              <li key={action.id}>
                <button
                  type="button"
                  className="palette-action"
                  onClick={() => {
                    if (!action.disabled) {
                      setIsPaletteOpen(false);
                      action.run();
                    }
                  }}
                  disabled={Boolean(action.disabled)}
                >
                  {action.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (!activePatientId) {
    return (
      <section className="placeholder-card">
        <h1 className="placeholder-title">Prontuários · Evolução clínica</h1>
        <p className="placeholder-description">
          Selecione um paciente na página “Pacientes” para acessar evoluções, anexos e timeline clínica.
        </p>
      </section>
    );
  }

  return (
    <div className="prontuario-layout">
      <header className="prontuario-header">
        <div>
          <h1>Prontuário do paciente</h1>
          <p className="prontuario-subtitle">
            {patient ? (
              <>
                <strong>{patient.name}</strong>
                {patient.document ? ` · ${patient.document}` : null}
                {patient.payer ? ` · Convênio: ${patient.payer}` : null}
              </>
            ) : (
              'Carregando paciente...'
            )}
          </p>
        </div>
        <div className="prontuario-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              const template = templates.find((item) => item.type === 'INITIAL') ?? templates[0];
              if (template) {
                void handleCreateEvolution(template);
              }
            }}
            disabled={isCreating}
          >
            Nova Evolução (1ª)
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              const template = templates.find((item) => item.type === 'FOLLOW_UP') ?? templates[1];
              if (template) {
                void handleCreateEvolution(template);
              }
            }}
            disabled={isCreating}
          >
            Nova Evolução (Retorno)
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              if (selectedNote) {
                navigate(`/prontuarios/imprimir/${selectedNote.id}`);
              }
            }}
            disabled={!selectedNote}
          >
            Imprimir
          </button>
        </div>
      </header>

      {errorMessage ? <div className="alert alert-error">{errorMessage}</div> : null}

      <div className="prontuario-columns">
        <aside className="prontuario-sidebar" aria-label="Encontros clínicos">
          <header className="sidebar-header">
            <h2>Encontros</h2>
            {isLoadingEncounters ? <span className="tag">Carregando…</span> : null}
          </header>
          <ul className="encounter-list">
            {encounters.map((entry) => (
              <li key={entry.encounter.id}>
                <button
                  type="button"
                  className={
                    selectedEncounterId === entry.encounter.id
                      ? 'encounter-item encounter-item-active'
                      : 'encounter-item'
                  }
                  onClick={() => {
                    void handleSelectEncounter(entry.encounter.id);
                  }}
                >
                  <span className="encounter-type">{entry.encounter.type}</span>
                  <span className="encounter-date">{formatDateTime(entry.encounter.date)}</span>
                  {entry.latestNote ? (
                    <span className="encounter-note">v{entry.latestNote.version} · {entry.latestNote.summary}</span>
                  ) : (
                    <span className="encounter-note muted">Sem evolução registrada</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="prontuario-editor" aria-label="Evolução clínica">
          <header className="editor-header">
            <div>
              <h2>Evolução</h2>
              {selectedNote ? <span className="tag">Versão {selectedNote.version}</span> : null}
            </div>
            <div className="editor-status" role="status" aria-live="polite">
              {autosaveStatus === 'saving' ? 'Salvando…' : null}
              {autosaveStatus === 'saved' ? 'Salvo automaticamente' : null}
              {autosaveStatus === 'error' ? 'Erro ao salvar' : null}
            </div>
          </header>

          {notes.length > 1 ? (
            <nav className="note-tabs" aria-label="Notas do encontro">
              {notes.map((note) => (
                <button
                  type="button"
                  key={note.id}
                  className={selectedNote?.id === note.id ? 'note-tab note-tab-active' : 'note-tab'}
                  onClick={() => {
                    void handleSelectNote(note.id);
                  }}
                >
                  Evolução #{note.version}
                </button>
              ))}
            </nav>
          ) : null}

          <textarea
            className="note-editor"
            value={editorContent}
            onChange={handleEditorChange}
            placeholder="Selecione ou crie uma evolução para editar."
            rows={28}
            disabled={!selectedNote}
          />

          <div className="editor-footer">
            <label className="attachment-upload">
              <input
                id="attachment-input"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleAttachmentInputChange}
                disabled={!selectedNote || isUploading}
              />
              <span>{isUploading ? 'Enviando…' : 'Anexar arquivo'}</span>
            </label>
            <button
              type="button"
              className="ghost-button"
              onClick={() => selectedNote && navigate(`/prontuarios/imprimir/${selectedNote.id}`)}
              disabled={!selectedNote}
            >
              Gerar impressão
            </button>
          </div>

          <section className="attachments-section">
            <h3>Anexos</h3>
            {selectedNote && selectedNote.attachments.length === 0 ? (
              <p className="muted">Nenhum anexo enviado.</p>
            ) : null}
            <ul className="attachment-list">
              {selectedNote?.attachments.map((attachment) => (
                <li key={attachment.id} className="attachment-item">
                  <div>
                    <strong>{attachment.fileName}</strong>
                    <span className="muted"> · {humanFileSize(attachment.size)} · {attachment.mime}</span>
                  </div>
                  <a
                    className="secondary-button"
                    href={buildUrl(`/attachments/${attachment.id}/download`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Baixar
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="versions-section">
            <h3>Histórico de versões</h3>
            {noteVersions.length === 0 ? <p className="muted">Nenhuma versão anterior.</p> : null}
            <ul className="versions-list">
              {noteVersions.map((version) => (
                <li key={version.id} className="version-item">
                  <div>
                    <span>v{version.version}</span>
                    <span className="muted"> · {formatDateTime(version.createdAt)}</span>
                  </div>
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => {
                      void handleRestoreVersion(version);
                    }}
                  >
                    Restaurar
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <aside className="timeline-panel" aria-label="Timeline 360°">
          <header className="sidebar-header">
            <h2>Timeline 360°</h2>
            <button
              type="button"
              className="ghost-button"
              onClick={() => {
                if (activePatientId) {
                  void refreshEvents(activePatientId);
                }
              }}
            >
              Atualizar
            </button>
          </header>
          {isTimelineLoading ? <p className="muted">Carregando eventos…</p> : null}
          {!isTimelineLoading && groupedTimeline.length === 0 ? (
            <p className="muted">Nenhum evento registrado para este paciente.</p>
          ) : null}
          <div className="timeline-groups">
            {groupedTimeline.map((group) => (
              <section key={group.date} className="timeline-group">
                <h3>{group.date}</h3>
                <ul>
                  {group.events.map((event) => (
                    <li key={event.id} className={`timeline-event timeline-event-${event.type.toLowerCase()}`}>
                      <div>
                        <strong>{event.type}</strong>
                        <span className="muted"> · {formatDateTime(event.createdAt)}</span>
                      </div>
                      {typeof event.payload?.summary === 'string' ? <p>{event.payload.summary}</p> : null}
                      {event.type.startsWith('NOTE') && typeof event.payload?.noteId === 'string' ? (
                        <button
                          type="button"
                          className="ghost-button"
                          onClick={() => {
                            const encounterId =
                              typeof event.payload?.encounterId === 'string' ? event.payload.encounterId : null;
                            if (encounterId) {
                              void handleSelectEncounter(encounterId).catch(() => undefined);
                            }
                          }}
                        >
                          Abrir nota
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </aside>
      </div>

      {renderPalette()}
    </div>
  );
}
