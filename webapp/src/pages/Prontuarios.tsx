import { useEffect, useRef, useState } from 'react';
import api from '../api';

type Evo = {
  id: string;
  pacienteId: string;
  data: string;
  texto: string;
  tipo: string;
};
type Pac = { id: string; nome: string; nascimento: string; doc?: string };

export default function Prontuarios() {
  const [pacId, setPacId] = useState('');
  const [selPac, setSelPac] = useState<Pac | null>(null);
  const [evols, setEvols] = useState<Evo[]>([]);
  const [texto, setTexto] = useState('');
  const [tipo, setTipo] = useState('Evolução');
  const [busca, setBusca] = useState('');
  const [sugs, setSugs] = useState<Pac[]>([]);
  const refTxt = useRef<HTMLTextAreaElement>(null);

  async function carregar() {
    if (!pacId) return;
    const r = await api.get(`/pacientes/${pacId}/evolucoes`);
    setEvols(r.data.items || []);
  }
  useEffect(() => {
    carregar();
  }, [pacId]);

  useEffect(() => {
    if (!busca || busca.length < 2) {
      setSugs([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const r = await api.get('/pacientes/quick', {
          params: { term: busca },
        });
        setSugs(r.data.items || []);
      } catch {}
    }, 250);
    return () => clearTimeout(t);
  }, [busca]);

  function pick(p: Pac) {
    setSelPac(p);
    setPacId(p.id);
    setBusca(p.nome);
    setSugs([]);
    setTimeout(carregar, 0);
  }

  async function salvar() {
    if (!pacId) return alert('Selecione o paciente');
    if (!texto.trim()) return alert('Texto vazio');
    await api.post(`/pacientes/${pacId}/evolucoes`, { texto, tipo });
    setTexto('');
    setTipo('Evolução');
    carregar();
  }

  async function colarUltima() {
    if (!pacId) return alert('Selecione o paciente');
    const r = await api.get(`/pacientes/${pacId}/evolucoes/last`);
    const it = r.data.item;
    if (!it) return alert('Sem evolução anterior');
    setTexto(
      (texto ? texto + '\n\n' : '') + `[Cópia ${new Date(it.data).toLocaleString()}]\n` + it.texto,
    );
  }

  async function abrir(e: Evo) {
    setTexto(e.texto);
    setTipo(e.tipo || 'Evolução');
  }

  return (
    <div className="card">
      <h3>Prontuários / Evolução</h3>
      <div className="row">
        <div className="autocomplete" style={{ flex: 2, minWidth: 280 }}>
          <input
            placeholder="Buscar paciente (mín. 2 letras)"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          {sugs.length > 0 && (
            <div className="autocomplete-list">
              {sugs.map((p) => (
                <div key={p.id} className="autocomplete-item" onClick={() => pick(p)}>
                  <div>
                    <b>{p.nome}</b>
                    <div className="muted">{p.nascimento}</div>
                  </div>
                  <div className="muted">{p.doc || p.id}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          placeholder="ID Paciente"
          value={pacId}
          onChange={(e) => setPacId(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option>Evolução</option>
          <option>Primeira Consulta Nefrológica</option>
          <option>Hemodiálise</option>
          <option>Intercorrência</option>
        </select>
        <button className="btn btn-primary" onClick={salvar}>
          Finalizar
        </button>
        <button className="btn btn-ghost" onClick={colarUltima}>
          📋 Colar última
        </button>
      </div>

      {selPac && (
        <div style={{ marginTop: 6 }} className="muted">
          Paciente: <b>{selPac.nome}</b> · Nasc.: {selPac.nascimento} · ID: {selPac.id}
        </div>
      )}

      <div className="evo-grid" style={{ marginTop: 12 }}>
        <div className="evo-historico">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Histórico</div>
          {evols.length === 0 && <div className="muted">Sem evoluções.</div>}
          {evols.map((e) => (
            <div key={e.id} className="item" onClick={() => abrir(e)}>
              <div style={{ fontWeight: 600 }}>{new Date(e.data).toLocaleString()}</div>
              <div
                className="muted"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {e.texto}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="evo-editor">
            <textarea
              ref={refTxt}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escreva/cole a evolução (modelo SOAP recomendado)"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
