// serviceWorker

self.addEventListener('fetch', (e) => {

  // if (e.request.url.endsWith('style.css')) {
  //   e.respondWith( fetch('./style2.css'))
  // }

  // if (e.request.url.endsWith('/greet')) {
  //   let headers = new Headers({'Content-Type': 'text/html'})
  //   let customRes = new Response('<h1>Hello World</h1>', {
  //     headers: headers
  //   });
  //
  //   e.respondWith(customRes);
  // }

  if ( e.request.url.endsWith('/camera_feed.html')) {
    e.respondWith(
      fetch(e.request)
      .then((res) => {
        if (res.ok) return res;

        return new Response('Camera feed currently not available')
      })
    )
  }
});
