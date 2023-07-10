import Background from '@/components/ui/Background'
import Providers from '@/context/Providers'
import '@/styles/globals.css'
import { cn } from '@/utils/buttonUtils'
import type { Metadata } from 'next'
import LocalFont from 'next/font/local'
import Navbar from '@/components/Navbar'

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
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      className={cn('antialiased', Font.className)}
      lang="en"
    >
      <body className="min-h-screen bg-primary pt-12 text-primary dark:bg-dark dark:text-dark">
        <Providers>
          <Navbar />
          {authModal}

          <div className="container mx-auto h-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
            <Background />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
