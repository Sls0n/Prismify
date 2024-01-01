import * as React from 'react'

import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { LogIn } from 'lucide-react'
import SignIn from './SignIn'
import { useAuthModal } from '@/store/use-auth-modal'
import SignUp from './SignUp'

export function AuthModal() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { show } = useAuthModal()

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
        <DialogContent className="p-[4.5rem] sm:max-w-[600px]">
          {show === 'signin' ? <SignIn /> : <SignUp />}
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
      <DrawerContent className="rounded-xl bg-[#121212] px-6 py-2">
        <div className="mt-8" />
        {show === 'signin' ? <SignIn /> : <SignUp />}
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  )
}
