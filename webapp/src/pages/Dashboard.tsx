import { useEffect, useState } from 'react';
import api from '../api';
export default function Dashboard() {
  const [d, setD] = useState<any>({
    pacientes: 0,
    evolucoes: 0,
    prescricoes: 0,
    consultasHoje: 0,
  });
  useEffect(() => {
    api.get('/stats').then((r) => setD(r.data));
  }, []);
  return (
    <div className="card">
      <h3>Dashboard</h3>
      <div className="row">
        <div className="card">
          <b>{d.pacientes}</b>
          <div className="muted">Pacientes</div>
        </div>
        <div className="card">
          <b>{d.consultasHoje}</b>
          <div className="muted">Consultas Hoje</div>
        </div>
        <div className="card">
          <b>{d.evolucoes}</b>
          <div className="muted">Evoluções</div>
        </div>
        <div className="card">
          <b>{d.prescricoes}</b>
          <div className="muted">Prescrições</div>
        </div>
      </div>
    </div>
  );
}
