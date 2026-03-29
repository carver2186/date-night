// Atlanta Date Night — Service Worker
// Cache-first strategy for the app shell (local files only)

const CACHE_NAME = 'atlanta-date-night-v2';

const APP_SHELL = [
    './index.html',
    './gift-ideas.html',
    './manifest.json',
    './gift-manifest.json',
    './icon-192.png',
    './icon-512.png',
  ];

// — Install: pre-cache the app shell ————————————————————————
self.addEventListener('install', event => {
    event.waitUntil(
          caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
        );
    self.skipWaiting();
});

// — Activate: delete any old caches ————————————————————————
self.addEventListener('activate', event => {
    event.waitUntil(
          caches.keys().then(keys =>
                  Promise.all(
                            keys
                              .filter(key => key !== CACHE_NAME)
                              .map(key => caches.delete(key))
                          )
                                 )
        );
    self.clients.claim();
});

// — Fetch: serve from cache, fall back to network ———————————
self.addEventListener('fetch', event => {
    // Only handle same-origin requests
                        if (!event.request.url.startsWith(self.location.origin)) return;

                        event.respondWith(
                              caches.match(event.request).then(cached => {
                                      return cached || fetch(event.request).then(response => {
                                                // Cache successful GET responses for local assets
                                                                                         if (event.request.method === 'GET' && response.status === 200) {
                                                                                                     const clone = response.clone();
                                                                                                     caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                                                                                         }
                                                return response;
                                      });
                              })
                            );
});
