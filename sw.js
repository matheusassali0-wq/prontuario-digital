"use strict";

// Usar timestamp para evitar cache persistente
const CACHE = "nsa-secure-v3-" + Date.now();
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./print.css",
  "./app.js",
  "./manifest.json",
  "./icon.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Sempre revalidar dados dinâmicos
  if (url.pathname.includes("/api/") || url.pathname.includes("/patient/")) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          return response;
        })
        .catch(() => caches.match(e.request)),
    );
    return;
  }

  // Cache-first para assets estáticos
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request)),
  );
});
