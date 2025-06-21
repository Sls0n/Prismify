'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMediaQuery } from '@/hooks/use-media-query'
import { toast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { Image as ImageIcon, Save, Settings as SettingsIcon, User as UserIcon } from 'lucide-react'

interface SettingsDialogProps {
  children: React.ReactNode
}

export default function SettingsDialog({ children }: SettingsDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name || '')
  const [image, setImage] = useState(session?.user?.image || '')

  useEffect(() => {
    setName(session?.user?.name || '')
    setImage(session?.user?.image || '')
  }, [session])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image }),
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
      await update({ name, image })
      router.refresh()
      toast({ title: 'Profile updated!' })
      setOpen(false)
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const Form = (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">
          Username
        </label>
        <div className="relative">
          <Input
            id="name"
            className="pl-9"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <UserIcon
            size={16}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="image" className="text-sm font-medium">
          Image URL
        </label>
        <div className="relative">
          <Input
            id="image"
            className="pl-9"
            value={image || ''}
            onChange={(e) => setImage(e.target.value)}
          />
          <ImageIcon
            size={16}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>
      <Button type="submit" className="flex w-full items-center justify-center gap-2">
        <Save size={16} />
        <span>Save</span>
      </Button>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="mb-4 flex items-center gap-1.5">
              <SettingsIcon size={18} className="opacity-80" />
              <span>Edit profile</span>
            </DialogTitle>
          </DialogHeader>
          {Form}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {children}
      <DrawerContent className="mb-6 rounded-xl bg-[#121212] px-6 py-4">
        <DrawerHeader className="text-left">
          <DrawerTitle className="mb-4 flex items-center gap-1.5">
            <SettingsIcon size={18} className="opacity-80" />
            <span>Edit profile</span>
          </DrawerTitle>
        </DrawerHeader>
        {Form}
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  )
}
