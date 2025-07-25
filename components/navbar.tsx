'use client'

import { AuthModal } from '@/components/auth-modal'
import ExportOptions from '@/components/export-options'
import { NavLinks } from '@/components/navlinks'
import { usePathname } from 'next/navigation'
import { UserDropDown } from '@/components/user-dropdown'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="fixed top-0 z-[10] flex h-[72px] w-screen items-center border-b border-border bg-[#131313] py-4 pr-4 pt-4 backdrop-blur-md ">
      <div className="container flex w-full items-center justify-between">
        <NavLinks />
        <div className="flex items-center gap-10 ">
          <UserSection isHome={isHome} />
        </div>
      </div>
    </header>
  )
}

const UserSection = ({ isHome }: { isHome: boolean }) => {
  const { data, status } = useSession()

  if (status === 'loading') return null

  return (
    <div className="flex items-center gap-2">
      {isHome && <ExportOptions isLoggedIn={!!data?.user || false} />}

      {isHome && <div className="bg-border-dark mx-3 h-7 w-[2px] bg-border" />}

      {!!data?.user ? (
        <UserDropDown
          img={data?.user?.image || '/images/fallback.jpg'}
          username={data?.user?.name || 'User'}
          isCreator={data?.user.isCreator ?? false}
        />
      ) : (
        <AuthModal />
      )}
    </div>
  )
}
