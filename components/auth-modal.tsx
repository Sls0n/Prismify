import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { LogIn } from 'lucide-react'
import SignInForm from './sign-in-form'
import { useAuthModal } from '@/store/use-auth-modal'
import SignUpForm from './sign-up-form'

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
          {show === 'signin' ? <SignInForm /> : <SignUpForm />}
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
        {show === 'signin' ? <SignInForm /> : <SignUpForm />}
        <div className="mt-4" />
      </DrawerContent>
    </Drawer>
  )
}
