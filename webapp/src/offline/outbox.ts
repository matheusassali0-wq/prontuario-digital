const DB_NAME = 'indi-prontuario-offline';
const DB_VERSION = 1;
const OUTBOX_STORE = 'outbox';
const IDMAP_STORE = 'idmap';

export type OutboxItem = {
  id: string;
  method: string;
  url: string;
  body?: string | null;
  headers?: Record<string, string>;
  createdAt: number;
  tries: number;
  idempotencyKey: string;
  lastTriedAt?: number;
  clientMappings?: Record<string, string>;
};

export type EnqueuePayload = Omit<OutboxItem, 'tries' | 'createdAt' | 'id'> & {
  id?: string;
  createdAt?: number;
};

export type IdMapEntry = {
  clientId: string;
  serverId: string;
  updatedAt: number;
};

const openDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(OUTBOX_STORE)) {
        const store = db.createObjectStore(OUTBOX_STORE, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
      if (!db.objectStoreNames.contains(IDMAP_STORE)) {
        db.createObjectStore(IDMAP_STORE, { keyPath: 'clientId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('indexedDB unavailable'));
  });

const runTransaction = async <T>(
  storeName: typeof OUTBOX_STORE | typeof IDMAP_STORE,
  mode: IDBTransactionMode,
  handler: (store: IDBObjectStore) => Promise<T>,
): Promise<T> => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    handler(store).then(resolve).catch(reject);
    tx.oncomplete = () => db.close();
    tx.onerror = () => reject(tx.error ?? new Error('transaction failed'));
  });
};

const getValue = <T>(store: IDBObjectStore, key: IDBValidKey): Promise<T | undefined> =>
  new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result as T | undefined);
    request.onerror = () => reject(request.error ?? new Error('get failed'));
  });

export const enqueue = async (payload: EnqueuePayload): Promise<OutboxItem> => {
  const id = payload.id ?? crypto.randomUUID();
  const createdAt = payload.createdAt ?? Date.now();
  const item: OutboxItem = {
    id,
    method: payload.method,
    url: payload.url,
    body: payload.body ?? null,
    headers: payload.headers ?? {},
    createdAt,
    tries: 0,
    idempotencyKey: payload.idempotencyKey,
    clientMappings: payload.clientMappings ?? undefined,
  };

  await runTransaction(OUTBOX_STORE, 'readwrite', async (store) => {
    await store.put(item);
  });

  return item;
};

export const getBatch = async (limit = 5): Promise<OutboxItem[]> =>
  runTransaction(
    OUTBOX_STORE,
    'readonly',
    async (store) =>
      new Promise<OutboxItem[]>((resolve, reject) => {
        const results: OutboxItem[] = [];
        const index = store.index('createdAt');
        const cursorRequest = index.openCursor();
        cursorRequest.onsuccess = () => {
          const cursor = cursorRequest.result;
          if (!cursor || results.length >= limit) {
            resolve(results);
            return;
          }
          results.push(cursor.value as OutboxItem);
          cursor.continue();
        };
        cursorRequest.onerror = () => reject(cursorRequest.error ?? new Error('cursor failed'));
      }),
  );

export const markDone = async (id: string): Promise<void> => {
  await runTransaction(OUTBOX_STORE, 'readwrite', async (store) => {
    await store.delete(id);
  });
};

export const bumpRetry = async (id: string): Promise<void> => {
  await runTransaction(OUTBOX_STORE, 'readwrite', async (store) => {
    const record = await getValue<OutboxItem>(store, id);
    if (!record) return;
    record.tries += 1;
    record.lastTriedAt = Date.now();
    await store.put(record);
  });
};

export const countPending = async (): Promise<number> =>
  runTransaction(
    OUTBOX_STORE,
    'readonly',
    async (store) =>
      new Promise<number>((resolve, reject) => {
        const countRequest = store.count();
        countRequest.onsuccess = () => resolve(countRequest.result ?? 0);
        countRequest.onerror = () => reject(countRequest.error ?? new Error('count failed'));
      }),
  );

export const clearOutbox = async (): Promise<void> => {
  await runTransaction(OUTBOX_STORE, 'readwrite', async (store) => {
    await store.clear();
  });
};

export const storeIdMapping = async (clientId: string, serverId: string): Promise<void> => {
  await runTransaction(IDMAP_STORE, 'readwrite', async (store) => {
    await store.put({ clientId, serverId, updatedAt: Date.now() } satisfies IdMapEntry);
  });
};

export const getServerId = async (clientId: string): Promise<string | null> =>
  runTransaction(IDMAP_STORE, 'readonly', async (store) => {
    const entry = await getValue<IdMapEntry>(store, clientId);
    return entry?.serverId ?? null;
  });

export const purgeOldMappings = async (maxAgeHours = 72): Promise<void> => {
  const threshold = Date.now() - maxAgeHours * 60 * 60 * 1000;
  await runTransaction(IDMAP_STORE, 'readwrite', async (store) => {
    const cursorRequest = store.openCursor();
    cursorRequest.onsuccess = () => {
      const cursor = cursorRequest.result;
      if (!cursor) return;
      const value = cursor.value as IdMapEntry;
      if (value.updatedAt < threshold) {
        cursor.delete();
      }
      cursor.continue();
    };
  });
};
