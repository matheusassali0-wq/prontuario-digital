import { NavLink, Outlet } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/pacientes', label: 'Pacientes' },
  { to: '/prontuarios', label: 'Prontuários' },
  { to: '/prescricoes', label: 'Prescrições' },
  { to: '/configuracoes', label: 'Configurações' },
];

export default function Shell() {
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
                className={({ isActive }) =>
                  isActive ? 'nav-item active' : 'nav-item'
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="topbar-right" aria-live="polite">
          <span className="topbar-pill status-pill">Sistema online</span>
          <span className="topbar-pill version-pill">v0.1.0</span>
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
