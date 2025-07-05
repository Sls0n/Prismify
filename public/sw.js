self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  const title = data.title || 'Prismify'
  const options = {
    body: data.body,
    icon: '/favicons/apple-icon.png',
    badge: '/favicons/apple-icon.png',
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      const hadWindow = clientsArr.some((windowClient) => windowClient.focus())
      if (!hadWindow && self.clients.openWindow) {
        return self.clients.openWindow('/')
      }
    }),
  )
})
