import Navbar from '@/components/Navbar'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session?.user.isCreator) {
    redirect('/')
  }

  return (
    <>
      <Navbar 
        authenticated={!!session?.user}
        img={session?.user?.image || undefined}
        username={session?.user?.name || 'User'}
      
      />
      <div className="container h-full w-full">{children}</div>
    </>
  )
}
