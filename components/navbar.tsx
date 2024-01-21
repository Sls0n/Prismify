'use client'

import { AuthModal } from '@/components/auth-modal'
import ExportOptions from '@/components/export-options'
import { NavLinks } from '@/components/navlinks'
import { usePathname } from 'next/navigation'
import { UserDropDown } from '@/components/user-dropdown'

type NavbarProps = {
  authenticated?: boolean
  username: string
  id: string
}

export default function Navbar({ authenticated, username, id }: NavbarProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="fixed inset-0 top-0 z-[10] flex h-[72px] items-center border-b border-border bg-[#131313] px-4 py-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between">
        <NavLinks />
        <div className="flex items-center gap-10 ">
          <div className="flex items-center gap-2">
            {isHome && <ExportOptions isLoggedIn={authenticated || false} />}

            <div className="bg-border-dark mx-3 h-7 w-[2px] bg-border" />

            {authenticated ? (
              <UserDropDown id={id} username={username} />
            ) : (
              <AuthModal />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
