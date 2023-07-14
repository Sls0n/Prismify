'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import CloseModal from '@/components/ui/CloseModal'
import SignIn from '@/components/SignIn'

export default function SignInModalPage() {
  const ref = useRef<HTMLDialogElement>(null)
  const router = useRouter()

  useEffect(() => {
    const modalRef = ref.current

    modalRef?.showModal()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back()
        modalRef?.close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      modalRef?.close()
    }
  }, [router])

  return (
    <AnimatePresence>
      <motion.dialog
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
        ref={ref}
        className="container relative mx-auto flex h-[85vh] max-h-screen max-w-2xl items-center rounded-lg bg-primary
          shadow-sm
        backdrop:backdrop-blur-sm dark:bg-formDark"
      >
        <div className="h-fit w-full">
          <div tabIndex={0} className="absolute right-8 top-8">
            <CloseModal />
          </div>

          <SignIn />
        </div>
      </motion.dialog>
    </AnimatePresence>
  )
}
