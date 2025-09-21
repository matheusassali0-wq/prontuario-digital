import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  PrescriptionItem,
  PrescriptionRecord,
  StatusPayload,
  listPrescriptions,
  loadAuthStatus,
  printPrescription,
  requestAuthorizeUrl,
} from '../services/prescriptions';
import { useActivePatientStore } from '../stores/patientStore';

const emptyItem = (): PrescriptionItem => ({ nome: '', dose: '', via: '', horario: '', observacao: '' });

const formatDateTime = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date);
};

const formatPrintItems = (items: (PrescriptionItem & { ordem: number })[]) =>
  items
    .map(
      (item) => `
        <tr>
          <td>${item.ordem}</td>
          <td>${item.nome}${item.dose ? ` — ${item.dose}` : ''}</td>
          <td>${item.via ?? ''} ${item.horario ?? ''}</td>
          <td>${item.observacao ?? ''}</td>
        </tr>
      `,
    )
    .join('');

const formatPrintItemsA5 = (items: (PrescriptionItem & { ordem: number })[]) =>
  items
    .map((item) => {
      const via = item.via ? `<br /><small>${item.via}</small>` : '';
      const horario = item.horario ? `<br /><small>${item.horario}</small>` : '';
      return `
        <tr>
          <td>${item.ordem}</td>
          <td>${item.nome}${item.dose ? ` — ${item.dose}` : ''}${via}${horario}</td>
        </tr>
      `;
    })
    .join('');

const openPrintWindow = async (record: PrescriptionRecord) => {
  const templatePath = record.formato === 'A5' ? '/assets/print/receita_a5.html' : '/assets/print/receita_a4.html';
  const response = await fetch(templatePath);
  const html = await response.text();
  const filled = html
    .replace(/\{\{NUMERO\}\}/g, String(record.numero))
    .replace(/\{\{PACIENTE\}\}/g, record.pacienteNome)
    .replace(/\{\{DATA\}\}/g, formatDateTime(record.criadoEm))
    .replace(/\{\{CID\}\}/g, record.cid || '—')
    .replace(/\{\{OBSERVACOES\}\}/g, record.observacoes || '—')
    .replace(
      /\{\{ITENS\}\}/g,
      record.formato === 'A5' ? formatPrintItemsA5(record.itens) : formatPrintItems(record.itens),
    );
  const printWindow = window.open('', '_blank', 'noopener');
  if (!printWindow) {
    alert('Permita pop-ups para visualizar a impressão.');
    return;
  }
  printWindow.document.write(filled);
  printWindow.document.close();
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 350);
};

