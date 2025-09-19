import React from 'react';
import StatsCard from './components/StatsCard';
import './styles.css';

// Inline fallback BarChart to avoid missing module error.
// Replace with a real chart implementation or separate component file when available.
type ChartType = 'bar' | 'line';
interface BarChartProps {
	labels: string[];
	values: number[];
	type?: ChartType;
}

const BarChart: React.FC<BarChartProps> = ({ labels, values, type = 'bar' }) => {
	return (
		<div className="bar-chart" aria-hidden>
			{labels.map((label, i) => (
				<div key={label + i} className="bar-chart-item" style={{ display: 'inline-block', margin: 8, textAlign: 'center' }}>
					<div
						className="bar"
						style={{
							width: 24,
							height: `${values[i] ?? 0}px`,
							background: type === 'bar' ? '#3b82f6' : '#10b981',
							borderRadius: 4,
							marginBottom: 6,
						}}
					/>
					<div className="label" style={{ fontSize: 12 }}>{label}</div>
				</div>
			))}
		</div>
	);
};

export interface TimeSeries {
	labels: string[]; // ex.: ['08:00', '09:00', ...] - preencher via API
	values: number[]; // array numérico alinhado a labels
}

export interface DashboardProps {
	// Métricas principais (todas obrigatoriamente DINÂMICAS)
	totalPacientes: number | string;
	consultasHoje: number | string;
	ocupacaoLeitosPct: number | string; // percentual ou string formatada
	altasHoje: number | string;

	// Dados de séries temporais e segmentações (todos dinâmicos)
	consultasPorDia: TimeSeries;
	atendimentosPorEspecialidade: {
		labels: string[];
		values: number[];
	};

	// callbacks opcionais para ações (ex.: navegação)
	onCardClick?: (key: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
	totalPacientes,
	consultasHoje,
	ocupacaoLeitosPct,
	altasHoje,
	consultasPorDia,
	atendimentosPorEspecialidade,
	onCardClick,
}) => {
	return (
		<div className="dashboard-root">
			<header className="dashboard-header">
				<h1 className="dashboard-title">Dashboard</h1>
				{/* Integração real: dados do cabeçalho podem vir de API/context */}
			</header>

			<section className="dashboard-stats">
				<StatsCard
					title="Total de pacientes"
					value={totalPacientes}
					onClick={() => onCardClick && onCardClick('totalPacientes')}
				/>
				<StatsCard
					title="Consultas hoje"
					value={consultasHoje}
					onClick={() => onCardClick && onCardClick('consultasHoje')}
				/>
				<StatsCard
					title="Ocupação de leitos"
					value={ocupacaoLeitosPct}
					onClick={() => onCardClick && onCardClick('ocupacaoLeitos')}
				/>
				<StatsCard
					title="Altas hoje"
					value={altasHoje}
					onClick={() => onCardClick && onCardClick('altasHoje')}
				/>
			</section>

			<section className="dashboard-charts">
				<div className="chart-card">
					<h2 className="chart-title">Consultas por dia</h2>
					{/* Integração real: passar dados reais em consultasPorDia */}
					<BarChart labels={consultasPorDia.labels} values={consultasPorDia.values} type="line" />
				</div>

				<div className="chart-card">
					<h2 className="chart-title">Atendimentos por especialidade</h2>
					{/* Integração real: passar dados reais em atendimentosPorEspecialidade */}
					<BarChart
						labels={atendimentosPorEspecialidade.labels}
						values={atendimentosPorEspecialidade.values}
						type="bar"
					/>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
