import Footer from '@/components/footer'
import React from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full w-full flex-col">
      {children}

      <Footer />
    </main>
  )
}
