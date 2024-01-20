'use client'

import React from 'react'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/button-utils'
import { ChevronLeft } from 'lucide-react'

type BackButtonProps = {
  text?: string
  onClick?: () => void
  className?: string
}

export default function BackButton({
  text = 'Go back',
  onClick,
  className,
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.back()
    }
  }

  return (
    <Button
      className={cn('group p-0', className)}
      variant="noHoverGhost"
      onClick={handleClick}
    >
      <ChevronLeft className="mr-2 h-5 w-5 text-purple group-hover:text-purple/70" />
      <Text
        className="text-purple group-hover:text-purple/70"
        variant="bodyMedium"
        semibold
      >
        {text}
      </Text>
    </Button>
  )
}
