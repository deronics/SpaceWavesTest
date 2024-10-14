const cacheName = "do.Games-Space Waves-1.0";
const contentToCache = [
    "Build/dae5c7bd2b15915f51ae4e56b8f5367d.loader.js",
    "Build/2cf21f4a1a4c1ce948852c99f146fe4d.framework.js.unityweb",
    "Build/9af5f53cd9c4380814a31c3feeb8cf78.data.unityweb",
    "Build/171d39e0fa45338ee04fc0b5368a8b9d.wasm.unityweb",
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
