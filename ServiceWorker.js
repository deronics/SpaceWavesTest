const cacheName = "do.Games-Space Waves-1.1.15-ms";
const contentToCache = [
    "Build/d2ab453b101c38d0e73090352dc096a0.loader.js",
    "Build/438b66b1a9f7ec10e3d9204d554b281b.framework.js.unityweb",
    "Build/422a6648ccfa148611fd1ce9615800e4.data.unityweb",
    "Build/29b8886e795652db3702b7c0d7a89a17.wasm.unityweb",
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
