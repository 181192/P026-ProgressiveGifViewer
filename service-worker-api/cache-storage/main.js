
// Progressive Enhancement (SW supported)
// // if ('serviceWorker' in navigator) {
// if (navigator.serviceWorker) {
//   // Register the SW
//   navigator.serviceWorker.register('/sw.js').then((registration) => {
//   }).catch(console.log);
// }

if (window.caches) {
  caches.open('pwa-v1.1').then((cache) => {
    cache.keys().then(console.log);
  });
}
