import { useEffect, useMemo, useState } from 'react';
import { requestJson } from '../utils/http';

type Metrics = {
  totalPatients: number;
  encountersToday: number;
  activePrescriptions: number;
  allergyAlerts: number;
};

const defaultMetrics: Metrics = {
  totalPatients: 0,
  encountersToday: 0,
  activePrescriptions: 0,
  allergyAlerts: 0,
};

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

export default function Dashboard() {
  const [data, setData] = useState<Metrics>(defaultMetrics);
  const [lastUpdated, setLastUpdated] = useState<string>('—');
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const m = await requestJson<Metrics>('/v1/patients/metrics');
        if (!mounted) return;
        setData(m);
        const now = new Date();
        setLastUpdated(
          `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        );
        setIsOnline(true);
      } catch {
        if (!mounted) return;
        // keep previous values, indicate offline
        setIsOnline(false);
      }
    };
    void load();
    const id = setInterval(() => void load(), 30_000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: 'Total de pacientes',
        value: String(data.totalPatients),
        footnote: `Última atualização às ${lastUpdated}`,
      },
      {
        label: 'Consultas hoje',
        value: String(data.encountersToday),
        footnote: isOnline ? 'Dados em tempo real' : 'Offline — mostrando último valor',
      },
      {
        label: 'Prescrições ativas',
        value: String(data.activePrescriptions),
        footnote: 'Validadas nas últimas 72h',
      },
      {
        label: 'Pendências críticas',
        value: String(data.allergyAlerts),
        footnote: 'Revisar solicitações de exame',
      },
    ],
    [data, lastUpdated, isOnline],
  );

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
        {metrics.map((metric: { label: string; value: string; footnote: string }) => (
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
            <span className="status-indicator">
              <span className="status-dot" aria-hidden="true"></span>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="card-footnote">
            {isOnline
              ? `SSO conectado. Último check às ${lastUpdated} (GMT-3).`
              : 'Sem conexão — tentando novamente...'}
          </p>
          <button type="button" className="action-card" style={{ borderStyle: 'solid' }}>
            <span className="action-title">Gerenciar credenciais</span>
            <span className="action-description">Abrir configurações de integração Bird ID.</span>
          </button>
        </article>
      </section>
    </div>
  );
}
