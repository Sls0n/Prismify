'use client'

import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import CircularSliderComp from '@/components/ui/circular-slider'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import SpotlightButton from '@/components/ui/spotlight-button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { gradients, type Gradient } from '@/utils/presets/gradients'
import ColorThief from 'colorthief'
import { Settings2 } from 'lucide-react'
import { useCallback } from 'react'
import ImageGradientPicker from './image-gradient-picker'

type Color = string

export default function NormalGradientPicker() {
  const {
    setBackground,
    background: backgroundInStore,
    setBackgroundType,
    backgroundType,
    setImageBackground,
    imageBackground,
    setAttribution,
    setNoise,
  } = useBackgroundOptions()

  const { images, setImages } = useImageOptions()
  const { selectedImage } = useSelectedLayers()
  const [dominantColor, setDominantColor] = useState(null)

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

  const extractDominantColor = async () => {
    const colorThief = new ColorThief()
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src =
      document.getElementById(`img-${selectedImage}`)?.getAttribute('src') ?? ''

    image.onload = function () {
      const palletes = colorThief.getPalette(image, 8)
      const dominantColor = colorThief.getColor(image)

      function generateGradients(
        dominantColor: Color,
        colors: Color[]
      ): { linearGradients: string[]; radialGradients: string[] } {
        const getRandomColors = (limit: number): Color[] => {
          const randomColors: Color[] = []
          for (let i = 0; i < limit; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length)
            randomColors.push(colors[randomIndex])
          }
          return randomColors
        }

        const generateLinearGradient = (
          startColor: Color,
          endColor: Color
        ): string => {
          return `linear-gradient(var(--gradient-angle), ${startColor}, ${endColor})`
        }

        // const generateLinear gradient by randomly selecting colors from palletes some 2 colors combination some 3 colors combination max 4 colors combination
        const generateRandomLinearGradient = (): string => {
          const randomColors: Color[] = getRandomColors(
            Math.floor(Math.random() * 3) + 2
          )
          const gradient = generateLinearGradient(
            dominantColor,
            randomColors.join(',')
          )
          return gradient
        }

        const generateRadialGradient = (
          startColor: Color,
          endColor: Color
        ): string => {
          return `linear-gradient(var(--gradient-angle), ${startColor}, ${endColor})`
        }

        const linearGradients: string[] = colors.map((color: Color) => {
          const gradient = generateLinearGradient(dominantColor, color)
          const randomLinearGradient = generateRandomLinearGradient()

          return gradient
        })

        const meshGradients: string[] = colors.map((color: Color) => {
          const gradient = generateRandomLinearGradient()
          return gradient
        })

        // select two different colors from palletes dont select dominant color
        const randomColors: Color[] = getRandomColors(2)

        const radialGradients: string[] = colors.map((color: Color) => {
          const gradient = generateRadialGradient(randomColors[0], color)
          return gradient
        })

        setImages(
          images.map((image, index) =>
            index === images.length - 1
              ? {
                  ...image,
                  dominantColor,
                  palletes,
                  linearGradients,
                  meshGradients,
                  radialGradients,
                }
              : image
          )
        )

        return {
          linearGradients,
          radialGradients,
        }
      }

      generateGradients(
        // @ts-ignore
        `rgb(${dominantColor.join(',')})`,
        // @ts-ignore
        palletes.map((pallete) => `rgb(${pallete.join(',')})`)
      )
    }
  }

  console.log(dominantColor)

  return (
    <div>
      <h3 className="mt-8 flex items-center gap-1.5 text-xs font-medium text-dark/70">
        <p className="uppercase">Adaptive</p>
        <Badge>Beta</Badge>:
      </h3>

      <div
        className="mt-4 "
        style={{
          // @ts-ignore
          display: !images[selectedImage - 1]?.linearGradients ? '' : 'none',
        }}
      >
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <SpotlightButton
                as={!selectedImage ? 'div' : 'button'}
                onClick={extractDominantColor}
                text="Generate"
                disabled={!selectedImage}
              />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={10}
              align="center"
              className="max-w-[15rem]"
              style={{
                display: selectedImage ? 'none' : 'block',
              }}
            >
              You need to select/load an image first to generate adaptive
              backgrounds based on it.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {selectedImage && images[selectedImage - 1]?.linearGradients && (
        <>
          <div className="mt-4 flex grid-cols-7 flex-wrap gap-[0.5rem] md:grid">
            {images[selectedImage - 1]?.linearGradients?.map(
              (gradient: string) => (
                <Button
                  key={gradient}
                  variant="secondary"
                  className={`aspect-square h-[1.85rem] w-[1.85rem] overflow-hidden rounded-md p-[1px] ${
                    gradient === backgroundInStore &&
                    !imageBackground &&
                    'outline-none ring-2 ring-ring ring-offset-2'
                  }`}
                  onClick={() =>
                    handleGradientClick(
                      {
                        gradient,
                        background: gradient,
                        type: 'Normal',
                      },
                      false
                    )
                  }
                  style={{ background: gradient }}
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
              )
            )}

            {images[images.length - 1]?.radialGradients?.map(
              (gradient: string) => (
                <Button
                  key={gradient}
                  variant="secondary"
                  className={`aspect-square h-[1.85rem] w-[1.85rem] overflow-hidden rounded-md p-[1px] ${
                    gradient === backgroundInStore &&
                    !imageBackground &&
                    'outline-none ring-2 ring-ring ring-offset-2'
                  }`}
                  onClick={() =>
                    handleGradientClick(
                      {
                        gradient,
                        background: gradient,
                        type: 'Mesh',
                      },
                      false
                    )
                  }
                  style={{ background: gradient }}
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
              )
            )}

            {images[images.length - 1]?.meshGradients?.map(
              (gradient: string) => (
                <Button
                  key={gradient}
                  variant="secondary"
                  className={`aspect-square h-[1.85rem] w-[1.85rem] overflow-hidden rounded-md p-[1px] ${
                    gradient === backgroundInStore &&
                    !imageBackground &&
                    'outline-none ring-2 ring-ring ring-offset-2'
                  }`}
                  onClick={() =>
                    handleGradientClick(
                      {
                        gradient,
                        background: gradient,
                        type: 'Mesh',
                      },
                      false
                    )
                  }
                  style={{ background: gradient }}
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
              )
            )}
          </div>

          <button onClick={() => setNoise(0.25)}>
            <p className="mt-4 text-start text-sm text-dark/50">
              <span className="font-bold opacity-80">TIP</span> &mdash; Use
              these with about 25% of noise.
            </p>
          </button>
        </>
      )}

      <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <span>Gradients:</span>
      </h3>

      <div className="mt-4 w-full flex grid-cols-7 flex-wrap gap-[0.5rem] md:grid">
        {gradients.map(({ gradient, background, type }: Gradient) => (
          <Button
            key={gradient}
            variant="secondary"
            className={`h-[1.85rem] w-[1.85rem] overflow-hidden rounded-md p-[1px] ${
              gradient === backgroundInStore &&
              !imageBackground &&
              'outline-none ring-2 ring-ring ring-offset-2'
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
                    <Settings2 className="flex-center" color="#333" size={20} />
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

      <ImageGradientPicker />
    </div>
  )
}
