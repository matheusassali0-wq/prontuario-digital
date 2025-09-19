import { create } from 'zustand';

export type TimelineEvent = {
  id: string;
  patientId: string;
  type: string;
  createdAt: string;
  hashPrev: string | null;
  payload: Record<string, unknown> | null;
};

interface ActivePatientState {
  activePatientId: string | null;
  eventsByPatient: Record<string, TimelineEvent[]>;
  isLoading: boolean;
  error?: string;
  setActivePatient: (id: string | null) => Promise<void>;
  refreshEvents: (id: string) => Promise<void>;
  clearError: () => void;
  dropPatientEvents: (id: string) => void;
}

const resolveApiBase = () => {
  const meta = import.meta as { env?: Record<string, string | undefined> };
  const candidate = meta.env?.VITE_API_BASE_URL;
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate;
  }
  return '/api/v1';
};

const buildUrl = (path: string) => {
  const base = resolveApiBase();
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${normalizedBase}${path}`;
};

const fetchEvents = async (patientId: string): Promise<TimelineEvent[]> => {
  const response = await fetch(buildUrl(`/patients/${patientId}/events`), {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(detail || 'Não foi possível carregar a timeline');
  }

  const payload = (await response.json()) as { items?: TimelineEvent[] };
  return Array.isArray(payload.items) ? payload.items : [];
};

export const useActivePatientStore = create<ActivePatientState>((set, get) => ({
  activePatientId: null,
  eventsByPatient: {},
  isLoading: false,
  error: undefined,
  async setActivePatient(id) {
    set({ activePatientId: id });
    if (!id) {
      set({ isLoading: false, error: undefined });
      return;
    }
    await get().refreshEvents(id);
  },
  async refreshEvents(id) {
    set({ isLoading: true, error: undefined });
    try {
      const events = await fetchEvents(id);
      set((state) => ({
        eventsByPatient: { ...state.eventsByPatient, [id]: events },
        isLoading: false,
        error: undefined,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido ao carregar eventos',
      });
    }
  },
  clearError() {
    set({ error: undefined });
  },
  dropPatientEvents(id) {
    set((state) => {
      const next = { ...state.eventsByPatient };
      delete next[id];
      return { eventsByPatient: next };
    });
  },
}));
