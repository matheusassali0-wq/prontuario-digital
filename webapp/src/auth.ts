import { create } from 'zustand';
type User = { id: string; email: string; name: string; role: string };
type S = {
  token: string | null;
  user: User | null;
  setAuth: (t: string, u: User) => void;
  clear: () => void;
};
const useAuth = create<S>((set) => ({
  token: localStorage.getItem('tk'),
  user: JSON.parse(localStorage.getItem('usr') || 'null'),
  setAuth: (t, u) => {
    localStorage.setItem('tk', t);
    localStorage.setItem('usr', JSON.stringify(u));
    set({ token: t, user: u });
  },
  clear: () => {
    localStorage.removeItem('tk');
    localStorage.removeItem('usr');
    set({ token: null, user: null });
  },
}));
export default useAuth;
