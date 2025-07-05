import { z } from 'zod'
import { NextResponse } from 'next/server'
import prismadb from '@/libs/prismadb'
import { getCurrentSession } from '@/utils/auth-options'
import { userSettingsSchema } from '@/libs/validators/user-settings-validator'

export async function GET() {
  try {
    const session = await getCurrentSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const dbUser = await prismadb.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isCreator: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      session: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        isCreator: session.user.isCreator,
      },
      database: dbUser,
    })
  } catch (error) {
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getCurrentSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { name, image } = userSettingsSchema.parse(body)

    const updateData = {
      name: name ?? undefined,
      image: image ?? undefined,
    }

    await prismadb.user.update({
      where: { id: session.user.id },
      data: updateData,
    })

    return new NextResponse('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 })
    }
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
