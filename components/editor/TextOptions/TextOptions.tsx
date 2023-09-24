'use client'

import { Button } from '@/components/ui/Button'
import { useImageOptions } from '@/store/use-image-options'
import { CaseLower } from 'lucide-react'

export default function TextOptions() {
  const { setTexts, defaultTextStyle, texts } = useImageOptions()

  return (
    <div className="w-full">
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
        <CaseLower size={24} className="mr-2 inline-block align-middle" />
        <span>Add a text layer</span>
      </Button>
    </div>
  )
}
