import { z } from 'zod'
import { NextResponse } from 'next/server'
import prismadb from '@/libs/prismadb'
import { getCurrentSession } from '@/utils/auth-options'
import { userSettingsSchema } from '@/libs/validators/user-settings-validator'

export async function PATCH(request: Request) {
  try {
    const session = await getCurrentSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { name, image } = userSettingsSchema.parse(body)

    await prismadb.user.update({
      where: { id: session.user.id },
      data: {
        name: name ?? undefined,
        image: image ?? undefined,
      },
    })

    return new NextResponse('OK')
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 })
    }
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
