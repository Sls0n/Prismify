'use client'

import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
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

export default function ProfileDialog({
  open,
  onOpenChange,
}: ProfileDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { data } = useSession()

  const name = data?.user?.name ?? 'User'
  const image = data?.user?.image ?? ''
  const joined = useMemo(() => {
    if (!data?.user?.createdAt) return null
    return formatDate(data.user.createdAt)
  }, [data?.user?.createdAt])

  const initials = useMemo(() => {
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }, [name])

  const avatar = image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={name}
      width={96}
      height={96}
      className="h-24 w-24 rounded-full object-cover shadow-lg"
    />
  ) : (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted text-2xl font-semibold text-foreground shadow-inner">
      {initials}
    </div>
  )

  const Body = (
    <div className="flex flex-col items-center space-y-3">
      {avatar}
      <p className="text-lg font-semibold text-foreground">{name}</p>
      {joined && (
        <p className="text-sm text-muted-foreground">Joined {joined}</p>
      )}
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="px-6 py-12">{Body}</DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mb-6 rounded-xl bg-background px-6 py-4">
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
