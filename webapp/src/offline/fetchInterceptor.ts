import { queueMutation } from './sync';
import useOfflineStore from '../stores/offlineStore';

type OptimisticResponse = {
  body: string;
  clientMappings?: Record<string, string>;
};

const METHODS_WITH_BODY = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

const parseBody = async (body: BodyInit | null | undefined): Promise<string | null> => {
  if (!body) return null;
  if (typeof body === 'string') return body;
  if (body instanceof Blob) {
    return await body.text();
  }
  if (body instanceof ArrayBuffer) {
    return new TextDecoder().decode(body);
  }
  if (body instanceof FormData) {
    const obj: Record<string, unknown> = {};
    body.forEach((value, key) => {
      obj[key] = value;
    });
    return JSON.stringify(obj);
  }
  try {
    return JSON.stringify(body as unknown);
  } catch {
    return null;
  }
};

const buildOptimisticPayload = (
  path: string,
  method: string,
  body: string | null,
): OptimisticResponse | null => {
  if (!body) {
    return null;
  }
  try {
    const parsed = JSON.parse(body) as Record<string, unknown>;
    if (method === 'POST' && path === '/api/pacientes') {
      const clientId = `cid-${crypto.randomUUID()}`;
      const now = new Date().toISOString();
      const item = {
        id: clientId,
        name: (parsed.name as string) ?? 'Paciente',
        document: (parsed.document as string) ?? null,
        birthDate: (parsed.birthDate as string) ?? null,
        contact: parsed.contactJson ?? null,
        payer: (parsed.payer as string) ?? null,
        allergies: (parsed.allergies as string[]) ?? [],
        tags: (parsed.tags as string[]) ?? [],
        createdAt: now,
        updatedAt: now,
        pending: true,
      };
      return {
        body: JSON.stringify({ ok: true, queued: true, item }),
        clientMappings: { [clientId]: 'self' },
      };
    }
    if (method === 'POST' && path.match(/\/api\/pacientes\/.+\/evolucoes$/)) {
      const clientId = `cid-${crypto.randomUUID()}`;
      const now = new Date().toISOString();
      const item = {
        id: clientId,
        texto: parsed.texto ?? '',
        tipo: parsed.tipo ?? 'Evolução',
        data: parsed.data ?? now,
        pending: true,
      };
      return {
        body: JSON.stringify({ ok: true, queued: true, item }),
        clientMappings: { [clientId]: 'self' },
      };
    }
    if (method === 'POST' && path === '/api/prescricoes/print') {
      const clientId = `cid-${crypto.randomUUID()}`;
      const item = {
        id: clientId,
        numero: null,
        pacienteId: parsed.pacienteId,
        criadoEm: new Date().toISOString(),
        itens: parsed.items,
        formato: parsed.formato ?? 'A4',
        pending: true,
      };
      return {
        body: JSON.stringify({ ok: true, queued: true, item }),
        clientMappings: { [clientId]: 'self' },
      };
    }
  } catch {
    return null;
  }
  return null;
};

export const installFetchInterceptor = () => {
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
    return;
  }
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const method = (init?.method ?? 'GET').toUpperCase();
    const requestUrl =
      typeof input === 'string' || input instanceof URL ? input.toString() : input.url;
    const url = new URL(requestUrl, window.location.origin);
    const headers = new Headers(
      init?.headers ?? (input instanceof Request ? input.headers : undefined),
    );
    const isMutation = METHODS_WITH_BODY.has(method);

    if (!isMutation) {
      try {
        return await originalFetch(input, init);
      } catch (error) {
        if (url.pathname.startsWith('/api/')) {
          const cached = await caches.match(url.pathname);
          if (cached) {
            return cached;
          }
        }
        throw error;
      }
    }

    const bodyString = await parseBody(init?.body ?? null);
    const absoluteUrl = url.toString();
    const optimistic = buildOptimisticPayload(url.pathname, method, bodyString);
    const idempotencyKey = headers.get('X-Idempotency-Key') ?? crypto.randomUUID();
    headers.set('X-Idempotency-Key', idempotencyKey);

    const headerObject: Record<string, string> = {};
    headers.forEach((value, key) => {
      headerObject[key] = value;
    });

    const queuePayload = {
      method,
      url: absoluteUrl,
      body: bodyString,
      headers: headerObject,
      clientMappings: optimistic?.clientMappings,
    } as const;

    if (!navigator.onLine) {
      await queueMutation(queuePayload);
      useOfflineStore.getState().setOnline(false);
      if (optimistic) {
        return new Response(optimistic.body, {
          status: 202,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ ok: true, queued: true }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const response = await originalFetch(input, {
        ...init,
        headers,
        body: bodyString ?? init?.body,
      });
      if (!response.ok && response.status >= 500) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response;
    } catch (error) {
      await queueMutation(queuePayload);
      useOfflineStore.getState().setOnline(false);
      if (optimistic) {
        return new Response(optimistic.body, {
          status: 202,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ ok: true, queued: true }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
};
