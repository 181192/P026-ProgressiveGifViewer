
// Service Worker

const pwaCache = 'pwa-cache-2';

let cacheReady = self.addEventListener('install', (e) => {
  caches.open(pwaCache).then((cache) => {
    console.log('New cache ready');
    return cache.addAll([
      '/',
      'style.css',
      'thumb.png',
      'main.js'
    ]);
  });

  e.waitUntil(cacheReady);
});

self.addEventListener('activate', (e) => {
  let cacheCleaned = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== pwaCache) return caches.delete(key);
    });
  });

  e.waitUntil(cacheCleaned);
});

self.addEventListener('fetch', (e) => {
  if (!e.request.url.match(location.origin)) return;

  let newRes = caches.open(pwaCache).then((cache) => {
      return cache.match(e.request).then((res) => {
        if (res) {
          console.log('Serving ${res.url} from cache.');
          return res;
        }

        return fetch(e.request).then((fetchRes) => {
          cache.put(e.request, fetchRes.clone());
          return fetchRes;
        })
      });
  });

    e.respondWith(newRes);
});
