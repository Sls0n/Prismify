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
import { toast } from '@/hooks/use-toast'
import SignIn from './SignIn'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { useImageQualityStore } from '@/store/use-image-quality'
import { useImageOptions } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'

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
  const { quality } = useImageQualityStore()
  const { isImageUploaded } = useImageOptions()
  const { scaleFactor } = useResizeCanvas()

  const snapshotCreator = () => {
    return new Promise<Blob>((resolve, reject) => {
      try {
        if (!isImageUploaded) throw new Error('Upload image and try again')
        const scale = scaleFactor * quality
        const element = document.getElementById('canvas-container')
        if (!element) {
          reject(new Error('Element not found.'))
          toast({
            title: 'Error!',
            description: 'Canvas container not found.',
            variant: 'destructive',
          })
          return
        }
        domtoimage
          .toPng(element, {
            height: element.offsetHeight * scale,
            width: element.offsetWidth * scale,

            style: {
              transform: 'scale(' + scale + ')',
              transformOrigin: 'top left',
              width: element.offsetWidth + 'px',
              height: element.offsetHeight + 'px',
            },
          })
          .then((dataURL) => {
            const blob = dataURL as unknown as Blob
            resolve(blob)
          })
      } catch (e: any) {
        toast({
          title: 'Image not uploaded',
          description: e.message,
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[10] flex h-16 items-center border-b border-border px-4 py-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
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
          <div className="flex">
            <ThemeButtonIcon />
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

          <div className="dark:bg-border-dark h-8 w-[2px] bg-border" />
          <div className="flex items-center gap-2">
            {!authenticated && (
              <>
                {mode === 'default' && (
                  <>
                    <Button
                      onClick={() => {
                        snapshotCreator().then((blob) => {
                          saveAs(blob, 'prismify-render.png')
                        })
                      }}
                      variant="stylish"
                      className="mr-1 rounded-xl"
                    >
                      Save image
                      <Download
                        size={20}
                        className="ml-2 inline-block align-middle"
                      />
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="rounded-xl" variant="default">
                          Sign In
                          <LogIn
                            size={20}
                            className="ml-2 inline-block align-middle"
                          />
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
                <Button
                  onClick={() => {
                    snapshotCreator().then((blob) => {
                      saveAs(blob, 'prismify-render.png')
                    })
                  }}
                  variant="stylish"
                  className="mr-1 rounded-xl"
                >
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
