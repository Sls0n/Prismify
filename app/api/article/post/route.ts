import { NextResponse } from 'next/server'
import { z } from 'zod'
import prismadb from '@/libs/prismadb'
import { getCurrentSession } from '@/utils/authOptions'

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

    console.log(blog)

    return new NextResponse('OK')
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 })
    }

    return new NextResponse('Something went wrong', { status: 500 })
  }
}

const postSchema = z.object({
  title: z
    .string()
    .max(100, 'Title should be at most 100 characters')
    .min(10, 'Title must be at least 10 characters'),
  summary: z
    .string()
    .max(300, 'Summary should be at most 300 characters')
    .min(10, 'Summary must be at least 10 characters'),
  category: z
    .string()
    .max(200, 'Category must be at most 200 characters')
    .optional(),
  slug: z.string().max(200, 'Slug too long.').min(1, 'Please provide a slug'),
  content: z.any(),
  imageUrl: z.string().optional(),
})
