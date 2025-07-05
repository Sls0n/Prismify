'use client'

import { useEffect } from 'react'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = globalThis.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i)
  return outputArray
}

export default function PwaInit() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return

    let registration: ServiceWorkerRegistration

    const subscribe = async () => {
      const res = await fetch('/api/pwa/public-key')
      const { key } = (await res.json()) as { key: string }
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key),
      })
      await fetch('/api/pwa/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      })
    }

    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        registration = reg
        return reg.pushManager.getSubscription()
      })
      .then((sub) => {
        if (sub) return
        return subscribe()
      })
      .catch((err) => console.error('sw registration failed', err))
  }, [])

  return null
}
