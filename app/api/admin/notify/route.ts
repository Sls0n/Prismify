import { NextResponse } from 'next/server'
import prismadb from '@/libs/prismadb'
import { notificationSchema } from '@/libs/validators/notification-validator'
import { getCurrentSession } from '@/utils/auth-options'
import { sendPushMessage } from '@/utils/web-push'

export async function POST(req: Request) {
  try {
    const session = await getCurrentSession()
    if (!session || !session.user.isCreator) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const data = notificationSchema.parse(body)

    await prismadb.notification.create({ data })

    const subs = await prismadb.pushSubscription.findMany()
    await Promise.all(subs.map((s) => sendPushMessage(s, data)))

    return new NextResponse('OK')
  } catch (error) {
    console.error(error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
