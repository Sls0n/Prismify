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
      <div className="flex-center flex-col gap-2">
        <HexAlphaColorPicker
          color={color}
          onChange={(color) => {
            setColor(color)
            onChange(color)
          }}
        />
        <div className="flex-center relative h-full w-full rounded-md border border-gray-300 text-center text-sm uppercase text-gray-900  dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm">
          <span className="absolute left-2 font-medium text-gray-400">#</span>
          <HexColorInput
            color={color}
            onChange={(color) => {
              setColor(color)
              onChange(color)
            }}
            className="h-full w-full rounded-md px-3 py-3 text-center focus:border-[#8e8ece] focus:outline-none focus:ring-1 focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm"
          />
        </div>
      </div>
    </>
  )
}
