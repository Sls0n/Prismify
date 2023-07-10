'use client'

import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation'

export default function AuthModalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <section>
      {pathname === '/sign-in' && <Navbar mode="signin" />}
      {pathname === '/sign-up' && <Navbar mode="signup" />}
      {children}
    </section>
  )
}
