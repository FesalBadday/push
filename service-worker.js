// service-worker.js

self.addEventListener('push', function (event) {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Default body',
    icon: data.icon || 'icon.png',
    badge: data.badge || 'badge.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Default title', options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || 'https://fesal.me/push')
  );
});
