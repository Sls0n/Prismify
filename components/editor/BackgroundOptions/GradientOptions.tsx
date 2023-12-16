'use client'

import React, { useState } from 'react'

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
import SpotlightButton from '@/components/ui/SpotlightButton'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'

type Color = string

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
    const ColorThief = (await import('colorthief')).default
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

        const generateRadialGradient = (
          startColor: Color,
          endColor: Color
        ): string => {
          return `radial-gradient(circle, ${startColor}, ${endColor})`
        }

        const linearGradients: string[] = colors.map((color: Color) => {
          const gradient = generateLinearGradient(dominantColor, color)
          return gradient
        })

        const radialGradients: string[] = []
        for (let i = 0; i < 5; i++) {
          const randomColors: Color[] = getRandomColors(3)
          const gradient = generateRadialGradient(
            dominantColor,
            randomColors.join(',')
          )
          radialGradients.push(gradient)
        }

        setImages(
          images.map((image, index) =>
            index === images.length - 1
              ? {
                  ...image,
                  dominantColor,
                  palletes,
                  linearGradients,
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
    <>
      <div>
        <h3 className="mt-8 flex items-center gap-1.5 text-xs font-medium uppercase text-dark/70">
          <p>Adaptive</p>
          <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium capitalize text-purple shadow-sm ring-1 ring-inset ring-indigo-500/20 dark:bg-indigo-500/10">
            Beta
          </span>
          :
        </h3>

        <div
          className="mt-4 md:max-w-[18rem]"
          style={{
            // @ts-ignore
            display: !images[selectedImage - 1]?.linearGradients ? '' : 'none',
          }}
        >
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <SpotlightButton
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
          <div className="mt-4 grid auto-rows-auto grid-cols-6 gap-4 md:max-w-[18rem] md:grid-cols-8">
            {images[selectedImage - 1]?.linearGradients?.map(
              (gradient: string) => (
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

            {/* {images[images.length - 1]?.radialGradients?.map(
            (gradient: string) => (
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
          )} */}
          </div>
        )}

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
