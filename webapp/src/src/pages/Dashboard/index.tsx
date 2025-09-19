import { useState, useEffect } from 'react';
import { useSecureStore } from '../../stores/secureStore';
import { MetricCard } from './components/MetricCard';
import { SecurityStatus } from './components/SecurityStatus';
import { Container, Grid, SecurityInfo } from './styles';

export function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalPatients: 0,
    activeConsults: 0,
    pendingExams: 0,
    securityStatus: 'SECURE',
  });

  const store = useSecureStore();

  useEffect(() => {
    // Calculate metrics securely
    const calculateMetrics = async () => {
      setMetrics({
        totalPatients: store.patients.length,
        activeConsults: store.records.filter((r) => r.status === 'ACTIVE').length,
        pendingExams: store.records.filter((r) => r.pendingExams).length,
        securityStatus: await validateSystemSecurity(),
      });
    };

    calculateMetrics();
  }, [store.patients, store.records]);

  return (
    <Container>
      <SecurityInfo>
        <i className="fas fa-shield-alt" />
        Sistema Protegido por Criptografia Quântica
      </SecurityInfo>

      <Grid>
        <MetricCard title="Total de Pacientes" value={metrics.totalPatients} icon="users" />
        <MetricCard title="Consultas Ativas" value={metrics.activeConsults} icon="stethoscope" />
        <MetricCard title="Exames Pendentes" value={metrics.pendingExams} icon="microscope" />
      </Grid>

      <SecurityStatus status={metrics.securityStatus} />
    </Container>
  );
}
