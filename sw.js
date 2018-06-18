// SW version
const version = '1.1';

const appAssets = [
  'index.html',
  'main.js',
  'images/flame.png',
  'images/logo.png',
  'images/sync.png',
  'vendor/bootstrap.min.css',
  'vendor/jquery.min.js'
];

// SW install
self.addEventListener('install', e => {
  caches.open(`static-${version}`)
    .then( cache => cache.addAll(appAssets));
});

// SW activate
self.addEventListener('activate', e => {
  // Clean static cache
  let cleaned = caches.keys().then( keys => {
    keys.forEach( key => {
      if ( key !== `static-${version}` && key.match('static-'))
        return caches.delete(key);
    });
  });
  e.waitUntil(cleaned);
});


// Static cache strategy - Cache with Network fallback
const staticCache = (req) => {
  return caches.match(req).then( cachedRes => {

    // Return cached response if found
    if (cachedRes) return cachedRes;

    // Fall back to Network
    return fetch(req).then ( networkRes => {

      // Update cache with Network response
      caches.open(`static-${version}`)
        .then( cache => cache.put( req, networkRes));

      // Return Clone of Network Response
      return networkRes.clone();
    })
  })
}

// SW fetch
self.addEventListener('fetch', e => {

  // App Shell
  if ( e.request.url.match(location.origin)) {
    e.respondWith( staticCache(e.request));
  }
})
