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
import { Settings2, Sparkles, Zap, Palette, Wand2, Check, Rocket } from 'lucide-react'
import { useCallback } from 'react'
import ImageGradientPicker from './image-gradient-picker'
import { cn } from '@/utils/button-utils'

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

  const { images, updateImage } = useImageOptions()
  const { selectedImage } = useSelectedLayers()
  const [dominantColor, setDominantColor] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

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
    setIsGenerating(true)
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
      ): { linearGradients: string[]; radialGradients: string[]; meshGradients: string[] } {
        const getRandomColors = (limit: number): Color[] => {
          const randomColors: Color[] = []
          for (let i = 0; i < limit; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length)
            randomColors.push(colors[randomIndex])
          }
          return randomColors
        }

        // Linear Gradients - Clean, directional gradients with 2-3 colors
        const generateLinearGradients = (): string[] => {
          const gradients: string[] = []
          
          // Dominant to each palette color
          colors.forEach((color: Color, index: number) => {
            gradients.push(`linear-gradient(${135 + index * 30}deg, ${dominantColor} 0%, ${color} 100%)`)
          })
          
          // Two-color combinations from palette
          for (let i = 0; i < 4; i++) {
            const [color1, color2] = getRandomColors(2)
            gradients.push(`linear-gradient(${45 + i * 45}deg, ${color1} 0%, ${color2} 100%)`)
          }
          
          // Three-color smooth transitions
          for (let i = 0; i < 3; i++) {
            const [color1, color2, color3] = getRandomColors(3)
            gradients.push(`linear-gradient(${90 + i * 60}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`)
          }
          
          return gradients.slice(0, 14)
        }

        // Radial Gradients - Circular, spotlight effects
        const generateRadialGradients = (): string[] => {
          const gradients: string[] = []
          
          // Center spotlight with dominant color
          colors.forEach((color: Color) => {
            gradients.push(`radial-gradient(circle at 50% 50%, ${dominantColor} 0%, ${color} 100%)`)
          })
          
          // Off-center radials for dynamic feel
          const positions = ['20% 30%', '80% 20%', '30% 80%', '70% 70%']
          positions.forEach((pos, i) => {
            const [color1, color2] = getRandomColors(2)
            gradients.push(`radial-gradient(circle at ${pos}, ${color1} 0%, ${color2} 60%, transparent 100%)`)
          })
          
          // Elliptical radials
          for (let i = 0; i < 3; i++) {
            const [color1, color2] = getRandomColors(2)
            gradients.push(`radial-gradient(ellipse at ${50 + i * 20}% 50%, ${color1} 0%, ${color2} 100%)`)
          }
          
          return gradients.slice(0, 14)
        }

        // Mesh Gradients - Complex, multi-layered beautiful gradients
        const generateMeshGradients = (): string[] => {
          const gradients: string[] = []
          
          // Beautiful mesh gradients with multiple radial layers
          for (let i = 0; i < 14; i++) {
            const meshColors = getRandomColors(4)
            const positions = [
              { x: 10 + Math.random() * 30, y: 10 + Math.random() * 30 },
              { x: 60 + Math.random() * 30, y: 10 + Math.random() * 30 },
              { x: 10 + Math.random() * 30, y: 60 + Math.random() * 30 },
              { x: 60 + Math.random() * 30, y: 60 + Math.random() * 30 }
            ]
            
            const meshGradient = `
              radial-gradient(circle at ${positions[0].x}% ${positions[0].y}%, ${meshColors[0]} 0%, transparent 50%),
              radial-gradient(circle at ${positions[1].x}% ${positions[1].y}%, ${meshColors[1]} 0%, transparent 50%),
              radial-gradient(circle at ${positions[2].x}% ${positions[2].y}%, ${meshColors[2]} 0%, transparent 50%),
              radial-gradient(circle at ${positions[3].x}% ${positions[3].y}%, ${meshColors[3]} 0%, transparent 50%),
              linear-gradient(${45 + i * 15}deg, ${dominantColor} 0%, ${meshColors[0]} 100%)
            `.trim()
            
            gradients.push(meshGradient)
          }
          
          return gradients
        }

        const linearGradients = generateLinearGradients()
        const radialGradients = generateRadialGradients()
        const meshGradients = generateMeshGradients()

        if (images.length > 0) {
          updateImage(images[images.length - 1].id, {
            dominantColor,
            palletes,
            linearGradients,
            meshGradients,
            radialGradients,
          })
        }

        setTimeout(() => setIsGenerating(false), 800)

        return {
          linearGradients,
          radialGradients,
          meshGradients,
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

  const GradientSection = ({ title, gradients, icon: Icon, description }: { 
    title: string; 
    gradients: string[]; 
    icon: any; 
    description: string;
  }) => (
    <div className="group relative">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-purple/50" />
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <Badge className="text-xs px-2 py-0.5 bg-primary/10 0 text-purple border border-primary/10">
            {gradients?.length}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          {description}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {gradients.map((gradient: string, index: number) => (
          <Button
            key={gradient}
            type="button"
            variant="secondary"
            className={cn(
              "aspect-square h-[1.85rem] w-[1.85rem] overflow-hidden rounded-md p-[1px] transition-all duration-300",
              "hover:scale-105 hover:shadow-lg hover:shadow-primary/25 hover:brightness-105",
              " hover:ring-1 hover:ring-primary/20",
              "transform-gpu active:scale-95 active:shadow-inner",
              "group relative cursor-pointer",
              gradient === backgroundInStore && !imageBackground && 
              "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-lg shadow-primary/30 brightness-105"
            )}
            onClick={() =>
              handleGradientClick(
                {
                  gradient,
                  background: gradient,
                  type: title === 'Mesh' ? 'Mesh' : 'Normal',
                },
                title === 'Mesh'
              )
            }
            style={{ background: gradient }}
          >
            {gradient === backgroundInStore &&
              !imageBackground &&
              backgroundType !== 'mesh' && (
                <Rocket
                      className="h-4 w-4 text-white drop-shadow-lg transition-all duration-1000 repeat-infinite animate-pulse"
                    />
              )}
          </Button>
        ))}
      </div>
    </div>
  )

  console.log(dominantColor)

  return (
    <div>
      {/* Premium Header */}
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background via-muted/20 to-muted/40 p-4 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        <div className="relative">
          <h4 className="font-medium text-foreground mb-1">Adaptive Gradient</h4>
          <p className="text-sm text-muted-foreground mb-4 max-w-md">
            Generate stunning gradients matched to your image&apos;s color palette. {selectedImage ? (
              <>
                Click on the{' '}
                <button 
                  onClick={extractDominantColor}
                  disabled={!selectedImage || isGenerating}
                  className="font-medium text-purple hover:text-purple/80 underline decoration-purple/50 hover:decoration-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate
                </button>
                {' '}button to generate.
              </>
            ) : 'Please click on the image layer to generate.'}
          </p>
          
          <div
            className="transition-all duration-300"
          >
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div className="inline-block">
                    <SpotlightButton
                      as={!selectedImage ? 'div' : 'button'}
                      onClick={extractDominantColor}
                      text={isGenerating ? "Analyzing..." : (selectedImage && images[selectedImage - 1]?.linearGradients ? "Regenerate" : "Generate")}
                      disabled={!selectedImage || isGenerating}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="start"
                  className="max-w-[10rem] z-[1000] text-center"
                  style={{
                    display: selectedImage ? 'none' : 'block',
                  }}
                >
                  <div className="flex items-center text-left gap-2 mb-2">
                    <span className="font-medium">Image Required</span>

                  </div>
                  <p className="text-sm text-left">
                    Please click on the image layer on canvas first!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

                          {isGenerating && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span>Analyzing color palette...</span>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Premium Gradient Collections */}
      {selectedImage && images[selectedImage - 1]?.linearGradients && (
        <div className="mt-8 space-y-8">
          <GradientSection
            title="Linear"
            gradients={images[selectedImage - 1]?.linearGradients || []}
            icon={Wand2}
            description="Directional flow"
          />
          
          <GradientSection
            title="Radial"
            gradients={images[selectedImage - 1]?.radialGradients || []}
            icon={Sparkles}
            description="Spotlight & circular"
          />
          
          <GradientSection
            title="Mesh"
            gradients={images[selectedImage - 1]?.meshGradients || []}
            icon={Palette}
            description="Complex multi-layered"
          />

          {/* Premium Tip */}
          <div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-r from-muted/30 to-muted/50 p-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
            <div className="relative flex items-start gap-3">
             
              <div>
                <h4 className="font-medium text-foreground mb-1">Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Mesh gradients work beautifully with{' '}
                  <button 
                    onClick={() => setNoise(0.15)}
                    className="font-medium text-purple hover:text-purple/80 underline decoration-purple/50 hover:decoration-purple transition-colors"
                  >
                    15% noise
                  </button>
                  {' '}for that premium mesh effect.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <h3 className="mt-12 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
        <span>Standard Gradients</span>
      </h3>

      <div className="mt-4 flex w-full grid-cols-7 flex-wrap gap-[0.5rem] md:grid">
        {gradients.map(({ gradient, background, type }: Gradient) => (
          <Button
            key={gradient}
            type="button"
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
