import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Patient = {
  id: string;
  name: string;
  document: string | null;
  birthDate: string | null;
};

type Note = {
  id: string;
  encounterId: string;
  contentText: string;
  updatedAt: string;
  encounter?: {
    id: string;
    patientId: string;
    date: string;
  };
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

const requestJson = async <T,>(path: string) => {
  const response = await fetch(buildUrl(path), { credentials: 'include' });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(detail || 'Falha ao carregar informação');
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

export default function ProntuarioPrint() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!noteId) return;
      try {
        const payload = await requestJson<{ note: Note }>(`/notes/${noteId}`);
        setNote(payload.note);
        const patientId =
          payload.note.encounter?.patientId ??
          (await requestJson<{ encounter: { patientId: string } }>(`/encounters/${payload.note.encounterId}`)).encounter
            .patientId;
        const patientPayload = await requestJson<{ patient: Patient }>(`/patients/${patientId}`);
        setPatient(patientPayload.patient);
        document.title = `Evolução ${patientPayload.patient.name}`;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar impressão');
      }
    };
    loadData().catch(() => undefined);
  }, [noteId]);

  if (!noteId) {
    return (
      <div className="print-container">
        <div className="print-card">
          <p>Nota não informada.</p>
          <button type="button" className="ghost-button" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="print-container">
        <div className="print-card">
          <p className="alert alert-error">{error}</p>
          <button type="button" className="ghost-button" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!note || !patient) {
    return (
      <div className="print-container">
        <div className="print-card">
          <p>Carregando evolução para impressão…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="print-container">
      <div className="print-card">
        <header className="print-header">
          <div>
            <h1>Dr. Matheus Jorge Assali • CRM-SP 210257 • RQE 130535</h1>
            <p>Data/Hora (GMT-3): {formatDateTime(note.updatedAt)}</p>
          </div>
          <button type="button" className="secondary-button print-action" onClick={() => window.print()}>
            Imprimir PDF
          </button>
        </header>
        <section className="print-section">
          <h2>Paciente</h2>
          <p>
            <strong>{patient.name}</strong>
            {patient.document ? ` · ${patient.document}` : null}
          </p>
          {patient.birthDate ? <p>Nascimento: {formatDateTime(patient.birthDate)}</p> : null}
        </section>
        <section className="print-section">
          <h2>Evolução</h2>
          <article className="print-note" aria-label="Conteúdo da evolução">
            {note.contentText.split('\n').map((line, index) => (
              <p key={index}>{line || '\u00a0'}</p>
            ))}
          </article>
        </section>
      </div>
    </div>
  );
}
