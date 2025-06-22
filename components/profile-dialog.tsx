'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { User as UserIcon } from 'lucide-react'
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
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { data } = useSession()
  const [joined, setJoined] = useState<string | null>(null)

  useEffect(() => {
    async function fetchJoinDate() {
      try {
        const res = await fetch('/api/user/settings')
        if (res.ok) {
          const json = await res.json()
          if (json?.database?.createdAt) {
            setJoined(formatDate(json.database.createdAt))
          }
        }
      } catch {
        // ignore
      }
    }
    if (open) fetchJoinDate()
  }, [open])

  const name = data?.user?.name || 'User'
  const image = data?.user?.image || ''

  const initials = name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const avatar = image ? (
    <Image
      src={image}
      alt={name}
      width={80}
      height={80}
      className="h-20 w-20 rounded-full object-cover"
    />
  ) : (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-xl font-semibold">
      {initials}
    </div>
  )

  const Body = (
    <div className="flex flex-col items-center space-y-2">
      {avatar}
      <p className="text-lg font-semibold">{name}</p>
      {joined && <p className="text-sm text-muted-foreground">Joined {joined}</p>}
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="mb-4 flex items-center gap-1.5">
              <UserIcon size={18} className="opacity-80" />
              <span>Profile</span>
            </DialogTitle>
          </DialogHeader>
          {Body}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mb-6 rounded-xl bg-[#121212] px-6 py-4">
        <DrawerHeader className="text-left">
          <DrawerTitle className="mb-4 flex items-center gap-1.5">
            <UserIcon size={18} className="opacity-80" />
            <span>Profile</span>
          </DrawerTitle>
        </DrawerHeader>
        {Body}
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  )
}
