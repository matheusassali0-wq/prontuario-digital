import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Minimal domain types to satisfy TypeScript; replace or import your real models if available
interface Patient {
  id: string;
  name?: string;
}
interface MedicalRecord {
  id: string;
  patientId: string;
  data?: unknown;
}
interface Prescription {
  id: string;
  patientId: string;
  idempotency?: string;
  medication?: string;
}
interface AuditLog {
  type: string;
  timestamp: string;
  details?: any;
  hash?: string;
}
interface BackupStatus {
  lastBackup: Date | null;
  status: 'idle' | 'success' | 'error';
}
interface AuditEvent {
  type: string;
  details?: any;
}

// Simple JSON-based "encryption" placeholder — replace with your real encryption util
const encryption = {
  async encrypt<T>(value: T): Promise<string> {
    return JSON.stringify(value);
  },
  async decrypt<T>(text: string): Promise<T> {
    return JSON.parse(text) as T;
  },
};

// PersistStorage-compatible wrapper that stores encrypted strings to localStorage
const encryptedLocalStorage = {
  async getItem(name: string) {
    const encrypted = localStorage.getItem(name);
    if (encrypted == null) return null;
    try {
      // stored value is an encrypted string of the raw persist value (which is a string)
      const decrypted = await encryption.decrypt<string>(encrypted);
      return decrypted;
    } catch {
      return null;
    }
  },
  async setItem(name: string, value: string) {
    // value here is a string produced by zustand persist; encrypt before saving
    const encrypted = await encryption.encrypt<string>(value);
    localStorage.setItem(name, encrypted);
  },
  async removeItem(name: string) {
    localStorage.removeItem(name);
  },
};

interface SecureState {
  patients: Patient[];
  records: MedicalRecord[];
  activePatient: Patient | null;
  prescriptions: Prescription[];
  auditLogs: AuditLog[];
  backupStatus: BackupStatus;
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  setActivePatient: (patient: Patient | null) => void;
  addMedicalRecord: (record: MedicalRecord) => void;
  addPrescription: (prescription: Prescription) => Promise<void>;
  generateBackup: () => Promise<string>;
  restoreBackup: (backup: string) => Promise<void>;
  logAuditEvent: (event: AuditEvent) => void;
}

export const useSecureStore = create<SecureState>()(
  persist(
    (set, get) => ({
      patients: [],
      records: [],
      activePatient: null,
      prescriptions: [],
      auditLogs: [],
      backupStatus: { lastBackup: null, status: 'idle' },

      setPatients: (patients) => set({ patients }),
      addPatient: (patient) =>
        set((state) => ({
          patients: [...state.patients, patient],
        })),
      setActivePatient: (patient) => set({ activePatient: patient }),
      addMedicalRecord: (record) =>
        set((state) => ({
          records: [...state.records, record],
        })),

      // Store prescription objects directly (persist layer will encrypt full persisted state)
      addPrescription: async (prescription) => {
        set((state) => ({
          prescriptions: [...state.prescriptions, prescription],
          auditLogs: [
            ...state.auditLogs,
            {
              type: 'PRESCRIPTION_CREATED',
              timestamp: new Date().toISOString(),
              details: { prescriptionId: (prescription as any).id },
            },
          ],
        }));
      },

      generateBackup: async () => {
        const state = get();
        const backup = {
          patients: state.patients,
          records: state.records,
          prescriptions: state.prescriptions,
          timestamp: new Date().toISOString(),
        };

        const encryptedBackup = await encryption.encrypt(backup);
        set({ backupStatus: { lastBackup: new Date(), status: 'success' } });

        return encryptedBackup;
      },

      restoreBackup: async (backup) => {
        try {
          const decrypted = await encryption.decrypt<any>(backup);
          set({
            patients: decrypted.patients ?? [],
            records: decrypted.records ?? [],
            prescriptions: decrypted.prescriptions ?? [],
            auditLogs: [
              ...get().auditLogs,
              {
                type: 'BACKUP_RESTORED',
                timestamp: new Date().toISOString(),
              },
            ],
          });
        } catch (error) {
          set({ backupStatus: { lastBackup: null, status: 'error' } });
          throw new Error('Backup restoration failed');
        }
      },

      logAuditEvent: (event) =>
        set((state) => ({
          auditLogs: [
            ...state.auditLogs,
            {
              ...event,
              timestamp: new Date().toISOString(),
              hash:
                typeof crypto !== 'undefined' && (crypto as any).randomUUID
                  ? (crypto as any).randomUUID()
                  : Math.random().toString(36).slice(2),
            },
          ],
        })),
    }),
    {
      name: 'medical-storage',
      // cast to any so the Persist middleware typing is satisfied; storage implements getItem/setItem/removeItem
      storage: encryptedLocalStorage as any,
      partialize: (state) =>
        ({
          patients: state.patients,
          records: state.records,
          prescriptions: state.prescriptions,
        }) as Partial<SecureState>,
    },
  ),
);
