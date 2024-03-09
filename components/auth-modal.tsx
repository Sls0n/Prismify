import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { LogIn } from 'lucide-react'
import SignInForm from './sign-in-form'

export function AuthModal() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="rounded-xl text-[13.6px]"
            size="sm"
            variant="default"
          >
            <p className="hidden md:block">Login</p>
            <LogIn size={18} className="flex-center md:ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="scale-110 p-16">
          <SignInForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="rounded-xl text-[13.6px]"
          size="sm"
          variant="default"
        >
          <p className="hidden md:block">Login</p>
          <LogIn size={18} className="flex-center md:ml-2" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mb-6 rounded-xl bg-[#121212] px-6 py-2">
        <div className="mt-8" />
        <SignInForm />
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  )
}
