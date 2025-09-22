import axios from 'axios';

const DEFAULT_BASE = 'http://127.0.0.1:3030/api/v1';

const resolveBaseUrl = () => {
  const envBase = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_BASE : undefined;
  if (envBase) {
    return envBase.replace(/\/$/, '');
  }
  if (typeof window === 'undefined') {
    return DEFAULT_BASE;
  }
  if (window.location.port === '5173') {
    return DEFAULT_BASE;
  }
  return `${window.location.origin}/api/v1`;
};

const api = axios.create({
  baseURL: resolveBaseUrl(),
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    ?.split(';')
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.split('=')[1] ?? '');
};

api.interceptors.request.use((config) => {
  const headers = config.headers ?? {};
  const role = window?.localStorage?.getItem('pd-role') ?? 'Admin';
  const userId = window?.localStorage?.getItem('pd-user') ?? 'admin@clinic.local';
  headers['x-user-role'] = role;
  headers['x-user-id'] = userId;
  if (config.method && !['get', 'head', 'options'].includes(config.method.toLowerCase())) {
    const csrf = getCookie('csrf');
    if (csrf) {
      headers['x-csrf-token'] = csrf;
    }
  }
  config.headers = headers;
  config.withCredentials = true;
  return config;
});

export default api;
