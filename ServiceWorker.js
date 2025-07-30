const cacheName = "do.Games-Space Waves-1.1.5-ms";
const contentToCache = [
    "Build/184f13270996d700497c5009aa1e564a.loader.js",
    "Build/8b0baa9999c6d6c873ea2e6d9fa97649.framework.js.unityweb",
    "Build/2b864b6498b4e5e6895953cfbcc06b40.data.unityweb",
    "Build/444d2972dd3f75d4e53eba894a3a5bd1.wasm.unityweb",
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
