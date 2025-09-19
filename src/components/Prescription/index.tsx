import React, { useEffect, useState } from "react";
import { useSecureStore } from "../../stores/secureStore";
import { useSecurity } from "../../hooks/useSecurity";
import { Container, PrescriptionForm, SecurityInfo } from "./styles";

export function DigitalPrescription() {
  const [prescription, setPrescription] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  const { addPrescription, activePatient } = useSecureStore();
  const { validatePrescription, signPrescription } = useSecurity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validatePrescription(prescription);
    if (!isValid) {
      throw new Error("Prescrição inválida");
    }

    const signedPrescription = await signPrescription({
      ...prescription,
      patientId: activePatient?.id,
      timestamp: new Date().toISOString(),
      doctorId: "DR_MATHEUS_ASSALI",
      crmNumber: "CRM_SP_XXXXX",
    });

    await addPrescription(signedPrescription);
  };

  return (
    <Container>
      <SecurityInfo>
        <i className="fas fa-shield-alt" />
        Prescrição Digital Segura - ICP-Brasil
      </SecurityInfo>

      <PrescriptionForm onSubmit={handleSubmit}>
        {/* Form fields */}
      </PrescriptionForm>
    </Container>
  );
}
