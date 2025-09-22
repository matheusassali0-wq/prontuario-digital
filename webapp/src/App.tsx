import { Navigate, Route, Routes } from 'react-router-dom';
import Shell from './layouts/Shell';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Prontuarios from './pages/Prontuarios';
import ProntuarioPrint from './pages/ProntuarioPrint';
import Prescricoes from './pages/Prescricoes';
import Configuracoes from './pages/Configuracoes';
import LegalTermos from './pages/LegalTermos';
import LegalPrivacidade from './pages/LegalPrivacidade';

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="pacientes" element={<Pacientes />} />
        <Route path="prontuarios" element={<Prontuarios />} />
        <Route path="prescricoes" element={<Prescricoes />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="legal/termos" element={<LegalTermos />} />
        <Route path="legal/privacidade" element={<LegalPrivacidade />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/prontuarios/imprimir/:noteId" element={<ProntuarioPrint />} />
    </Routes>
  );
}
