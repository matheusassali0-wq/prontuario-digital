import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PatientTag = {
  id: string;
  label: string;
};

export type Patient = {
  id: string;
  name: string;
  document: string;
  birthDate: string;
  contact: string;
  insurance: string;
  allergies: PatientTag[];
  notes?: string;
  lastVisit?: string;
  nextAppointment?: string;
  createdAt: string;
  updatedAt: string;
};

export type TimelineEvent = {
  id: string;
  patientId: string;
  type: 'consulta' | 'exame' | 'prescricao' | 'atualizacao' | 'cadastro';
  title: string;
  description: string;
  timestamp: string;
};

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);

const createTag = (label: string): PatientTag => ({ id: generateId(), label });

const seedPatients: Patient[] = [
  {
    id: 'pt-001',
    name: 'Aline Carvalho',
    document: 'INDI-0001',
    birthDate: '1985-04-12',
    contact: '(11) 99845-2211',
    insurance: 'INDI Saúde Premium',
    allergies: [createTag('Dipirona'), createTag('Látex')],
    notes: 'Paciente em acompanhamento para hipertensão controlada.',
    lastVisit: '2024-08-21T14:30:00-03:00',
    nextAppointment: '2024-12-02T09:00:00-03:00',
    createdAt: '2023-02-10T10:15:00-03:00',
    updatedAt: '2024-08-21T14:30:00-03:00',
  },
  {
    id: 'pt-002',
    name: 'Ricardo Santos',
    document: 'INDI-0002',
    birthDate: '1976-09-03',
    contact: '(11) 91234-7788',
    insurance: 'Saúde Vida Plus',
    allergies: [createTag('Iodo')],
    notes: 'Realizou check-up completo há 6 meses. Solicitar exames laboratoriais.',
    lastVisit: '2024-09-14T16:00:00-03:00',
    nextAppointment: '2024-11-20T11:30:00-03:00',
    createdAt: '2022-11-18T08:45:00-03:00',
    updatedAt: '2024-09-14T16:00:00-03:00',
  },
];

const seedTimeline: Record<string, TimelineEvent[]> = {
  'pt-001': [
    {
      id: generateId(),
      patientId: 'pt-001',
      type: 'cadastro',
      title: 'Paciente cadastrado',
      description: 'Cadastro inicial realizado via recepção.',
      timestamp: '2023-02-10T10:15:00-03:00',
    },
    {
      id: generateId(),
      patientId: 'pt-001',
      type: 'consulta',
      title: 'Evolução · Controle pressão',
      description: 'Ajuste na medicação anti-hipertensiva e orientações de dieta.',
      timestamp: '2024-08-21T14:30:00-03:00',
    },
    {
      id: generateId(),
      patientId: 'pt-001',
      type: 'prescricao',
      title: 'Prescrição digital renovada',
      description: 'Renovação de losartana 50 mg e hidroclorotiazida 25 mg.',
      timestamp: '2024-08-21T14:45:00-03:00',
    },
  ],
  'pt-002': [
    {
      id: generateId(),
      patientId: 'pt-002',
      type: 'cadastro',
      title: 'Paciente cadastrado',
      description: 'Cadastro realizado com importação de histórico clínico.',
      timestamp: '2022-11-18T08:45:00-03:00',
    },
    {
      id: generateId(),
      patientId: 'pt-002',
      type: 'exame',
      title: 'Pedidos de exames rotina',
      description: 'Solicitado perfil lipídico e hemoglobina glicada.',
      timestamp: '2024-03-05T09:10:00-03:00',
    },
  ],
};

interface PatientState {
  patients: Patient[];
  activePatientId: string | null;
  timeline: Record<string, TimelineEvent[]>;
  addPatient: (payload: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => Patient;
  updatePatient: (id: string, updates: Partial<Omit<Patient, 'id' | 'createdAt'>>) => void;
  deletePatient: (id: string) => void;
  setActivePatient: (id: string | null) => void;
  addTimelineEvent: (patientId: string, event: Omit<TimelineEvent, 'id'>) => void;
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set, get) => ({
      patients: seedPatients,
      activePatientId: seedPatients[0]?.id ?? null,
      timeline: seedTimeline,

      addPatient: (payload) => {
        const now = new Date().toISOString();
        const id = payload.id ?? generateId();
        const patient: Patient = {
          ...payload,
          id,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          patients: [...state.patients, patient],
          activePatientId: id,
          timeline: {
            ...state.timeline,
            [id]: [
              ...(state.timeline[id] ?? []),
              {
                id: generateId(),
                patientId: id,
                type: 'cadastro',
                title: 'Paciente cadastrado',
                description: 'Cadastro criado via Prontuário Digital INDI.',
                timestamp: now,
              },
            ],
          },
        }));

        return patient;
      },

      updatePatient: (id, updates) => {
        const now = new Date().toISOString();
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.id === id
              ? {
                  ...patient,
                  ...updates,
                  updatedAt: now,
                }
              : patient,
          ),
          timeline: {
            ...state.timeline,
            [id]: [
              ...(state.timeline[id] ?? []),
              {
                id: generateId(),
                patientId: id,
                type: 'atualizacao',
                title: 'Dados do paciente atualizados',
                description: 'Alteração de dados cadastrais registrada automaticamente.',
                timestamp: now,
              },
            ],
          },
        }));
      },

      deletePatient: (id) => {
        set((state) => {
          const { [id]: _, ...restTimeline } = state.timeline;
          const remaining = state.patients.filter((patient) => patient.id !== id);
          const newActive = state.activePatientId === id ? remaining[0]?.id ?? null : state.activePatientId;

          return {
            patients: remaining,
            activePatientId: newActive,
            timeline: restTimeline,
          };
        });
      },

      setActivePatient: (id) => set({ activePatientId: id }),

      addTimelineEvent: (patientId, event) => {
        set((state) => ({
          timeline: {
            ...state.timeline,
            [patientId]: [
              ...(state.timeline[patientId] ?? []),
              {
                ...event,
                id: generateId(),
              },
            ],
          },
        }));
      },
    }),
    {
      name: 'indi-patient-store',
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        patients: state.patients,
        activePatientId: state.activePatientId,
        timeline: state.timeline,
      }),
    },
  ),
);
