'use client'

import { HexColorInput, HexColorPicker } from 'react-colorful'
import { CSSProperties, useState } from 'react'
import { useImageOptions } from '@/hooks/use-image-options'

export default function ColorPicker({
  onChange,
}: {
  onChange: (color: string) => void
}) {
  const { shadowColor } = useImageOptions()
  const [color, setColor] = useState(shadowColor)

  const style: CSSProperties = {
    display: 'block',
    boxSizing: 'border-box',
    width: '90px',
    textTransform: 'uppercase',
    textAlign: 'center',
  }

  return (
    <>
      <HexColorPicker
        color={color}
        onChange={(color) => {
          setColor(color)
          onChange(color)
        }}
      />
      <HexColorInput
        style={style}
        color={color}
        onChange={(color) => {
          setColor(color)
          onChange(color)
        }}
        className="rounded-md border border-gray-300 p-3 text-sm text-gray-900 focus:border-[#8e8ece] focus:outline-none  focus:ring-1 focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm"
      />
    </>
  )
}
