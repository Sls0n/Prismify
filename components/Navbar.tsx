'use client'

import Link from 'next/link'
import { cn } from '@/utils/buttonUtils'
import { Button, buttonVariants } from '@/components/ui/Button'
import ThemeButtonIcon from './ui/ThemeButtonIcon'
import Image from 'next/image'
import {
  ChevronDown,
  Download,
  LogIn,
  LogOut,
  Settings,
  User,
} from 'lucide-react'
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
import SignIn from './SignIn'
import { toast } from '@/hooks/use-toast'
import SaveOptions from './SaveOptions'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import SpotlightButton from './ui/SpotlightButton'

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
  const { shouldFloat } = useResizeCanvas()
  return (
    <header className="fixed inset-x-0 top-0 z-[10] flex h-[3.75rem] items-center border-b border-border px-4 py-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Can add hamburger or something here */}
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'inline-flex items-center space-x-3'
            )}
          >
            <Image
              src="/images/image.webp"
              width={35}
              height={35}
              quality={100}
              alt="prismify logo"
              priority
            />
            <span className="hidden text-lg font-medium -tracking-wide text-primary dark:font-normal dark:text-dark sm:font-semibold md:block">
              Prismify
              <span className="ml-2 inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-purple shadow-sm ring-1 ring-inset ring-indigo-500/20 dark:bg-indigo-500/10">
                Beta
              </span>
            </span>
          </Link>
        </div>
        {/* add a vertical separator */}
        <nav className="flex items-center gap-10 ">
          <div className="flex">
            {/* <ThemeButtonIcon /> */}
            {/* <a
              href="https://www.github.com/Sls0n/prismify"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'ghost' }), 'px-3 py-2')}
            >
              <Github className="h-[1.2rem] w-[1.2rem] text-dark/80 " />
              <span className="sr-only">Go to Github repository</span>
            </a> */}
          </div>

          {/* <div className="dark:bg-border-dark h-7 w-[2px] bg-border" /> */}
          <div className="flex items-center gap-2">
            {!authenticated && (
              <>
                {mode === 'default' && (
                  <>
                    {shouldFloat && <SaveOptions />}

                    <div className="dark:bg-border-dark mx-3 h-7 w-[2px] bg-border" />

                    {/* <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="rounded-xl text-[0.85rem]"
                          size="sm"
                          variant="default"
                        >
                          <p>Sign In</p>
                          <LogIn size={18} className="flex-center ml-2" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="container mx-auto flex h-[85vh] max-h-screen max-w-2xl items-center rounded-lg bg-primary dark:bg-dark">
                        <div className="h-fit w-full">
                          <SignIn />
                        </div>
                      </DialogContent>
                    </Dialog> */}
                    <Link
                      href={
                        'https://thefullstack.network/slson/project/prismify'
                      }
                      target="_blank"
                    >
                      <SpotlightButton text="Vote" />
                    </Link>
                  </>
                )}

                {mode === 'signin' && (
                  <>
                    <Link
                      className={cn(
                        buttonVariants({
                          variant: 'default',
                        }),
                        'rounded-xl'
                      )}
                      href="/sign-up"
                    >
                      Sign up
                      <LogIn
                        size={20}
                        className="ml-2 inline-block align-middle"
                      />
                    </Link>
                  </>
                )}

                {mode === 'signup' && (
                  <>
                    <Link
                      className={cn(
                        buttonVariants({
                          variant: 'default',
                        }),
                        'rounded-xl'
                      )}
                      href="/sign-in"
                    >
                      Sign in
                      <LogIn
                        size={20}
                        className="ml-2 inline-block align-middle"
                      />
                    </Link>
                  </>
                )}
              </>
            )}

            {authenticated && (
              <>
                <Button variant="stylish" className="mr-1 rounded-xl">
                  Save image
                  <Download
                    size={20}
                    className="ml-2 inline-block align-middle"
                  />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-10 cursor-pointer items-center justify-center gap-x-2.5 rounded-xl bg-[#f5f7fa] px-4 py-2 font-medium text-primary dark:bg-formDark dark:text-dark"
                    >
                      <Image
                        width={30}
                        height={30}
                        src={img || '/images/fallback-avatar.png'}
                        className="rounded-full"
                        alt={`${username}'s avatar` || 'User avatar'}
                        aria-label="User avatar"
                      />

                      <div className="flex translate-y-[-1px] items-center justify-center gap-1.5  truncate font-medium capitalize text-primary/70 dark:text-dark/80 md:text-base">
                        <span className="sr-only">Logged in as</span>
                        <span className="text-sm">
                          {username?.split(' ')[0]}
                        </span>

                        <ChevronDown
                          size={16}
                          className="translate-y-[0.1rem] text-primary/70 dark:text-dark/80"
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
