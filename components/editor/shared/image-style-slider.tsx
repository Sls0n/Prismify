'use client'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useMoveable } from '@/store/use-moveable'
import { RotateCcw } from 'lucide-react'
import {
  useImageOptions,
  useSelectedLayers,
  ImageStyle,
} from '@/store/use-image-options'

interface ImageStyleSliderProps {
  label: string
  property: keyof ImageStyle
  min: number
  max: number
  step?: number
  defaultValue: number
  unit?: string
  incrementStep?: number
}

export default function ImageStyleSlider({
  label,
  property,
  min,
  max,
  step = 0.0001,
  defaultValue,
  unit = 'px',
  incrementStep = 1,
}: ImageStyleSliderProps) {
  const { images, updateImageStyle } = useImageOptions()
  const { selectedImage } = useSelectedLayers()
  const { setShowControls } = useMoveable()

  const currentValue = selectedImage
    ? (images[selectedImage - 1]?.style[property] as number)
    : defaultValue

  const handleUpdate = (value: number) => {
    if (selectedImage) {
      updateImageStyle(selectedImage, { [property]: value })
    }
  }

  return (
    <>
      <div className="mb-3 flex items-center px-1 md:max-w-full">
        <h1 className="text-[0.85rem]">{label}</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-dark/70">
          {`${Math.round(currentValue)}${unit}`}
        </p>
        <Button
          aria-label={`reset ${label.toLowerCase()}`}
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() => handleUpdate(defaultValue)}
        >
          <RotateCcw size={15} className="text-dark/80" />
        </Button>
      </div>

      <div className="mb-3 flex gap-4 text-[0.85rem] md:max-w-full">
        <Slider
          defaultValue={[defaultValue]}
          max={max}
          min={min}
          step={step}
          value={[currentValue]}
          onValueChange={(value: number[]) => {
            handleUpdate(value[0])
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
          onIncrement={() => {
            if (currentValue < max) {
              handleUpdate(Number(currentValue) + incrementStep)
            }
          }}
          onDecrement={() => {
            if (currentValue > min) {
              handleUpdate(Number(currentValue) - incrementStep)
            }
          }}
        />
      </div>
    </>
  )
}
