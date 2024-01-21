'use client'

import { useState } from 'react'
import {
  HexAlphaColorPicker,
  HexColorInput,
  HexColorPicker,
} from 'react-colorful'

export default function ColorPicker({
  onChange,
  colorState,
  shouldShowAlpha = true,
}: {
  onChange: (color: string) => void
  colorState: string
  shouldShowAlpha?: boolean
}) {
  const [color, setColor] = useState(colorState)

  return (
    <>
      <div className="flex-center flex-col gap-2">
        {shouldShowAlpha ? (
          <HexAlphaColorPicker
            color={color}
            onChange={(color) => {
              setColor(color)
              onChange(color)
            }}
          />
        ) : (
          <HexColorPicker
            color={color}
            onChange={(color) => {
              setColor(color)
              onChange(color)
            }}
          />
        )}
        <div className="flex-center relative h-full w-full rounded-md border border-[#22262b] bg-formDark text-center text-sm uppercase text-gray-100 md:text-sm">
          <span className="absolute left-2 font-medium text-gray-400">#</span>
          <HexColorInput
            color={color}
            onChange={(color) => {
              setColor(color)
              onChange(color)
            }}
            className="h-full w-full rounded-md border-[#22262b] bg-formDark px-3 py-3 text-center text-gray-100 focus:border-[#8e8ece] focus:outline-none focus:ring-1 focus:ring-[#8e8ece] md:text-sm"
          />
        </div>
      </div>
    </>
  )
}
