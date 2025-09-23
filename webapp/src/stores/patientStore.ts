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

const resolveApiBase = (): string => {
  const meta = import.meta as { env?: Record<string, string | undefined> };
  const candidate = meta.env?.VITE_API_BASE_URL;
  if (typeof candidate === 'string' && candidate.trim().length > 0) return candidate;
  // Alinhado com Pacientes.tsx: fallback para /api/v1
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
    credentials: 'include'
  });

  if (!response.ok) {
    let detail: string | undefined;
    try {
      const txt = await response.text();
      detail = txt?.trim() || undefined;
    } catch {
      // ignore
    }
    throw new Error(detail || 'Não foi possível carregar a timeline');
  }

  const payload: unknown = await response.json();
  const items = (payload as { items?: unknown }).items;
  return Array.isArray(items) ? (items as TimelineEvent[]) : [];
};

export const useActivePatientStore = create<ActivePatientState>()((set, get) => ({
  activePatientId: null,
  eventsByPatient: {},
  isLoading: false,
  error: undefined,

  async setActivePatient(id: string | null) {
    set({ activePatientId: id });
    if (!id) {
      set({ isLoading: false, error: undefined });
      return;
    }
    const state = get();
    await state.refreshEvents(id);
  },

  async refreshEvents(id: string) {
    set({ isLoading: true, error: undefined });
    try {
      const events = await fetchEvents(id);
      set((state) => ({
        eventsByPatient: { ...state.eventsByPatient, [id]: events },
        isLoading: false,
        error: undefined
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro desconhecido ao carregar eventos';
      set({ isLoading: false, error: message });
    }
  },

  clearError() {
    set({ error: undefined });
  },

  dropPatientEvents(id: string) {
    set((state) => {
      const next = { ...state.eventsByPatient };
      delete next[id];
      return { eventsByPatient: next };
    });
  }
}));
