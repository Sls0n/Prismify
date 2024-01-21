import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapUrls: MetadataRoute.Sitemap = allStaticRoutes.map((p) => {
    return {
      url: `https://prismify.vercel.app/${p}`,
      lastModified: '2024-01-13T12:17:43.023Z',
      changeFrequency: p === '' ? 'monthly' : 'weekly',
    }
  })

  return sitemapUrls
}

const allStaticRoutes = ['', 'about', 'articles']
