import Link from 'next/link'
import { cn } from '@/utils/buttonUtils'
import { buttonVariants } from '@/components/ui/Button'
import ThemeButtonIcon from './ui/ThemeButtonIcon'
import Image from 'next/image'

type NavbarProps = {
  mode?: 'default' | 'signin' | 'signup'
  authenticated?: boolean
  img?: string
  username?: string
}

const Navbar = ({
  mode = 'default',
  authenticated,
  username,
  img,
}: NavbarProps) => {
  return (
    <header className="fixed inset-x-0 top-0 z-[10] mx-auto flex h-fit max-w-7xl items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-8">
        {/* Can add hamburger or something here */}
        <Link href="/" className="inline-flex space-x-6">
          <span className="text-[1.45rem] font-medium -tracking-wide text-primary dark:font-normal dark:text-dark sm:font-semibold">
            Prismify
          </span>
        </Link>
      </div>
      <nav className="flex items-center gap-10 ">
        <ThemeButtonIcon />
        <div className="flex items-center gap-2">
          {!authenticated && (
            <>
              {mode === 'default' && (
                <>
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                      })
                    )}
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: 'default',
                      })
                    )}
                    href="/sign-up"
                  >
                    Sign up
                  </Link>
                </>
              )}

              {mode === 'signin' && (
                <>
                  <a
                    className={cn(
                      buttonVariants({
                        variant: 'default',
                      })
                    )}
                    href="/sign-up"
                  >
                    Sign up
                  </a>
                </>
              )}

              {mode === 'signup' && (
                <>
                  <a
                    className={cn(
                      buttonVariants({
                        variant: 'default',
                      })
                    )}
                    href="/sign-in"
                  >
                    Sign in
                  </a>
                </>
              )}
            </>
          )}
          {authenticated && (
            <>
              <Image
                width={45}
                height={45}
                src={img || '/images/fallback-avatar.png'}
                className="rounded-full border-[3px] border-[#e0e0ec] dark:border-[#1d1d1f]"
                alt={`${username}'s avatar` || 'User avatar'}
                aria-label="User avatar"
              />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
