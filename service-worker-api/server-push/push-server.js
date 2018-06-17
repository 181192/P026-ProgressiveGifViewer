const webpush = require('web-push');
const vapid = require('./vapid.json');

webpush.setVapidDetails(
  'mailto:kalliainen.k@gmail.com',
  vapid.publicKey,
  vapid.privateKey
);

const pushSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/ePXZwii8RDo:APA91bGkweOJ2EhAdKv7kQn7WEz8ZluCYEJBaVh8D7F_7D9Tlv7pOP6PLLZQE95KluyzuCLEXwVoVLAA-oNOuXg7cTFUWxLtEk78I7ao4I7tbklrMrgyQp6CiK-c1U3EBQ4iixpwEscD",
  keys: {
    auth: "Jv2Z2kT0PSjpVwgTGAQIcg==",
    p256dh: "BCAOF4JQc_nLtSr78gyBU-OYeWBkCw3r-mt5vpBbfk91gFidGC4pZDS-EhdccAf34RlpupO0n297DBdIv358F68="
  }
};

webpush.sendNotification(pushSubscription, 'A notification from the push server');
console.log('Push sent to client');
