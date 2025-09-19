import { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { AppointmentForm } from './components/AppointmentForm';
import { Container } from './styles';

interface Appointment {
  id: string;
  patientId: string;
  date: Date;
  type: 'CONSULT' | 'RETURN' | 'EXAM';
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  encryptedNotes?: string;
}

export function Schedule() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const handleAppointmentCreate = async (appointment: Appointment) => {
    // Validate time slot
    if (!isSlotAvailable(appointment.date)) {
      throw new Error('Horário indisponível');
    }

    // Encrypt appointment data
    const encryptedAppointment = await encryptAppointmentData(appointment);

    // Save and update calendar
    setAppointments((prev) => [...prev, encryptedAppointment]);

    // Notify patient (if configured)
    await sendSecureNotification(appointment);
  };

  return (
    <Container>
      <Calendar appointments={appointments} onSlotSelect={setSelectedSlot} />
      {selectedSlot && (
        <AppointmentForm selectedDate={selectedSlot} onSubmit={handleAppointmentCreate} />
      )}
    </Container>
  );
}
