import '@/styles/globals.css'
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={Font.className}>{children}</body>
    </html>
  )
}
