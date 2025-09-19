import { NavLink, Outlet } from 'react-router-dom';
export default function Shell() {
  return (
    <div className="layout">
      <div className="topbar">
        <div className="brand">🩺 Prontuário — Consultório</div>
        <div className="status">
          <span className="chip">IA: local</span>
        </div>
      </div>
      <aside className="sidebar">
        <nav className="nav">
          <NavLink to="/" end>
            🏠 Dashboard
          </NavLink>
          <NavLink to="/prontuarios">📄 Prontuários</NavLink>
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
