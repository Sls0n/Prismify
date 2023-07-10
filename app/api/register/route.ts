import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prismadb from '@/libs/prismadb'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { username, email, password } = body

    if (!username || !email || !password) {
      return new NextResponse('Missing credentials', { status: 400 })
    }

    const exist = await prismadb.user.findUnique({
      where: {
        email,
      },
    })

    if (exist) {
      return new NextResponse('User already exists', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prismadb.user.create({
      data: {
        name: username,
        email,
        hashedPassword,
      } as { name: string; email: string; hashedPassword: string },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
