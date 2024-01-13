import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: [
      'https://prismify.vercel.app/sitemap.xml',
      'https://prismify.vercel.app/articles/sitemap.xml',
    ],
  }
}
