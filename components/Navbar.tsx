'use client'

import { Button, buttonVariants } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/utils/buttonUtils'
import {
  BadgeInfo,
  BookCopy,
  ChevronDown,
  LogOut,
  Mails,
  Settings,
  User,
  Wand2,
  Zap,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthModal } from './AuthModal'
import SaveOptions from './SaveOptions'
import { gradients } from '@/utils/presets/gradients'

type NavbarProps = {
  authenticated?: boolean
  img?: string
  username?: string
  id: string
}

export default function Navbar({
  authenticated,
  username,
  id,
  img,
}: NavbarProps) {
  const pathname = usePathname()

  const isHome = pathname === '/'

  const generateUniqueGradient = () => {
    if (!id) return

    const filteredGradients = gradients.filter(
      (gradient) => gradient.type === 'Normal'
    )

    const sumAscii = id
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0)
    const gradientIndex = sumAscii % filteredGradients.length

    const gradient = filteredGradients[gradientIndex].gradient
    return gradient
  }

  return (
    <header className="fixed inset-0 top-0 z-[10] flex h-[72px] items-center border-b border-border bg-[#131313] px-4 py-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between">
        <nav className="flex items-center gap-8">
          {/* Can add hamburger or something here */}
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'noHoverGhost' }),
              ' inline-flex items-center gap-3 px-0'
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
            <p className="mr-3 hidden bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-lg font-semibold tracking-tight text-transparent md:block ">
              Prismify
              <span className="ml-2 inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-purple shadow-sm ring-1 ring-inset ring-indigo-500/20 dark:bg-indigo-500/10">
                Beta
              </span>
            </p>

            <div className="dark:bg-border-dark hidden h-6 w-[2px] bg-border md:block" />
          </Link>

          {/* <Link className="hidden md:flex" href="/templates">
            <p className="text-sm font-medium text-dark/70">Templates</p>
          </Link> */}

          <DropdownMenu>
            <DropdownMenuTrigger className="add-focus group hidden items-center md:flex">
              <p className="text-sm font-medium text-dark/70 group-hover:text-dark/90">
                Resources
              </p>
              <ChevronDown
                size={16}
                className="ml-1 translate-y-0.5 text-dark/70 group-hover:text-dark/90"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={15}
              className="w-[180px] rounded-xl border border-border/70 bg-[#151515]/95 p-1.5 py-2 shadow-xl backdrop-blur-lg"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="group mb-1 cursor-pointer rounded-lg focus:bg-white">
                  <Link
                    href="/articles"
                    className="flex w-full items-center focus:shadow-md"
                  >
                    <BookCopy
                      size={18}
                      className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                    />
                    <span className="font-medium group-focus:text-black/90">
                      Articles
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="group mb-1 cursor-pointer rounded-lg focus:bg-white">
                  <Link
                    href="/examples"
                    className="flex w-full items-center focus:shadow-md"
                  >
                    <Wand2
                      size={18}
                      className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                    />
                    <span className="font-medium group-focus:text-black/90">
                      Examples
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="group mb-1 cursor-pointer rounded-lg focus:bg-white">
                  <Link
                    href="/about"
                    className="flex w-full items-center focus:shadow-md"
                  >
                    <BadgeInfo
                      size={18}
                      className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                    />
                    <span className="font-medium group-focus:text-black/90">
                      About
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="mb-1 opacity-80" />
              <DropdownMenuItem className="group cursor-pointer rounded-lg focus:bg-white">
                <Link
                  href="/contact"
                  className="flex w-full items-center focus:shadow-md"
                >
                  <Mails
                    size={18}
                    className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                  />
                  <span className="font-medium group-focus:text-black/90">
                    Contact
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex items-center gap-10 ">
          <div className="flex items-center gap-2">
            {isHome && <SaveOptions isLoggedIn={authenticated || false} />}

            <div className="dark:bg-border-dark mx-3 h-7 w-[2px] bg-border" />

            {authenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="group flex items-center"
                >
                  <Button
                    variant="ghost"
                    className="flex h-10 cursor-pointer items-center justify-center gap-x-2.5 rounded-xl bg-[#f5f7fa] px-4 py-2 font-medium text-primary dark:bg-[#181818] dark:text-dark"
                  >
                    <div className="h-6 w-6">
                      <div
                        style={{
                          backgroundImage: generateUniqueGradient(),
                        }}
                        className="h-full w-full rounded-full"
                      />
                    </div>

                    <div className="flex translate-y-[-1px] items-center justify-center gap-1.5  truncate font-medium capitalize text-primary/70 dark:text-dark/80 md:text-base">
                      <span className="sr-only">Logged in as</span>
                      <span className="hidden text-sm md:inline">
                        {username?.split(' ')[0]}
                      </span>

                      <ChevronDown
                        size={16}
                        className="translate-y-[1.6px] text-primary/70 dark:text-dark/80"
                      />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-[180px] rounded-xl border border-border/70 bg-[#151515]/95 p-1.5 py-2 shadow-xl backdrop-blur-lg"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="group mb-1 cursor-pointer rounded-lg focus:bg-white">
                      <div className="flex items-center justify-center focus:shadow-md">
                        <User
                          size={18}
                          className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                        />
                        <span className="font-medium group-focus:text-black/90">
                          Profile
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group mb-1 cursor-pointer rounded-lg focus:bg-white">
                      <div className="flex items-center justify-center focus:shadow-md">
                        <Settings
                          size={18}
                          className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                        />
                        <span className="font-medium group-focus:text-black/90">
                          Settings
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group mb-1 cursor-pointer rounded-lg focus:bg-white">
                      <div className="flex items-center justify-center focus:shadow-md">
                        <Zap
                          size={18}
                          className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                        />
                        <span className="font-medium group-focus:text-black/90">
                          Upgrade
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="mb-1" />
                  <DropdownMenuItem
                    onClick={() => {
                      signOut()
                        .then(() => {
                          if (typeof window !== 'undefined')
                            localStorage.removeItem('downloaded')
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
                    className="group cursor-pointer rounded-lg focus:bg-white"
                  >
                    <div className="flex  items-center justify-center focus:shadow-md">
                      <LogOut
                        size={18}
                        className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                      />
                      <span className="font-medium group-focus:text-black/90">
                        Sign out
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthModal />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
