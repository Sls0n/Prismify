import Navbar from '@/components/navbar'
import { getCurrentSession } from '@/utils/auth-options'
import { redirect } from 'next/navigation'
import React from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="container h-full w-full">{children}</main>
}
