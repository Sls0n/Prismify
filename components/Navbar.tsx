import Link from 'next/link'
import { cn } from '@/utils/buttonUtils'
import { buttonVariants } from '@/components/ui/Button'
import ThemeButtonIcon from './ui/ThemeButtonIcon'

type NavbarProps = {
  mode?: 'default' | 'signin' | 'signup'
}

export default function Navbar({ mode = 'default' }: NavbarProps) {
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
        </div>
      </nav>
    </header>
  )
}
