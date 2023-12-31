import prismadb from '@/libs/prismadb'
import { Text } from '@/components/ui/Text'
import ArticleCard from '@/components/articles/ArticleCard'
import { formatDate, separateCommas } from '@/utils/helperFns'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Article(props: Props) {
  const searchParams = props.searchParams
  const page = searchParams.page || 1
  console.log(page)

  const articles = await prismadb.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
    skip: (+page - 1) * 6,
  })

  return (
    <div className="w-full pt-[72px]">
      <div className="mb-16 flex h-48 w-full flex-col items-center justify-center bg-black/10">
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
          <span className="inline-flex w-fit items-center gap-1 rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-purple shadow-sm ring-1 ring-inset ring-indigo-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            Prismify
          </span>
        </Text>
      </div>

      <ul
        className="container mt-5 grid grid-cols-1 grid-rows-2 gap-16 sm:mt-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-3"
        role="list"
      >
        {articles.map((article) => {
          return (
            <div key={article.id} className="relative col-span-1 row-span-1">
              <ArticleCard
                title={article.title ?? 'N/A'}
                image={article.imageUrl ?? '/images/fallback.jpg'}
                date={formatDate(article.updatedAt) ?? 'N/A'}
                href={`/articles/${article.slug}`}
                category={
                  separateCommas(article?.category ?? 'Design')?.at(0) ?? ''
                }
              />
            </div>
          )
        })}
      </ul>
    </div>
  )
}
