import { Toaster } from '@/components/ui/Toaster'
import Providers from '@/context/Providers'
import { cn } from '@/utils/buttonUtils'
import type { Metadata } from 'next'
import LocalFont from 'next/font/local'
// import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'

const Font = LocalFont({
  src: '../public/fonts/EudoxusSansGX.woff2',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title:
    'Prismify - Effortlessly Create Beautiful SaaS/Product Shots & Graphics',
  description:
    'Easily make your SaaS/product shots and graphics design stand out. Create beautiful screenshots and graphics for websites, social media, and more. With Prismify, you get browser frames, gradient backgrounds, text, annotations, and more at your fingertips. Try it now and make your designs shine!',
  verification: {
    google: 'cum1ckoCozAtSA3Xcn4UX_xR_FlfrlzKzQRa7nYQ2YM',
  },
  icons: {
    icon: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      className={cn('antialiased', Font.className)}
      lang="en"
    >
      <body className="h-full bg-primary pt-12 text-primary dark:bg-dark dark:text-dark ">
        <Toaster />
        {/* <Analytics /> */}

        <Providers>
          <div className="flex h-full flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
