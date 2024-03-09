import BackButton from '@/components/ui/back-button'
import { Badge } from '@/components/ui/badge'
import { Text } from '@/components/ui/text'
import prismadb from '@/libs/prismadb'
import {
  generateBadgeVariant,
  generateFormattedBlogDate,
  separateCommas,
} from '@/utils/helper-fns'
import { Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cache } from 'react'

type ArticleProps = {
  params: {
    slug: string
  }
}

export const revalidate = 60 * 60 // 1 hour

export async function generateStaticParams() {
  const blogs = await prismadb.article.findMany({
    select: {
      slug: true,
    },
  })

  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

const getBlog = cache(async (slug: string) => {
  const blog = await prismadb.article.findFirst({
    where: {
      slug,
    },
  })

  return blog
})

export async function generateMetadata({ params }: ArticleProps) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    return
  }

  const metadata: Metadata = {
    title: `${blog.title} - Prismify`,
    description: blog.summary,
    openGraph: {
      title: `${blog.title} - Prismify`,
      description: blog?.summary || 'N/A',
      locale: 'en_US',
      url: `https://prismify.vercel.app/articles/${blog.slug}`,
      type: 'article',
      images: [
        {
          url:
            blog.imageUrl ?? 'https://prismify.vercel.app/opengraph-image.jpg',
          width: 1280,
          height: 720,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      creator: '@xSls0n_007',
      title: `${blog.title} - Prismify`,
      description: blog.summary || 'N/A',
      card: 'summary_large_image',
      images: [
        {
          url:
            blog.imageUrl ?? 'https://prismify.vercel.app/opengraph-image.jpg',
          width: 1280,
          height: 720,
          alt: blog.title,
        },
      ],
    },
    alternates: {
      canonical: `https://prismify.vercel.app/articles/${blog.slug}`,
    },
    publisher: 'Prismify',
  }

  return metadata
}

export default async function ArticlePage({ params }: ArticleProps) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    return notFound()
  }

  return (
    <section className="container flex w-full flex-col gap-8 pt-[72px] lg:gap-16">
      <div className="mt-8">
        <BackButton />
      </div>

      <article className="mx-auto h-fit w-full max-w-prose rounded-md">
        <div className="mb-16 flex w-full items-start justify-between">
          <div className="flex flex-col gap-3">
            {/* Time published/updated */}
            <div className="flex items-center">
              <Calendar className="mr-2 h-[1.15rem] w-[1.15rem] text-white/40" />
              <time
                className="text-base font-normal text-dark/60"
                dateTime={
                  blog?.updatedAt.toISOString() ?? blog?.createdAt.toISOString()
                }
              >
                {generateFormattedBlogDate(blog?.createdAt, blog?.updatedAt)}
              </time>
            </div>

            {/* Title */}
            <Text
              variant="h1"
              bold
              className="text-[2rem] font-bold capitalize leading-tight text-dark md:text-[2.8rem]"
            >
              {blog.title ?? 'N/A'}
            </Text>
            {/* Cateogry */}
            {blog?.category && (
              <div className="flex items-center gap-2">
                {separateCommas(blog?.category)!.map((category) => (
                  <Badge
                    key={category}
                    variant={generateBadgeVariant(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="prose prose-lg prose-neutral mb-16 dark:prose-invert prose-p:tracking-[0.002em] prose-p:text-dark prose-img:rounded-lg prose-a:text-purple prose-a:cursor-pointer">
          {blog?.imageUrl && (
            <figure>
              <Image
                src={blog?.imageUrl ?? '/images/fallback.jpg'}
                alt={'cover image'}
                width={1280}
                height={720}
                priority
                className="aspect-auto max-w-full object-cover"
              />

              {/* <figcaption>
              Picture
            </figcaption> */}
            </figure>
          )}
          {blog?.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
          )}
        </div>
      </article>
    </section>
  )
}
