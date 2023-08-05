'use client'

import { HexColorInput, HexAlphaColorPicker } from 'react-colorful'
import { CSSProperties, useState } from 'react'

export default function ColorPicker({
  onChange,
  colorState,
}: {
  onChange: (color: string) => void
  colorState: string
}) {
  // used to pass state of the current color to PopupColorPicker
  const [color, setColor] = useState(colorState)

  const style: CSSProperties = {
    display: 'block',
    boxSizing: 'border-box',
    width: '90px',
    textTransform: 'uppercase',
    textAlign: 'center',
  }

  return (
    <>
      <HexAlphaColorPicker
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
        className="rounded-md border border-gray-300 p-3 text-sm text-gray-900 focus:border-[#8e8ece] focus:outline-none focus:ring-1 focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm"
      />
    </>
  )
}
