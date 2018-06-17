
// Service Worker

self.addEventListener('message', (e) => {
  self.clients.matchAll().then((clients) => {

    console.log(e);

    clients.forEach((client) => {

      if (e.source.id === client.id) {

        client.postMessage("Private hello from Service Worker");
      }
    });
  });
});
