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
const staticCache = (req, cacheName = `static-${version}` ) => {
  return caches.match(req).then( cachedRes => {

    // Return cached response if found
    if (cachedRes) return cachedRes;

    // Fall back to Network
    return fetch(req).then ( networkRes => {

      // Update cache with Network response
      caches.open(cacheName)
        .then( cache => cache.put( req, networkRes));

      // Return Clone of Network Response
      return networkRes.clone();
    });
  });
};

// Network with Cache Fallback
const fallbackCache = (req) => {

  // Try Network
  return fetch(req).then(networkRes => {

    // Check res is OK, else go to cache
    if ( !networkRes.ok ) throw 'Fetch Error';

    // Update cache
    caches.open( `static-${version}`)
      .then( cache => cache.put( req, networkRes ));

    // Return Clone of Network Response
    return networkRes.clone();
  })

  // Try cache
  .catch( err => caches.match(req));
};

// Clean old Giphys from the 'giphy' cache
const giphyCacheClean = (giphys) => {

  caches.open('giphy').then( cache => {

    // Get all cache entries
    cache.keys().then( keys => {

      // Loop entries
      keys.forEach( key => {

        // If entry is NOT part of current Giphys, delete
          if ( !giphys.includes(key.url) ) cache.delete(key);
      });
    });
  });
};

// SW fetch
self.addEventListener('fetch', e => {

  // App Shell
  if ( e.request.url.match(location.origin)) {
    e.respondWith( staticCache(e.request));

  // Giphy API
  } else if ( e.request.url.match('api.giphy.com/v1/gifs/trending')) {
    e.respondWith( fallbackCache(e.request));
  } else if ( e.request.url.match('giphy.com/media')) {
    e.respondWith( staticCache(e.request, 'giphy'));
  }
});

// Listen for message from client
self.addEventListener('message', e=> {

  // Identify the message
  if ( e.data.action === 'cleanGiphyCache' ) giphyCacheClean(e.data.giphys);
});