export default function Prescricoes() {
  const { activePatientId } = useActivePatientStore();
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [items, setItems] = useState<PrescriptionItem[]>([emptyItem()]);
  const [format, setFormat] = useState<'A4' | 'A5'>('A4');
  const [cid, setCid] = useState('');
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState<PrescriptionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadAuthStatus()
      .then(setStatus)
      .catch(() => setStatus({ ok: false, online: false, mode: 'print', issuer: null }));
  }, []);

  useEffect(() => {
    if (!activePatientId) {
      setHistory([]);
      return;
    }
    listPrescriptions(activePatientId)
      .then(setHistory)
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar prescrições'));
  }, [activePatientId]);

  const canUseSso = status?.online && status.mode === 'sso_birdid';

  const handleAddItem = () => setItems((current) => [...current, emptyItem()]);
  const handleRemoveItem = (index: number) =>
    setItems((current) => current.filter((_, idx) => idx !== index && (idx !== 0 || current.length > 1)));

  const updateItem = (index: number, field: keyof PrescriptionItem, value: string) => {
    setItems((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    );
  };

  const handlePrint = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activePatientId) {
      setError('Selecione um paciente antes de emitir prescrições.');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const filtered = items.filter((item) =>
        [item.nome, item.dose, item.via, item.horario, item.observacao].some(
          (field) => typeof field === 'string' && field.trim().length > 0,
        ),
      );
      if (filtered.length === 0) {
        setError('Preencha ao menos um item para emitir a prescrição.');
        setIsLoading(false);
        return;
      }
      const record = await printPrescription({
        patientId: activePatientId,
        formato: format,
        cid: cid.trim() || undefined,
        observacoes: notes.trim() || undefined,
        items: filtered,
      });
      setSuccess(`Prescrição nº ${record.numero} emitida com sucesso.`);
      setHistory((current) => [record, ...current]);
      setItems([emptyItem()]);
      setNotes('');
      setCid('');
      setTimeout(() => void openPrintWindow(record), 150);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao emitir a prescrição.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSso = async () => {
    try {
      setError(null);
      if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
        setError('Navegador sem suporte a PKCE. Utilize o fallback de impressão.');
        return;
      }
      const codeVerifier = crypto.randomUUID().replace(/-/g, '');
      const encoder = new TextEncoder();
      const challengeBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(codeVerifier));
      const challengeArray = Array.from(new Uint8Array(challengeBuffer));
      const codeChallenge = btoa(String.fromCharCode(...challengeArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      const state = crypto.randomUUID();
      const payload = await requestAuthorizeUrl({ codeChallenge, state });
      if (!payload.ok) {
        setError('Não foi possível iniciar o login com o Bird ID.');
        return;
      }
      sessionStorage.setItem('birdid:code_verifier', codeVerifier);
      sessionStorage.setItem('birdid:state', state);
      window.location.href = payload.authorizeUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao iniciar o SSO.');
    }
  };

  const statusLabel = useMemo(() => {
    if (!status) return 'Consultando status do Bird ID…';
    if (canUseSso) return 'Bird ID ativo para SSO (Memed).';
    if (status.mode === 'sso_birdid') {
      return 'Configuração Bird ID incompleta. Usando fallback de impressão.';
    }
    return 'Modo impressão manual ativo (Memed desativado).';
  }, [status, canUseSso]);

  return (
    <div className="prescriptions-screen">
      <header className="page-header">
        <div>
          <h1>Prescrições</h1>
          <p>Integração com Bird ID / Memed com fallback de impressão clínica.</p>
        </div>
        <div className={`status-pill ${canUseSso ? 'online' : 'offline'}`}>
          <span className="dot" />
          {canUseSso ? 'Bird ID conectado' : 'Bird ID indisponível'}
        </div>
      </header>

      <section className="card-grid">
        <article className="card">
          <h2>Nova prescrição impressa</h2>
          <p>Preencha os itens abaixo para gerar a receita com numeração sequencial oficial.</p>
          <form className="prescription-form" onSubmit={handlePrint}>
            <div className="field-grid">
              <label>
                Formato
                <select value={format} onChange={(event) => setFormat(event.target.value as 'A4' | 'A5')}>
                  <option value="A4">A4 (consultório)</option>
                  <option value="A5">A5 (talonário)</option>
                </select>
              </label>
              <label>
                CID (opcional)
                <input value={cid} onChange={(event) => setCid(event.target.value)} placeholder="CID-10" />
              </label>
            </div>
            <label>
              Observações gerais
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Orientações adicionais, carimbo, posologia livre"
              />
            </label>

            <fieldset className="items">
              <legend>Itens da prescrição</legend>
              {items.map((item, index) => (
                <div key={`item-${index}`} className="item-row">
                  <input
                    placeholder="Medicamento ou procedimento"
                    value={item.nome}
                    onChange={(event) => updateItem(index, 'nome', event.target.value)}
                  />
                  <input
                    placeholder="Dose"
                    value={item.dose}
                    onChange={(event) => updateItem(index, 'dose', event.target.value)}
                  />
                  <input
                    placeholder="Via"
                    value={item.via}
                    onChange={(event) => updateItem(index, 'via', event.target.value)}
                  />
                  <input
                    placeholder="Horário"
                    value={item.horario}
                    onChange={(event) => updateItem(index, 'horario', event.target.value)}
                  />
                  <input
                    placeholder="Observação"
                    value={item.observacao}
                    onChange={(event) => updateItem(index, 'observacao', event.target.value)}
                  />
                  <button type="button" className="ghost" onClick={() => handleRemoveItem(index)}>
                    Remover
                  </button>
                </div>
              ))}
              <button type="button" className="ghost" onClick={handleAddItem}>
                Adicionar item
              </button>
            </fieldset>

            <footer className="form-actions">
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Emitindo…' : 'Gerar prescrição impressa'}
              </button>
            </footer>
          </form>
        </article>

        <article className="card">
          <h2>Integração Memed (SSO)</h2>
          <p>{statusLabel}</p>
          <button type="button" className="primary" onClick={() => void handleSso()} disabled={!canUseSso}>
            Abrir Memed via Bird ID
          </button>
        </article>
      </section>

      {error && <p className="feedback error">{error}</p>}
      {success && <p className="feedback success">{success}</p>}

      <section className="card">
        <header className="card-header">
          <h2>Histórico de prescrições</h2>
          <p>Listagem das receitas vinculadas ao paciente selecionado.</p>
        </header>
        {!activePatientId && <p className="empty-state">Selecione um paciente na aba Pacientes para visualizar.</p>}
        {activePatientId && history.length === 0 && <p className="empty-state">Nenhuma prescrição emitida ainda.</p>}
        {history.length > 0 && (
          <table className="history-table">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Formato</th>
                <th>Data</th>
                <th>CID</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record.id}>
                  <td>{record.numero}</td>
                  <td>{record.formato}</td>
                  <td>{formatDateTime(record.criadoEm)}</td>
                  <td>{record.cid || '—'}</td>
                  <td>
                    <button type="button" className="ghost" onClick={() => void openPrintWindow(record)}>
                      Imprimir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
