import { useEffect, useState } from 'react';
import { formatDateTimeBr } from '../utils/datetime';

type BirdStatus = {
  status: 'online' | 'offline' | 'unknown';
  detail: string;
  checkedAt: string | null;
};

const metrics = [
  { label: 'Total de pacientes', value: '128', footnote: 'Última atualização às 08:15' },
  { label: 'Consultas hoje', value: '12', footnote: '3 em andamento agora' },
  { label: 'Prescrições ativas', value: '48', footnote: 'Validadas nas últimas 72h' },
  { label: 'Pendências críticas', value: '2', footnote: 'Revisar solicitações de exame' },
];

const quickActions = [
  {
    title: 'Novo paciente',
    description: 'Cadastrar paciente com dados básicos e consentimento.',
  },
  {
    title: 'Atualizar dados',
    description: 'Revisar cadastro, convênio e contatos do paciente selecionado.',
  },
  {
    title: 'Busca rápida',
    description: 'Localizar paciente por nome, documento ou número do prontuário.',
  },
];

const readBirdStatus = (): BirdStatus => {
  if (typeof window === 'undefined') {
    return { status: 'unknown', detail: '', checkedAt: null };
  }
  const raw = window.localStorage.getItem('pd-birdid-status');
  if (!raw) {
    return { status: 'unknown', detail: '', checkedAt: null };
  }
  try {
    const parsed = JSON.parse(raw) as { status?: 'online' | 'offline'; detail?: string; checkedAt?: string };
    if (parsed.status === 'online' || parsed.status === 'offline') {
      return {
        status: parsed.status,
        detail: parsed.detail ?? '',
        checkedAt: parsed.checkedAt ?? null,
      };
    }
  } catch {
    /* ignora parse inválido */
  }
  return { status: 'unknown', detail: '', checkedAt: null };
};

export default function Dashboard() {
  const [birdStatus, setBirdStatus] = useState<BirdStatus>(() => readBirdStatus());

  useEffect(() => {
    const update = () => setBirdStatus(readBirdStatus());
    update();
    window.addEventListener('focus', update);
    window.addEventListener('storage', update);
    window.addEventListener('bird-status-change', update as EventListener);
    return () => {
      window.removeEventListener('focus', update);
      window.removeEventListener('storage', update);
      window.removeEventListener('bird-status-change', update as EventListener);
    };
  }, []);

  const statusLabel =
    birdStatus.status === 'online' ? 'Online' : birdStatus.status === 'offline' ? 'Offline' : 'Aguardando teste';
  const statusClass = `status-indicator ${birdStatus.status}`;
  const statusFootnote = birdStatus.checkedAt
    ? `Último teste em ${formatDateTimeBr(birdStatus.checkedAt)}`
    : 'Execute um teste de SSO nas configurações.';

  return (
    <div className="dashboard-view">
      <section className="page-header" aria-labelledby="dashboard-title">
        <h1 id="dashboard-title" className="page-title">
          Painel clínico
        </h1>
        <p className="page-subtitle">
          Visão geral do consultório com métricas em tempo real e ações prioritárias.
        </p>
      </section>

      <section aria-label="Métricas principais" className="cards-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="card-tile">
            <span className="card-metric">{metric.label}</span>
            <span className="card-value">{metric.value}</span>
            <span className="card-footnote">{metric.footnote}</span>
          </article>
        ))}
      </section>

      <section aria-label="Ações rápidas" className="actions-panel">
        {quickActions.map((action) => (
          <button key={action.title} type="button" className="action-card">
            <span className="action-title">{action.title}</span>
            <span className="action-description">{action.description}</span>
          </button>
        ))}
        <article className="status-tile" aria-live="polite">
          <div className="status-header">
            <span>Status Bird ID</span>
            <span className={statusClass}>
              <span className="status-dot" aria-hidden="true"></span>
              {statusLabel}
            </span>
          </div>
          <p className="card-footnote">{statusFootnote}</p>
          <button type="button" className="action-card" style={{ borderStyle: 'solid' }}>
            <span className="action-title">Gerenciar credenciais</span>
            <span className="action-description">Abrir configurações de integração Bird ID.</span>
          </button>
        </article>
      </section>
    </div>
  );
}
