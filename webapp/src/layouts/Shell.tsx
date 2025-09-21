import { NavLink, Outlet } from 'react-router-dom';
import useOfflineStore from '../stores/offlineStore';
import { flushOutboxNow } from '../offline/sync';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/pacientes', label: 'Pacientes' },
  { to: '/prontuarios', label: 'Prontuários' },
  { to: '/prescricoes', label: 'Prescrições' },
  { to: '/configuracoes', label: 'Configurações' },
];

export default function Shell() {
  const { online, pending, syncing } = useOfflineStore();
  const pendingLabel = pending > 0 ? `${pending} pendência${pending > 1 ? 's' : ''}` : 'Sem pendências';
  const statusLabel = online ? 'Online' : 'Offline';

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="topbar-left">
          <span className="brand">Prontuário Digital</span>
          <nav className="topbar-nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="topbar-right" aria-live="polite">
          <span
            className={`topbar-pill status-pill ${online ? 'status-online' : 'status-offline'}`}
            title={pendingLabel}
          >
            {statusLabel}
          </span>
          <button
            type="button"
            className="topbar-pill action-pill"
            onClick={() => flushOutboxNow()}
            disabled={pending === 0 && !syncing}
          >
            {syncing ? 'Sincronizando…' : pending > 0 ? pendingLabel : 'Sincronizar' }
          </button>
          <span className="topbar-pill version-pill">v0.1.0</span>
        </div>
      </header>
      {!online && (
        <div className="offline-banner" role="status">
          Modo offline — novos registros serão enviados quando a conexão voltar.
        </div>
      )}
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
