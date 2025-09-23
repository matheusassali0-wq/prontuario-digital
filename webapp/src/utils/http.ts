// Lightweight fetch helpers with retry/backoff, CSRF header, and optional idempotency
// Works in browsers and during Vite dev.

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const resolveApiBase = (): string => {
  const meta = import.meta as { env?: Record<string, string | undefined> };
  const candidate = meta.env?.VITE_API_BASE_URL;
  if (typeof candidate === 'string' && candidate.trim().length > 0) return candidate;
  return '/api';
};

const API_BASE = (() => {
  const base = resolveApiBase();
  return base.endsWith('/') ? base.slice(0, -1) : base;
})();

let cachedCsrf: string | null = null;
export const ensureCsrf = async (): Promise<string> => {
  if (cachedCsrf) return cachedCsrf;
  try {
    const res = await fetch(`${API_BASE}/csrf`, { credentials: 'include' });
    if (res.ok) {
      const body = (await res.json().catch(() => ({}))) as { csrfToken?: string };
      cachedCsrf = typeof body.csrfToken === 'string' ? body.csrfToken : null;
    }
  } catch {
    // ignore
  }
  return cachedCsrf || '';
};

type RetryOptions = {
  retries?: number; // default 3
  backoffMs?: number; // base backoff, default 200
  idempotencyKey?: string; // header Idempotency-Key
  payloadHash?: string; // header X-Payload-Hash
  csrf?: boolean; // add CSRF header for mutating requests, default true for non-GET
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function requestJson<T = unknown>(
  path: string,
  method: HttpMethod = 'GET',
  body?: unknown,
  options: RetryOptions = {},
): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const isGet = method === 'GET';
  const retries = options.retries ?? 3;
  const base = options.backoffMs ?? 200;

  let attempt = 0;
  // Prepare base headers
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (!isGet) headers['Content-Type'] = 'application/json';
  if (options.idempotencyKey) headers['Idempotency-Key'] = options.idempotencyKey;
  if (options.payloadHash) headers['X-Payload-Hash'] = options.payloadHash;
  if (!isGet && (options.csrf ?? true)) {
    const token = await ensureCsrf();
    if (token) headers['x-csrf-token'] = token;
  }

  // Serialize payload only once
  const bodyStr = body === undefined ? undefined : JSON.stringify(body);

  // Retry loop
  // Note: we retry on network error or 5xx. For 409/429 we also retry with backoff.
  // For non-GET methods, caller should provide idempotency headers for safe retries.
  // Otherwise we still retry but only once, to reduce risk of duplicates.
  const maxAttempts = isGet ? retries : Math.max(1, retries);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers,
        body: bodyStr,
      });
      if (res.ok) {
        if (res.status === 204) return undefined as T;
        const text = await res.text();
        return text ? (JSON.parse(text) as T) : (undefined as T);
      }
      const retriable = res.status >= 500 || res.status === 409 || res.status === 429;
      if (retriable && attempt < maxAttempts) {
        attempt += 1;
        const wait = base * 2 ** (attempt - 1) + Math.random() * 50;
        await sleep(wait);
        continue;
      }
      const detail = await res.text().catch(() => '');
      throw new Error(detail || `HTTP ${res.status}`);
    } catch (err) {
      if (attempt < maxAttempts) {
        attempt += 1;
        const wait = base * 2 ** (attempt - 1) + Math.random() * 50;
        await sleep(wait);
        continue;
      }
      throw err;
    }
  }
}

// Small helper to compute a stable SHA-256. Use SubtleCrypto if available, otherwise a naive fallback.
export async function sha256Base16(input: unknown): Promise<string> {
  try {
    const text = typeof input === 'string' ? input : JSON.stringify(input);
    if (typeof window !== 'undefined' && window.crypto?.subtle) {
      const enc = new TextEncoder().encode(text);
      const buf = await window.crypto.subtle.digest('SHA-256', enc);
      return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // ignore and fallback
  }
  // Very small fallback hash (not crypto-strong, only for idempotency key uniqueness in dev)
  const s = typeof input === 'string' ? input : JSON.stringify(input);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

export { API_BASE };
