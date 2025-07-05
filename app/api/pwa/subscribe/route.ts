import { NextResponse } from 'next/server'
import prismadb from '@/libs/prismadb'
import { subscriptionSchema } from '@/libs/validators/notification-validator'
import { getCurrentSession } from '@/utils/auth-options'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = subscriptionSchema.parse(body)
    const session = await getCurrentSession()

    await prismadb.pushSubscription.upsert({
      where: { endpoint: data.endpoint },
      update: { keys: data.keys, userId: session?.user.id },
      create: { endpoint: data.endpoint, keys: data.keys, userId: session?.user.id },
    })

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    return new NextResponse('Invalid subscription', { status: 400 })
  }
}
