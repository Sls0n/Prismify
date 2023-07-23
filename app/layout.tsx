import { Toaster } from '@/components/ui/Toaster'
import Providers from '@/context/Providers'
import { cn } from '@/utils/buttonUtils'
import type { Metadata } from 'next'
import LocalFont from 'next/font/local'
import '@/styles/globals.css'

const Font = LocalFont({
  src: '../public/fonts/EudoxusSansGX.woff2',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Prismify — Revitalize & enhance boring images/screenshots.',
  description: 'Revitalize & enhance boring images/screenshots.',
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
      <body className="h-screen overflow-x-hidden bg-primary pt-12 text-primary dark:bg-dark dark:text-dark ">
        <Toaster />

        <Providers>
          <div className="mx-auto flex h-full max-w-[100rem] flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
