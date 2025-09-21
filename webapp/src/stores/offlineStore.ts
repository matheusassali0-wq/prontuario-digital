import { create } from 'zustand';

type OfflineState = {
  online: boolean;
  pending: number;
  syncing: boolean;
  setOnline: (online: boolean) => void;
  setPending: (pending: number) => void;
  setSyncing: (syncing: boolean) => void;
};

const useOfflineStore = create<OfflineState>((set) => ({
  online: true,
  pending: 0,
  syncing: false,
  setOnline: (online) => set({ online }),
  setPending: (pending) => set({ pending }),
  setSyncing: (syncing) => set({ syncing }),
}));

export default useOfflineStore;
