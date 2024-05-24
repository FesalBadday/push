// service-worker.js

self.addEventListener('push', function (event) {
  console.log('Push event received:', event);

  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Default body',
    icon: data.icon || 'icon.png',
    badge: data.badge || 'badge.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Default title', options)
  );

  // Send a message to all clients to play the sound
  self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      console.log('Sending message to client:', client);
      client.postMessage({
        action: 'playSound',
        soundUrl: 'notification-sound.mp3'
      });
    });
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || 'https://fesal.me/push/')
  );
});
