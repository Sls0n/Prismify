'use client'

import { useCallback } from 'react'
import { solidColors } from '@/utils/presets/solid-colors'
import { Button } from '@/components/ui/button'
import PopupColorPicker from '@/components/popup-color-picker'
import { useBackgroundOptions } from '@/store/use-background-options'

export default function CustomGradientPicker() {
  const {
    setBackground,
    background,
    setBackgroundType,
    solidColor,
    setSolidColor,
    setImageBackground,
    imageBackground,
  } = useBackgroundOptions()

  const updateRootStyles = useCallback((color: string) => {
    if (typeof window === 'undefined') return
    document?.documentElement.style.setProperty('--solid-bg', color)
    document?.documentElement.style.setProperty('--gradient-bg', color)
    document?.documentElement.style.setProperty('--mesh-bg', color)
  }, [])

  const handleColorChange = useCallback(
    (color: string) => {
      setBackgroundType('solid')
      setSolidColor(color)
      setBackground(color)
      setImageBackground(null)
      updateRootStyles(color)
    },
    [
      setSolidColor,
      setBackground,
      setBackgroundType,
      updateRootStyles,
      setImageBackground,
    ]
  )

  return (
    <>
      <div>
        <h3 className="mb-3 mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <span>Pick a color:</span>
        </h3>
        <PopupColorPicker onChange={handleColorChange} color={solidColor} />
      </div>

      <div>
        <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <span>Solid Colors:</span>
        </h3>

        <div className="mt-4 flex grid-cols-5 flex-wrap gap-x-2.5 gap-y-3 md:grid w-full">
          {solidColors.slice(0, 1).map(({ background: solidBackground }) => {
            return (
              <Button
                key={solidBackground}
                className={`aspect-square overflow-hidden rounded-sm p-0 ${
                  background === solidBackground &&
                  !imageBackground &&
                  'outline-none ring-2 ring-ring ring-offset-2'
                }`}
                onClick={() => handleColorChange(solidBackground)}
                style={{ background: solidBackground }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-full w-full scale-150"
                  src="/images/transparent.jpg"
                  alt="transparent background"
                />
              </Button>
            )
          })}
          {solidColors.slice(1).map(({ background: solidBackground }) => {
            return (
              <Button
                key={solidBackground}
                variant="secondary"
                className={`h-[2.56rem] w-[2.56rem] rounded-md ${
                  background === solidBackground &&
                  !imageBackground &&
                  'outline-none ring-2 ring-ring ring-offset-2'
                }`}
                onClick={() => handleColorChange(solidBackground)}
                style={{ background: solidBackground }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
