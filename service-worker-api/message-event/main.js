
// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {

  // Register the SW
  navigator.serviceWorker.register('/sw.js').then(function(registration){

    if (registration.active)
      registration.active.postMessage('respond to this');

  }).catch(console.log);

  navigator.serviceWorker.addEventListener('message', (e) => {
    console.log(e.data);
  });
}
