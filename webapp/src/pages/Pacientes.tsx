import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Patient, PatientTag, TimelineEvent, usePatientStore } from '../stores/patientStore';

const TIMEZONE = 'America/Sao_Paulo';

const initialFormState = {
  name: '',
  document: '',
  birthDate: '',
  contact: '',
  insurance: '',
  allergiesInput: '',
  notes: '',
  lastVisit: '',
  nextAppointment: '',
};

type FormState = typeof initialFormState;

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: value.includes('T') ? 'short' : undefined,
    timeZone: TIMEZONE,
  }).format(date);
};

const generateLocalId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);

const toTags = (value: string): PatientTag[] =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((label) => ({ id: generateLocalId(), label }));

const escapeRegExp = (input: string) => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const matchHighlight = (text: string, query: string) => {
  if (!query) return text;
  const normalized = query.trim();
  if (!normalized) return text;
  const regex = new RegExp(`(${escapeRegExp(normalized)})`, 'ig');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === normalized.toLowerCase() ? (
      <mark key={`${part}-${index}`} className="search-highlight">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
};

export default function Pacientes() {
  const {
    patients,
    activePatientId,
    setActivePatient,
    addPatient,
    updatePatient,
    deletePatient,
    timeline,
  } = usePatientStore();

  const activePatient = useMemo(
    () => patients.find((patient) => patient.id === activePatientId) ?? null,
    [patients, activePatientId],
  );

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handle = window.setTimeout(() => setDebouncedSearch(searchTerm.trim()), 220);
    return () => window.clearTimeout(handle);
  }, [searchTerm]);

  useEffect(() => {
    if (activePatient) {
      setFormState({
        name: activePatient.name,
        document: activePatient.document,
        birthDate: activePatient.birthDate,
        contact: activePatient.contact,
        insurance: activePatient.insurance,
        allergiesInput: activePatient.allergies.map((tag) => tag.label).join(', '),
        notes: activePatient.notes ?? '',
        lastVisit: activePatient.lastVisit?.split('T')[0] ?? '',
        nextAppointment: activePatient.nextAppointment?.split('T')[0] ?? '',
      });
      setIsEditing(true);
    } else {
      setFormState(initialFormState);
      setIsEditing(false);
    }
  }, [activePatient]);

  const filteredPatients = useMemo(() => {
    if (!debouncedSearch) return patients;
    const needle = debouncedSearch.toLowerCase();
    return patients.filter((patient) =>
      [patient.name, patient.document, patient.contact, patient.insurance]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(needle)),
    );
  }, [patients, debouncedSearch]);

  const selectedTimeline = useMemo<readonly TimelineEvent[]>(() => {
    if (!activePatientId) return [];
    return timeline[activePatientId] ?? [];
  }, [timeline, activePatientId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      name: formState.name.trim(),
      document: formState.document.trim(),
      birthDate: formState.birthDate,
      contact: formState.contact.trim(),
      insurance: formState.insurance.trim(),
      allergies: toTags(formState.allergiesInput),
      notes: formState.notes.trim() || undefined,
      lastVisit: formState.lastVisit ? `${formState.lastVisit}T09:00:00-03:00` : undefined,
      nextAppointment: formState.nextAppointment
        ? `${formState.nextAppointment}T09:00:00-03:00`
        : undefined,
    } satisfies Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;

    if (isEditing && activePatient) {
      updatePatient(activePatient.id, payload);
    } else {
      const newPatient = addPatient(payload);
      setActivePatient(newPatient.id);
    }
  };

  const handleNewPatient = () => {
    setActivePatient(null);
    setFormState(initialFormState);
    setIsEditing(false);
  };

  const handleDeletePatient = () => {
    if (!activePatient) return;
    const confirmation = window.confirm(
      `Remover permanentemente ${activePatient.name}? Essa ação não pode ser desfeita.`,
    );
    if (confirmation) {
      deletePatient(activePatient.id);
    }
  };

  const totalPatients = patients.length;
  const upcomingAppointments = patients.filter((patient) => patient.nextAppointment).length;
  const patientsWithAlerts = patients.filter((patient) => patient.allergies.length > 0).length;

  return (
    <div className="pacientes-page" aria-labelledby="pacientes-heading">
      <header className="page-header">
        <h1 id="pacientes-heading" className="page-title">
          Pacientes
        </h1>
        <p className="page-subtitle">
          Cadastro, busca instantânea e seleção ativa com visão 360° do paciente.
        </p>
      </header>

      <section className="patient-counters" aria-label="Indicadores de pacientes">
        <article className="card-tile">
          <span className="card-metric">Total de pacientes</span>
          <strong className="card-value">{totalPatients}</strong>
          <span className="card-footnote">Base sincronizada localmente</span>
        </article>
        <article className="card-tile">
          <span className="card-metric">Próximos retornos agendados</span>
          <strong className="card-value">{upcomingAppointments}</strong>
          <span className="card-footnote">Com data confirmada no prontuário</span>
        </article>
        <article className="card-tile">
          <span className="card-metric">Alertas de alergias</span>
          <strong className="card-value">{patientsWithAlerts}</strong>
          <span className="card-footnote">Pacientes com alergias registradas</span>
        </article>
      </section>

      <div className="patient-actions">
        <button type="button" className="primary" onClick={handleNewPatient}>
          Novo paciente
        </button>
        <input
          type="search"
          name="search"
          className="search-input"
          placeholder="Buscar por nome, ID interno, contato ou convênio"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Buscar paciente"
        />
      </div>

      <div className="patient-layout">
        <section className="patient-list" aria-label="Lista de pacientes">
          <header className="section-header">
            <h2>Pacientes ({filteredPatients.length})</h2>
          </header>
          <ul className="patient-items">
            {filteredPatients.map((patient) => {
              const isActive = patient.id === activePatientId;
              return (
                <li key={patient.id}>
                  <button
                    type="button"
                    className={`patient-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActivePatient(patient.id)}
                  >
                    <div className="patient-item-main">
                      <span className="patient-name">
                        {matchHighlight(patient.name, debouncedSearch)}
                      </span>
                      <span className="patient-document">
                        {matchHighlight(patient.document, debouncedSearch)}
                      </span>
                    </div>
                    <div className="patient-item-meta">
                      <span>{matchHighlight(patient.insurance, debouncedSearch)}</span>
                      <span>{matchHighlight(patient.contact, debouncedSearch)}</span>
                    </div>
                    {patient.allergies.length > 0 ? (
                      <div className="patient-tags" aria-label="Alergias registradas">
                        {patient.allergies.map((tag) => (
                          <span key={tag.id} className="tag alert">
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </button>
                </li>
              );
            })}
            {filteredPatients.length === 0 ? (
              <li className="patient-empty">Nenhum paciente encontrado para esta busca.</li>
            ) : null}
          </ul>
        </section>

        <section className="patient-detail" aria-live="polite">
          {activePatient ? (
            <div className="patient-detail-content">
              <header className="section-header">
                <h2>Ficha do paciente</h2>
                <span className="detail-id">{activePatient.document}</span>
              </header>

              <form className="patient-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label>
                    <span>Nome completo</span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <span>ID interno / Documento</span>
                    <input
                      type="text"
                      name="document"
                      required
                      value={formState.document}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <span>Data de nascimento</span>
                    <input
                      type="date"
                      name="birthDate"
                      required
                      value={formState.birthDate}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <span>Contato</span>
                    <input
                      type="text"
                      name="contact"
                      value={formState.contact}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <span>Convênio</span>
                    <input
                      type="text"
                      name="insurance"
                      value={formState.insurance}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <span>Alergias / Tags (separe com vírgula)</span>
                    <input
                      type="text"
                      name="allergiesInput"
                      value={formState.allergiesInput}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <span>Última consulta</span>
                    <input
                      type="date"
                      name="lastVisit"
                      value={formState.lastVisit}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <span>Próximo retorno</span>
                    <input
                      type="date"
                      name="nextAppointment"
                      value={formState.nextAppointment}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <label className="notes-field">
                  <span>Observações</span>
                  <textarea
                    name="notes"
                    rows={4}
                    value={formState.notes}
                    onChange={handleInputChange}
                  />
                </label>
                <div className="form-actions">
                  <button type="submit" className="primary">
                    {isEditing ? 'Salvar alterações' : 'Cadastrar paciente'}
                  </button>
                  <button type="button" className="ghost" onClick={handleNewPatient}>
                    Limpar formulário
                  </button>
                  <button type="button" className="danger" onClick={handleDeletePatient}>
                    Remover paciente
                  </button>
                </div>
                <footer className="form-footnote">
                  <span>Atualizado em {formatDate(activePatient.updatedAt)}</span>
                  <span>Cadastro em {formatDate(activePatient.createdAt)}</span>
                </footer>
              </form>

              <section className="patient-timeline" aria-label="Timeline 360° do paciente">
                <header className="section-header">
                  <h3>Timeline 360°</h3>
                  <p>
                    Evoluções, prescrições, pedidos de exames e anexos importantes ficam
                    registrados aqui.
                  </p>
                </header>
                <ol className="timeline-items">
                  {selectedTimeline.length === 0 ? (
                    <li className="timeline-empty">
                      <strong>Sem eventos registrados ainda</strong>
                      <p>
                        Evoluções, prescrições, pedidos de exame e anexos aparecerão nesta linha
                        do tempo assim que forem lançados.
                      </p>
                    </li>
                  ) : (
                    selectedTimeline.map((event) => (
                      <li key={event.id} className={`timeline-item ${event.type}`}>
                        <div className="timeline-meta">
                          <span className="timeline-type">{event.type}</span>
                          <time dateTime={event.timestamp}>{formatDate(event.timestamp)}</time>
                        </div>
                        <div className="timeline-content">
                          <strong>{event.title}</strong>
                          <p>{event.description}</p>
                        </div>
                      </li>
                    ))
                  )}
                </ol>
              </section>
            </div>
          ) : (
            <div className="patient-empty-state">
              <h2>Nenhum paciente selecionado</h2>
              <p>
                Escolha um paciente na lista ao lado ou cadastre um novo para visualizar a
                ficha completa.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
