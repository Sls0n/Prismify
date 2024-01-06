import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getCurrentSession } from '@/utils/authOptions'
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
        img={session?.user?.image || undefined}
        username={session?.user?.name || 'User'}
      />
      <div className="h-full w-full pt-[72px]">
        {children}

        <Footer />
      </div>
    </>
  )
}
