import React from 'react';

export interface StatsCardProps {
	title: string;
	value: React.ReactNode; // Ex.: número, string formatada ou componente
	subtitle?: React.ReactNode;
	onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, onClick }) => {
	return (
		<button className="stats-card" onClick={onClick} type="button" aria-label={title}>
			<div className="stats-card-body">
				<div className="stats-card-title">{title}</div>
				<div className="stats-card-value">{value}</div>
				{subtitle && <div className="stats-card-subtitle">{subtitle}</div>}
			</div>
		</button>
	);
};

export default StatsCard;
