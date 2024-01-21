import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { getCurrentSession } from '@/utils/auth-options'
import React from 'react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentSession()

  return (
    <>
      <Navbar
        authenticated={!!session?.user}
        username={session?.user?.name || 'User'}
        id={session?.user?.id || '0'}
      />
      <div className="h-full w-full">
        {children}

        <Footer />
      </div>
    </>
  )
}
