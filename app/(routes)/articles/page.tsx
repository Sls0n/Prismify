import prismadb from '@/libs/prismadb'
import Link from 'next/link'

export default async function Article() {
  const articles = await prismadb.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container">
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
