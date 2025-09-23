import {
  bumpRetry,
  countPending,
  enqueue,
  getBatch,
  markDone,
  purgeOldMappings,
  storeIdMapping,
  type EnqueuePayload,
  type OutboxItem,
} from './outbox';
import useOfflineStore from '../stores/offlineStore';

const baseDelay = (() => {
  const raw = (import.meta as { env?: Record<string, string | undefined> }).env
    ?.VITE_OUTBOX_POLL_INTERVAL;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2000;
})();

const RETRY_STEPS = [baseDelay, baseDelay * 2, baseDelay * 4, baseDelay * 8];
let currentDelay = RETRY_STEPS[0];
let timer: number | null = null;
let processing = false;

const notifyPending = async () => {
  try {
    const pending = await countPending();
    useOfflineStore.getState().setPending(pending);
  } catch {
    useOfflineStore.getState().setPending(0);
  }
};

const schedule = (delay = currentDelay) => {
  if (timer) {
    window.clearTimeout(timer);
  }
  timer = window.setTimeout(processQueue, delay);
};

const buildRequestInit = (item: OutboxItem): RequestInit => {
  const headers = new Headers(item.headers ?? {});
  if (!headers.has('Content-Type') && item.body) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('X-Idempotency-Key', item.idempotencyKey);
  return {
    method: item.method,
    body: item.body ?? undefined,
    headers,
    credentials: 'include',
  } satisfies RequestInit;
};

const applyIdMappings = async (item: OutboxItem, responseBody: unknown) => {
  if (!item.clientMappings || Object.keys(item.clientMappings).length === 0) {
    return;
  }
  if (!responseBody || typeof responseBody !== 'object') {
    return;
  }
  const payload = responseBody as Record<string, unknown>;
  const serverId = (payload.item as Record<string, unknown> | undefined)?.id;
  if (typeof serverId !== 'string') return;
  await Promise.all(
    Object.entries(item.clientMappings).map(([clientId, field]) =>
      storeIdMapping(clientId, field === 'self' ? serverId : field),
    ),
  );
};

const processQueue = async () => {
  if (processing) {
    return;
  }
  processing = true;
  useOfflineStore.getState().setSyncing(true);
  try {
    await purgeOldMappings();
    while (navigator.onLine) {
      const batch = await getBatch(5);
      if (!batch.length) {
        currentDelay = RETRY_STEPS[0];
        break;
      }
      let failure = false;
      for (const item of batch) {
        try {
          const response = await fetch(item.url, buildRequestInit(item));
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const text = await response.text();
          const data = text ? JSON.parse(text) : null;
          await applyIdMappings(item, data);
          await markDone(item.id);
          currentDelay = RETRY_STEPS[0];
        } catch (error) {
          await bumpRetry(item.id);
          failure = true;
        }
      }
      await notifyPending();
      if (failure) {
        currentDelay = Math.min(currentDelay * 2, RETRY_STEPS[RETRY_STEPS.length - 1]);
        break;
      }
    }
  } finally {
    processing = false;
    useOfflineStore.getState().setSyncing(false);
    if (navigator.onLine) {
      schedule(currentDelay);
    }
  }
};

export const initOutboxSync = () => {
  if (!('indexedDB' in window)) {
    return;
  }
  notifyPending();
  useOfflineStore.getState().setOnline(navigator.onLine);
  window.addEventListener('online', () => {
    useOfflineStore.getState().setOnline(true);
    schedule(500);
  });
  window.addEventListener('offline', () => {
    useOfflineStore.getState().setOnline(false);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && navigator.onLine) {
      schedule(1000);
    }
  });
  schedule(baseDelay);
};

export const queueMutation = async (
  payload: Omit<EnqueuePayload, 'idempotencyKey'> & { idempotencyKey?: string },
): Promise<OutboxItem> => {
  const idempotencyKey = payload.idempotencyKey ?? crypto.randomUUID();
  const record = await enqueue({ ...payload, idempotencyKey });
  await notifyPending();
  return record;
};

export const flushOutboxNow = () => {
  schedule(0);
};
