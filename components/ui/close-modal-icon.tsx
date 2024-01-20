'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { Button } from './button'

export default function CloseModal() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="h-8 w-8 rounded-md p-2"
      onClick={() => router.back()}
    >
      <span className="sr-only">Close modal</span>
      <X aria-label="close modal" className="h-4 w-4" />
    </Button>
  )
}
