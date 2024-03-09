// dropdown menu for user profile when loogged in

'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/hooks/use-toast'
import { ChevronDown, LogOut, Settings, User, Zap } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const menuItems = [
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/upgrade', icon: Zap, label: 'Upgrade', separateFromHere: true },
  { icon: LogOut, label: 'Logout' },
]

export const UserDropDown = ({
  username,
  img,
}: {
  username: string
  img: string
}) => {
  const handleSignOut = async () => {
    try {
      await signOut()
      if (typeof window !== 'undefined') localStorage.removeItem('downloaded')
      toast({
        title: 'Logging out..',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Couldn't sign you out!",
        description: 'Try again later.',
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group flex items-center">
        <Button
          variant="ghost"
          className="flex h-10 cursor-pointer items-center justify-center gap-x-2.5 rounded-xl bg-[#181818] px-4 py-2 font-medium text-dark"
        >
          <div className="h-7 w-7 overflow-hidden ">
            <Image
              src={img}
              alt={username}
              unoptimized
              width={32}
              height={32}
              className="h-full w-full rounded-full"
            />
          </div>

          <div className="flex translate-y-[-1px] items-center justify-center gap-1.5  truncate font-medium capitalize text-dark/80 md:text-base">
            <span className="sr-only">Logged in as</span>
            <span className="hidden text-sm md:inline">
              {username?.split(' ')[0]}
            </span>

            <ChevronDown
              size={16}
              className="translate-y-[1.6px] text-dark/80"
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
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <DropdownMenuItem
                className={`group cursor-pointer rounded-lg focus:bg-white ${
                  index !== menuItems.length - 1 ? 'mb-1' : ''
                }`}
                key={item.href}
                onClick={() =>
                  item.label === 'Logout' ? handleSignOut() : null
                }
              >
                <div
                  // href={item.href}
                  className="flex w-full items-center focus:shadow-md"
                >
                  <item.icon
                    size={18}
                    className="mr-3 h-4 w-4  text-dark/80 group-focus:text-black/90"
                  />
                  <span className="font-medium group-focus:text-black/90">
                    {item.label}
                  </span>
                </div>
              </DropdownMenuItem>
              {item.separateFromHere && (
                <DropdownMenuSeparator
                  key={item.label}
                  className="mb-1 opacity-80"
                />
              )}
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
