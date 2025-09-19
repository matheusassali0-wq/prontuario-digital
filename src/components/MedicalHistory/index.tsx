import { useEffect, useState } from "react";
import { useSecureStore } from "../../stores/secureStore";
import { Timeline } from "./components/Timeline";
import { Container, SecurityBadge } from "./styles";
import React from "react";
import React from "react";
import React from "react";
import React from "react";

interface HistoryEntry {
  id: string;
  type: "CONSULT" | "EXAM" | "PRESCRIPTION";
  date: Date;
  encryptedData: string;
  signature: string;
}

export function MedicalHistory() {
  const { activePatient, records } = useSecureStore();
  const [decryptedHistory, setDecryptedHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (!activePatient) return;

    const loadHistory = async () => {
      // Decrypt patient history
      const history = await Promise.all(
        records
          .filter(
            (r: { patientId: any }): { patientId: any } =>
              r.patientId === activePatient.id,
          )
          .map(
            async (
              record:
                | { encryptedData: any }
                | PromiseLike<{ encryptedData: any }>,
            ): Promise<{ encryptedData: any }> => ({
              ...record,
              decryptedData: await decryptMedicalRecord(record.encryptedData),
            }),
          ),
      );

      setDecryptedHistory(history);
    };

    loadHistory();
  }, [activePatient, records]);

  return (
    <Container>
      <SecurityBadge>
        <i className="fas fa-lock" />
        Histórico Criptografado E2E
      </SecurityBadge>

      <Timeline entries={decryptedHistory} />
    </Container>
  );
}

function decryptMedicalRecord(encryptedData: any) {
  throw new Error("Function not implemented.");
}
