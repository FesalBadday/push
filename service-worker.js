// service-worker.js

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const options = {
      body: data.body || 'Default body',
      icon: data.icon || 'icon.png',
      badge: data.badge || 'badge.png'
  };

  event.waitUntil(
      self.registration.showNotification(data.title || 'Default title', options)
  );

  event.waitUntil(
      (async function() {
          const clients = await self.clients.matchAll();
          if (clients.length === 0) {
              // If there are no active clients, play sound
              const soundUrl = 'notification-sound.mp3';
              const audio = new Audio(soundUrl);
              audio.play();
          } else {
              // Send a message to clients to play sound
              clients.forEach(client => {
                  client.postMessage({
                      action: 'playSound',
                      soundUrl: 'notification-sound.mp3'
                  });
              });
          }
      })()
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
      clients.openWindow(event.notification.data.url || 'https://fesal.me/push/')
  );
});
