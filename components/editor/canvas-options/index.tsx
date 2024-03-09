'use client'

import {
  Dribbble,
  Facebook,
  Instagram,
  Linkedin,
  Plus,
  Minus,
  Twitter,
  Youtube,
  ArrowRight,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { resolutions } from '@/utils/presets/resolutions'
import { Button } from '@/components/ui/button'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { Separator } from '@/components/ui/separator'
import { ResolutionButton } from './resolution-button'
import CanvasRoundnessSlider from './canvas-roundness-slider'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import Icon from '@/components/icons'

const icons = {
  Youtube: <Youtube size={18} />,
  Instagram: <Instagram size={18} />,
  Facebook: <Facebook size={18} />,
  LinkedIn: <Linkedin size={18} />,
  Twitter: <Twitter size={18} />,
  Dribble: <Dribbble size={18} />,
  ProductHunt: (
    <div className="flex-center h-6 w-6 rounded-full bg-[#898aeb]/5">P</div>
  ),
}

const splitResolution = (resolution: string) => resolution.split('x')

export default function CanvasOptions() {
  const {
    setResolution,
    domResolution,
    scrollScale,
    setScrollScale,
    automaticResolution,
    setAutomaticResolution,
  } = useResizeCanvas()

  const [width, height] = splitResolution(domResolution)

  const [inputResolution, setInputResolution] = useState({
    inputWidth: width,
    inputHeight: height,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setResolution(
      `${inputResolution.inputWidth}x${inputResolution.inputHeight}`
    )
  }

  useEffect(() => {
    setInputResolution({
      inputWidth: `${Math.round(+width)}`,
      inputHeight: `${Math.round(+height)}`,
    })
  }, [height, width])

  return (
    <>
      <div className="mt-4 flex w-full justify-between px-1">
        <div className="flex-center">
          <h1 className="mr-1 text-[0.85rem]">Auto resolution</h1>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <Icon variant="duotone" name="info" color="none" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[12rem]">
                <p>
                  When enabled, the canvas will automatically resize to fit your
                  image when you upload it.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Switch
          checked={automaticResolution}
          onCheckedChange={(checked) => {
            setAutomaticResolution(checked)
          }}
        />
      </div>

      <hr className="my-4 border-border" />

      <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Custom Resolution</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <Input
          type="number"
          value={inputResolution.inputWidth}
          min={100}
          max={5000}
          onChange={(e) => {
            setInputResolution({
              ...inputResolution,
              inputWidth: e.target.value,
            })
          }}
          className="rounded-lg text-sm"
        />
        <span className="mx-2 my-auto">x</span>
        <Input
          type="number"
          value={inputResolution.inputHeight}
          min={100}
          max={5000}
          className="rounded-lg text-sm"
          onChange={(e) => {
            setInputResolution({
              ...inputResolution,
              inputHeight: e.target.value,
            })
          }}
        />
        <Button
          type="submit"
          variant="outline"
          className="rounded-lg px-3 text-sm"
        >
          <ArrowRight size={18} />
        </Button>
      </form>

      <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Resolutions</h1>
      <div className="flex flex-wrap gap-3">
        {resolutions.map((res, index) => (
          <ResolutionButton
            key={index}
            resolutions={res?.resolutions}
            name={res?.name}
            icon={icons[res?.icon as keyof typeof icons]}
            // variant={res.resolutions === resolution ? 'stylish' : 'outline'}
            color={res.color}
            variant="stylish"
            className="rounded-lg"
          />
        ))}
      </div>
      <Separator className="mt-8 h-[0.1rem] w-full" />

      <CanvasRoundnessSlider />

      <Separator className="mt-8 h-[0.1rem] w-full" />

      <h1 className="mb-3 mt-4 px-1 text-[0.85rem]">Preview scale</h1>
      <span className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center rounded-l-md  px-2 py-2 ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed bg-formDark text-dark"
          disabled={scrollScale === 1}
          onClick={() => {
            if (scrollScale === 1) return
            setScrollScale(scrollScale + 0.1)
          }}
        >
          <span className="sr-only">Scale up</span>
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md bg-formDark px-2 py-2 text-dark ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed"
          disabled={scrollScale <= 0.4}
          onClick={() => {
            if (scrollScale <= 0.4) return
            setScrollScale(scrollScale - 0.1)
          }}
        >
          <span className="sr-only">Scale down</span>
          <Minus className="h-5 w-5" aria-hidden="true" />
        </button>
      </span>
    </>
  )
}
