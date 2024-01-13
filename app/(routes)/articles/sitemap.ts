import prismadb from '@/libs/prismadb'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await prismadb.article.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const sitemapUrls: MetadataRoute.Sitemap = response?.map((p) => {
    return {
      url: `https://prismify.vercel.app/articles/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly',
    }
  })

  return sitemapUrls
}
