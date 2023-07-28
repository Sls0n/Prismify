'use client'

import Link from 'next/link'
import { cn } from '@/utils/buttonUtils'
import { Button, buttonVariants } from '@/components/ui/Button'
import ThemeButtonIcon from './ui/ThemeButtonIcon'
import Image from 'next/image'
import { ChevronDown, LogIn, LogOut, Settings, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog'
import { signOut } from 'next-auth/react'
import { toast } from '@/hooks/use-toast'
import SignIn from './SignIn'

type NavbarProps = {
  mode?: 'default' | 'signin' | 'signup'
  authenticated?: boolean
  img?: string
  username?: string
}

export default function Navbar({
  mode = 'default',
  authenticated,
  username,
  img,
}: NavbarProps) {
  return (
    <header className="h-16 fixed inset-x-0 top-0 z-[10] flex items-center border-b border-border px-4 py-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Can add hamburger or something here */}
          <Link href="/" className="inline-flex items-center space-x-3">
            <Image
              style={{
                filter: 'drop-shadow(0 0 15px #898aeb40)',
              }}
              src="/images/image.webp"
              width={35}
              height={35}
              alt="logo"
              priority
            />
            <span className="text-lg font-medium -tracking-wide text-primary dark:font-normal dark:text-dark sm:font-semibold">
              Prismify
            </span>
          </Link>
        </div>
        {/* add a vertical separator */}
        <nav className="flex items-center gap-10 ">
          <ThemeButtonIcon />
          
          <div className='w-[2.5px] h-7 bg-border dark:bg-border-dark'></div>
          <div className="flex items-center gap-2">
            {!authenticated && (
              <>
                {mode === 'default' && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className={cn(
                            buttonVariants({
                              variant: 'default',
                            })
                          )}
                        >
                          Sign In
                          <LogIn size={20} className="ml-2 inline-block align-middle" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="container mx-auto flex h-[85vh] max-h-screen max-w-2xl items-center rounded-lg bg-primary dark:bg-dark">
                        <div className="h-fit w-full">
                          <SignIn />
                        </div>
                      </DialogContent>
                    </Dialog>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={'none'}
                      className="flex cursor-pointer items-center justify-center gap-x-2.5"
                    >
                      <Image
                        width={30}
                        height={30}
                        src={img || '/images/fallback-avatar.png'}
                        className="rounded-full "
                        alt={`${username}'s avatar` || 'User avatar'}
                        aria-label="User avatar"
                      />

                      <div className="flex translate-y-[-1px] items-center justify-center gap-1.5  truncate font-medium capitalize text-primary/70 dark:text-dark/80 md:text-base">
                        <span className="sr-only">Logged in as</span>
                        <span className="text-[0.95rem]">
                          {username?.split(' ')[0]}
                        </span>

                        <ChevronDown
                          size={16}
                          className="translate-y-[0.15rem] text-primary/70 dark:text-dark/80"
                        />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 w-40">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <div className=" flex min-w-[2rem] items-center justify-center">
                          <User
                            size={18}
                            className="mr-3 h-4 w-4 text-primary/70 dark:text-dark/80"
                          />
                          <span className="font-medium">Profile</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex min-w-[2rem] items-center justify-center">
                          <Settings
                            size={18}
                            className="mr-3 h-4 w-4 text-primary/70 dark:text-dark/80"
                          />
                          <span className="font-medium">Settings</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button
                        onClick={() => {
                          signOut()
                            .then(() => {
                              toast({
                                title: 'Logging out..',
                              })
                            })
                            .catch(() => {
                              toast({
                                variant: 'destructive',
                                title: "Couldn't sign you out!",
                                description: 'Try again later.',
                              })
                            })
                        }}
                        className="flex min-w-[2rem] items-center justify-center"
                      >
                        <LogOut
                          size={18}
                          className="mr-3 h-4 w-4 text-primary/70 dark:text-dark/80"
                        />
                        <span className="font-medium">Sign out</span>
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
