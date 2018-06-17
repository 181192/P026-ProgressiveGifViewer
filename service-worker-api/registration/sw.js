
// Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(new Promise((resolve) => {
    setTimeout(resolve, 5000);
  }))
});

self.addEventListener('activate', () => {
  console.log('SW2 Active');
});
