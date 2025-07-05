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
import {
  Image as ImageIcon,
  Save,
  Settings as SettingsIcon,
  User as UserIcon,
  Loader2,
} from 'lucide-react'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SettingsDialog({
  open,
  onOpenChange,
}: SettingsDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const router = useRouter()
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name || '')
  const [image, setImage] = useState(session?.user?.image || '')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setName(session?.user?.name || '')
    setImage(session?.user?.image || '')
  }, [session])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        name: name.trim() || undefined,
        image: image.trim() || undefined,
      }

      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText)
      }

      // force a session update with the new data
      await update({
        name: payload.name,
        image: payload.image,
      })

      router.refresh()
      toast({ title: 'Profile updated!' })
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
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
            disabled={isLoading}
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
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
          />
          {image ? (
            <img
              src={image}
              alt="Profile preview"
              className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border object-cover"
            />
          ) : (
            <ImageIcon
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="flex w-full items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save size={16} />
            <span>Save</span>
          </>
        )}
      </Button>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mb-6 rounded-xl bg-background px-6 py-4">
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
