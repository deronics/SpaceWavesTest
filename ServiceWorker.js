const cacheName = "do.Games-Space Waves-1.1.4-preview";
const contentToCache = [
    "Build/3a2bee3c3f50c1e448261d25db4d7577.loader.js",
    "Build/e09b9f9b97a7c7d3096fac4ce3f7cc91.framework.js.unityweb",
    "Build/09ff88ceb758a17d2254c55e8c449080.data.unityweb",
    "Build/16e727ffe436db8adc7707f83ada2326.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
