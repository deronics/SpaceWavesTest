const cacheName = "do.Games-Space Waves-1.0-preview";
const contentToCache = [
    "Build/dae5c7bd2b15915f51ae4e56b8f5367d.loader.js",
    "Build/aaa5936fb06815d56cbd6de4e5bee7a1.framework.js.unityweb",
    "Build/ff72c2ee999cee7245e7af63c5f31eb9.data.unityweb",
    "Build/6b7309af8312e2df7e88ff6a0b08d88b.wasm.unityweb",
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
