import { useEffect, useState } from "react";
import { useSecureStore } from "../../stores/secureStore";
import { AnalyticsChart } from "./components/AnalyticsChart";
import { MetricsCard } from "./components/MetricsCard";

export function Analytics() {
  const store = useSecureStore();
  const [metrics, setMetrics] = useState({
    patientMetrics: null,
    consultMetrics: null,
    prescriptionMetrics: null,
  });

  const calculateSecureMetrics = async () => {
    // Criptografar métricas sensíveis
    const encryptedMetrics = await Promise.all([
      calculatePatientMetrics(store.patients),
      calculateConsultMetrics(store.records),
      calculatePrescriptionMetrics(store.prescriptions),
    ]);

    return {
      patientMetrics: encryptedMetrics[0],
      consultMetrics: encryptedMetrics[1],
      prescriptionMetrics: encryptedMetrics[2],
    };
  };

  return (
    <div>
      <AnalyticsChart data={metrics} />
      <MetricsCard metrics={metrics} />
    </div>
  );
}
