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

export default function Dashboard() {
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
            <span className="status-indicator">
              <span className="status-dot" aria-hidden="true"></span>
              Online
            </span>
          </div>
          <p className="card-footnote">SSO conectado. Último check às 08:12 (GMT-3).</p>
          <button type="button" className="action-card" style={{ borderStyle: 'solid' }}>
            <span className="action-title">Gerenciar credenciais</span>
            <span className="action-description">Abrir configurações de integração Bird ID.</span>
          </button>
        </article>
      </section>
    </div>
  );
}
