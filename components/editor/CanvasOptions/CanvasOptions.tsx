'use client'

import {
  Dribbble,
  Facebook,
  GalleryThumbnails,
  Instagram,
  Linkedin,
  Plus,
  Minus,
  Twitter,
  UserSquare2,
  Youtube,
  GalleryHorizontalEnd,
  MonitorPlay,
  Smartphone,
  GalleryVerticalEnd,
  RectangleHorizontal,
  ArrowRight,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { resolutions } from '@/utils/config'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { Separator } from '@/components/ui/Separator'
import { ResolutionButton } from './ResolutionButton'
import RoundnessSettings from './RoundnessSettings'
import { Input } from '@/components/ui/Input'

const icons = {
  Youtube: <Youtube size={18} />,
  Instagram: <Instagram size={18} />,
  Facebook: <Facebook size={18} />,
  Linkedin: <Linkedin size={18} />,
  Twitter: <Twitter size={18} />,
  Dribble: <Dribbble size={18} />,
  UserSquare2: <UserSquare2 size={18} />,
  GalleryThumbnails: <GalleryThumbnails size={18} />,
  GalleryHorizontalEnd: <GalleryHorizontalEnd size={18} />,
  MonitorPlay: <MonitorPlay size={18} />,
  Smartphone: <Smartphone size={18} />,
  SmartphoneLandscape: <Smartphone className="-rotate-90" size={18} />,
  GalleryVerticalEnd: <GalleryVerticalEnd size={18} />,
  RectangleHorizontal: <RectangleHorizontal size={18} />,
}

const splitResolution = (resolution: string) => resolution.split('x')

export default function CanvasOptions() {
  const {
    resolution,
    setResolution,
    domResolution,
    scrollScale,
    setScrollScale,
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
      <h1 className="mb-3 mt-4 px-1 text-[0.85rem]">Custom Resolution</h1>
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
        <Button type="submit" variant="outline" className="rounded-lg text-sm">
          <ArrowRight size={18} />
        </Button>
      </form>
      <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Aspect ratio</h1>
      <div className="flex flex-wrap gap-3">
        {resolutions.slice(0, 7).map((res, index) => (
          <ResolutionButton
            key={index}
            resolution={res.resolution}
            name={res.name}
            icon={icons[res.icon as keyof typeof icons]}
            variant={res.resolution === resolution ? 'stylish' : 'outline'}
            className="rounded-lg"
          />
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={`flex items-center gap-2 rounded-lg`}
              variant="outline"
            >
              <span>
                <Plus size={20} />
              </span>
              <span>More...</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-[350px] flex-wrap gap-3">
            {resolutions.slice(7).map((res, index) => (
              <ResolutionButton
                key={index}
                resolution={res.resolution}
                name={res.name}
                icon={icons[res.icon as keyof typeof icons]}
                variant={res.resolution === resolution ? 'stylish' : 'outline'}
                className="rounded-lg"
              />
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <Separator className="mt-8 h-[0.1rem] w-full" />

      <RoundnessSettings />

      <Separator className="mt-8 h-[0.1rem] w-full" />

      <h1 className="mb-3 mt-4 px-1 text-[0.85rem]">Preview scale</h1>
      <span className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center rounded-l-md bg-formDark px-2 py-2 text-dark ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed"
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
