'use client'

import React from 'react'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/buttonUtils'
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
      className={cn('p-0 group', className)}
      variant="noHoverGhost"
      onClick={handleClick}
    >
      <ChevronLeft className="mr-2 h-5 w-5 text-purple group-hover:text-purple/70" />
      <Text className='text-purple group-hover:text-purple/70' variant="bodyMedium" semibold>
        {text}
      </Text>
    </Button>
  )
}
