import { useState } from 'react';
import { useSecureStore } from '../../stores/secureStore';
import { ExamForm } from './components/ExamForm';
import { ExamList } from './components/ExamList';
import { Container } from './styles';

interface Exam {
  id: string;
  patientId: string;
  type: string;
  date: Date;
  results: string;
  status: 'PENDING' | 'COMPLETED';
  encryptedData?: string;
}

export function ExamSystem() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const { activePatient, addMedicalRecord } = useSecureStore();

  const handleExamSubmit = async (exam: Exam) => {
    // Encrypt exam data
    const encryptedExam = await encryptExamData(exam);

    // Add to medical record
    await addMedicalRecord({
      type: 'EXAM',
      patientId: activePatient?.id,
      data: encryptedExam,
      timestamp: new Date(),
      signature: await signMedicalRecord(exam),
    });
  };

  return (
    <Container>
      <ExamForm onSubmit={handleExamSubmit} initialData={selectedExam} />
      <ExamList onSelect={setSelectedExam} activePatientId={activePatient?.id} />
    </Container>
  );
}
