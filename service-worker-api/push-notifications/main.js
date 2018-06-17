
// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
// if (navigator.serviceWorker) {
  // Register the SW
  // navigator.serviceWorker.register('/sw.js').then(function(registration){
  // }).catch(console.log);
// }


if (window.Notification) {
  function showNotification() {
    let notificationOpts = {
      body: 'Some notification information.',
      icon: '/icon.png'
    }
    let n = new Notification('My new Notification', notificationOpts);

    n.onclick = () => {
      console.log('Notification Clicked');
    }
  }

  // Manage permissions
  if (Notification.permissions === 'granted') {
    showNotification();
  } else if (Notification.permissions !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        showNotification();
      }
    });
  }
}
