const STATIC_CACHE = 'indi-prontuario-static-v1';
const RUNTIME_CACHE = 'indi-prontuario-runtime-v1';
const OFFLINE_URL = '/offline.html';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  OFFLINE_URL,
  '/app',
  '/app/',
  '/app/index.html',
  '/app/dashboard',
  '/app/pacientes',
  '/app/prontuarios',
  '/app/prescricoes',
  '/app/configuracoes',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch(() => undefined),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const isHtmlNavigation = (request) =>
  request.mode === 'navigate' ||
  (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (url.origin === self.location.origin) {
    if (isHtmlNavigation(request)) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(async () => {
            const cached = await caches.match(request);
            if (cached) {
              return cached;
            }
            const fallback = await caches.match(OFFLINE_URL);
            return fallback || Response.error();
          }),
      );
      return;
    }

    if (url.pathname.startsWith('/api/')) {
      event.respondWith(
        caches.open(RUNTIME_CACHE).then(async (cache) => {
          try {
            const response = await fetch(request);
            cache.put(request, response.clone());
            return response;
          } catch (error) {
            const cached = await cache.match(request);
            if (cached) {
              return cached;
            }
            throw error;
          }
        }),
      );
      return;
    }
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request).catch(() => caches.match(OFFLINE_URL));
    }),
  );
});
