import { Routes, Route, Navigate } from 'react-router-dom';
import Shell from './layouts/Shell';
import Dashboard from './pages/Dashboard';
import Prontuarios from './pages/Prontuarios';
export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="prontuarios" element={<Prontuarios />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
