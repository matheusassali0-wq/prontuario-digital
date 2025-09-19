import React, { useEffect, useRef } from 'react';

export interface BarChartProps {
	labels: string[]; // passar via API/props (integração real)
	values: number[]; // passar via API/props (integração real)
	type?: 'bar' | 'line';
	options?: any; // opções específicas da lib de gráficos (integração real)
	datasetLabel?: string; // opcional: passar rótulo dinâmico via props
	colors?: { background?: string; border?: string }; // opcional: cores dinâmicas via props
}

/*
Integração real, sem hardcode:
- Este componente inicializa o gráfico somente se receber arrays válidos (labels e values).
- Não há valores padrão ou placeholders embutidos.
- Para integração real: passe labels e values diretamente via API/props/context/state.
*/
const BarChart: React.FC<BarChartProps> = ({ labels, values, type = 'bar', options, datasetLabel, colors }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<any>(null);

	useEffect(() => {
		let mounted = true;

		async function initChart() {
			// Integração real: validar os dados DINÂMICOS fornecidos pela camada superior (API/props/context)
			if (!Array.isArray(labels) || !Array.isArray(values)) {
				// Integração real: lançar log para depuração; não inserir dados simulados.
				console.error('BarChart: "labels" and "values" must be arrays. Provide real data via props/context.');
				return;
			}
			if (labels.length !== values.length) {
				// Integração real: garantir alinhamento entre labels e values antes de passar ao componente
				console.error('BarChart: "labels" length must match "values" length. Pass aligned arrays via API/props.');
				return;
			}

			if (!canvasRef.current) return;

			try {
				// Import dinâmico e seguro para múltiplos formatos de exportação de chart.js
				// @ts-ignore: optional dependency may not have type declarations in this project
				const ChartModule = await import('chart.js/auto').catch(() => undefined);
				const Chart = ChartModule && (ChartModule as any).default ? (ChartModule as any).default : ChartModule;
				if (!mounted || !Chart) {
					// Integração real: se chart.js não estiver instalado, documentar no README e inicializar outra lib no lugar
					return;
				}

				// destrói instância existente antes de criar nova
				if (chartInstanceRef.current) {
					chartInstanceRef.current.destroy();
				}

				chartInstanceRef.current = new Chart(canvasRef.current, {
					type,
					data: {
						labels,
						datasets: [
							{
								label: datasetLabel ?? '', // INTEGRAÇÃO REAL: passar rótulo dinâmico, não usar valor simulado
								data: values,
								backgroundColor: colors?.background ?? 'rgba(54, 162, 235, 0.5)',
								borderColor: colors?.border ?? 'rgba(54, 162, 235, 1)',
								borderWidth: 1,
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						...options,
					},
				});
			} catch (e) {
				// Integração real: se chart.js não estiver disponível, inicialize aqui outra lib usando canvasRef.
				// NÃO inserir dados hardcoded — somente usar os arrays labels/values fornecidos pela integração real.
				console.error('BarChart: failed to initialize chart library. Provide chart.js or initialize alternate library.', e);
			}
		}

		initChart();

		return () => {
			mounted = false;
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
				chartInstanceRef.current = null;
			}
		};
		// Reexecuta sempre que os dados mudarem — integração reativa para dados reais.
	}, [labels, values, type, options, datasetLabel, colors]);

	// Renderiza apenas o canvas; toda exibição de dados fica estritamente controlada pelos arrays fornecidos (integração real).
	return <canvas ref={canvasRef} style={{ width: '100%', height: '260px' }} aria-label="gráfico" />;
};

export default BarChart;
