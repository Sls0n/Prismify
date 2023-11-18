'use client'

import { Button } from '@/components/ui/Button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { useBackgroundOptions } from '@/store/use-background-options'
import { Gradient, gradients } from '@/utils/config'
import { useCallback } from 'react'
import ImageGradients from './ImageGradients'
import { Settings2 } from 'lucide-react'
import CircularSliderComp from '@/components/ui/CircularSlider'

export default function GradientOptions() {
  const {
    setBackground,
    background: backgroundInStore,
    setBackgroundType,
    backgroundType,
    setImageBackground,
    imageBackground,
    setAttribution,
  } = useBackgroundOptions()

  const handleGradientClick = useCallback(
    (gradient: Gradient, isMesh: boolean) => {
      if (typeof window === 'undefined') return
      document?.documentElement.style.setProperty(
        '--gradient-bg',
        gradient.gradient
      )
      document?.documentElement.style.setProperty(
        '--mesh-bg',
        isMesh ? gradient.background! : gradient.gradient
      )
      setBackground(gradient.gradient)
      setBackgroundType(isMesh ? 'mesh' : 'gradient')
      setImageBackground(null)
      setAttribution({ name: null, link: null })
    },
    [setBackground, setBackgroundType, setImageBackground, setAttribution]
  )

  return (
    <>
      <div>
        <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <span>Gradients:</span>
        </h3>

        <div className="mt-4 grid auto-rows-auto grid-cols-6 gap-4 md:max-w-[18rem] md:grid-cols-8">
          {gradients.map(({ gradient, background, type }: Gradient) => (
            <Button
              key={gradient}
              variant="secondary"
              className={`aspect-square h-8 w-8 overflow-hidden rounded-md p-[1px] ${
                gradient === backgroundInStore &&
                !imageBackground &&
                'outline-none ring-2 ring-ring ring-offset-1'
              }`}
              onClick={() =>
                handleGradientClick(
                  {
                    gradient,
                    background,
                    type: 'Normal',
                  },
                  type === 'Mesh' // will be true if its of type Mesh
                )
              }
              style={
                type === 'Normal'
                  ? { background: gradient }
                  : { backgroundColor: background, backgroundImage: gradient }
              }
            >
              {gradient === backgroundInStore &&
                !imageBackground &&
                backgroundType !== 'mesh' && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Settings2
                        className="flex-center"
                        color="#333"
                        size={20}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="flex w-[12rem] flex-col items-center gap-3">
                      <h1 className="text-[0.85rem]">Gradient angle</h1>
                      <div className={`circular-slider`}>
                        <CircularSliderComp />
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
            </Button>
          ))}
        </div>

        <ImageGradients />
      </div>
    </>
  )
}
