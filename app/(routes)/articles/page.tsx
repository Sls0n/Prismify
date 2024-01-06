import prismadb from '@/libs/prismadb'
import Link from 'next/link'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'

export default async function Article() {
  const articles = await prismadb.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="w-full">
      <div className="flex h-44 w-full flex-col items-center justify-center bg-black/10">
        <Text
          variant="h1"
          bold
          className="mb-2 line-clamp-2 text-[2rem] font-bold capitalize leading-tight tracking-normal text-dark md:text-[2.8rem]"
        >
          Articles
        </Text>

        <Text
          variant="bodyMedium"
          className="line-clamp-2 flex items-center gap-1 text-dark/70 "
        >
          <span>Read latest articles from</span>
          <span className="inline-flex w-fit items-center gap-1 rounded-md px-2 py-1 text-xs font-medium shadow-sm ring-1 ring-inset transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-purple bg-indigo-500/10 ring-indigo-500/20">
            Prismify
          </span>
        </Text>
      </div>

      {/* Article category filter */}

      <ul className="container mt-8 flex list-disc flex-col gap-4">
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
