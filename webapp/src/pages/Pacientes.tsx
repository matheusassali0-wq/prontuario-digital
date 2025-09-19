import api from '../api';
import { useEffect, useState } from 'react';
type Pac = { id: string; nome: string; nascimento: string; doc?: string };
export default function Pacientes() {
  const [items, setItems] = useState<Pac[]>([]);
  const [nome, setNome] = useState('');
  const [nasc, setNasc] = useState('');
  const load = () => api.get('/pacientes').then((r) => setItems(r.data.items || []));
  useEffect(load, []);
  async function add() {
    if (!nome || !nasc) return alert('Preencha nome e nascimento');
    await api.post('/pacientes', { nome: nome.trim(), nascimento: nasc });
    setNome('');
    setNasc('');
    load();
  }
  return (
    <div className="card">
      <h3>Pacientes</h3>
      <div className="row">
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input
          placeholder="Nascimento (YYYY-MM-DD)"
          value={nasc}
          onChange={(e) => setNasc(e.target.value)}
        />
        <button className="btn btn-primary" onClick={add}>
          Novo Paciente
        </button>
      </div>
      <div className="row">
        {items.map((p) => (
          <div key={p.id} className="card">
            <b>{p.nome}</b>
            <div>Nasc.: {p.nascimento}</div>
            <div>ID: {p.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
