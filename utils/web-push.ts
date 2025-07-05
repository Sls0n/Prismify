import type { PushSubscription as PrismaSubscription } from '@prisma/client'

let webPush: typeof import('web-push') | null = null

async function getWebPush() {
  if (webPush) return webPush
  const mod = await import('web-push')
  webPush = mod.default || mod
  webPush.setVapidDetails(
    'mailto:admin@prismify.com',
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )
  return webPush
}

export async function sendPushMessage(
  sub: PrismaSubscription,
  payload: { title: string; body: string },
) {
  const wp = await getWebPush()
  try {
    await wp.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: sub.keys as any,
      },
      JSON.stringify(payload),
    )
  } catch (error) {
    console.error(error)
  }
}
