'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useImageOptions } from '@/store/use-image-options'

export default function AddTextLayer() {
  const { setTexts, defaultTextStyle, texts } = useImageOptions()

  return (
    <Button
      onClick={() => {
        setTexts([
          ...texts,
          {
            content: 'Edit this text',
            id: texts.length + 1,
            style: defaultTextStyle,
          },
        ])
      }}
      size="lg"
      variant="stylish"
      className="w-full rounded-lg text-center text-base"
    >
      <Plus size={22} className="mr-2 inline-block align-middle" />
      <span>Add a text layer</span>
    </Button>
  )
}
