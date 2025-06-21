'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatDate } from '@/utils/helper-fns'

interface ProfileDialogProps {
  children: React.ReactNode
}

export default function ProfileDialog({ children }: ProfileDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const initials = session?.user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const Content = (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-border">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'user'}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-3xl font-semibold text-[#898AEB]">
            {initials}
          </div>
        )}
      </div>
      <p className="text-lg font-semibold">{session?.user?.name}</p>
      {session?.user?.createdAt && (
        <p className="text-sm text-muted-foreground">
          Joined {formatDate(session.user.createdAt)}
        </p>
      )}
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
        <DialogContent className="p-6 text-center">
          <DialogHeader>
            <DialogTitle className="mb-4">Profile</DialogTitle>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {children}
      <DrawerContent className="mb-6 rounded-xl bg-[#121212] px-6 py-4 text-center">
        <DrawerHeader>
          <DrawerTitle className="mb-4">Profile</DrawerTitle>
        </DrawerHeader>
        {Content}
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  )
}
