
// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {

  // Register the SW
  navigator.serviceWorker.register('/sw.js', {scope : '/posts'}).then(function(registration){

    console.log('SW Registered');

  }).catch(console.log);

}
