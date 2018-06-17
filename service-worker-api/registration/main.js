
// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {

  // Register the SW
  navigator.serviceWorker.register('/sw.js').then(function(registration){

    registration.onupdatefound = () => {
      console.log("New SW Found");
      let newSW = registration.installing;

      newSW.onstatechange = () => {
        console.log(newSW.state);
      }
    };

  }).catch(console.log);

}
