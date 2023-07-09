import Navbar from '@/components/Navbar'
import Background from '@/components/ui/Background'
import Providers from '@/context/Providers'
import '@/styles/globals.css'
import { cn } from '@/utils/buttonUtils'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const Font = localFont({
  src: '../fonts/EudoxusSansGx.woff2',
  display: 'swap',
  adjustFontFallback: 'Arial',
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
      className={cn('antialiased ', Font.className)}
      lang="en"
    >
      <body className="min-h-screen bg-primary pt-12 text-primary dark:bg-dark dark:text-dark">
        <Providers>
          <Navbar />
          <div className="container mx-auto h-full max-w-7xl pt-12">
            <Background />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
