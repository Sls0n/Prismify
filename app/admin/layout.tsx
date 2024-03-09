import React from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container h-full w-full">
      {children}
    </main>
  )
}
