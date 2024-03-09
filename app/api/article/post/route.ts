import { z } from 'zod'
import { NextResponse } from 'next/server'
import prismadb from '@/libs/prismadb'
import { getCurrentSession } from '@/utils/auth-options'
import { postSchema } from '@/libs/validators/article-post-validator'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, summary, category, slug, content, imageUrl } =
      postSchema.parse(body)

    const session = await getCurrentSession()

    if (!session || !session.user.isCreator) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const slugExits = await prismadb.article.findFirst({
      where: { slug },
    })

    if (slugExits) {
      return new NextResponse('Article already exists', { status: 409 })
    }

    const blog = await prismadb.article.create({
      data: {
        title,
        summary,
        category,
        slug,
        content,
        imageUrl,
      },
    })

    revalidateTag('articles')

    return new NextResponse('OK')
  } catch (error) {
    console.log(error)
    console.log(error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 })
    }
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
