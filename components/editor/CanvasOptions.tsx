'use client'

import React, { useEffect } from 'react'
import { ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { MAX_RESOLUTION, MIN_RESOLUTION, resolutions } from '@/utils/config'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Button } from '../ui/Button'
import { useResizeCanvas } from '@/hooks/use-resize-canvas'

function ResolutionButton({
  resolution,
  name,
  icon,
}: {
  resolution: string
  name: string
  icon?: React.ReactNode
}) {
  const { setResolution } = useResizeCanvas()

  return (
    <>
      <Button
        className="flex items-center gap-2 rounded-lg"
        variant="stylish"
        onClick={() => setResolution(resolution)}
        aria-label={name}
      >
        {icon && <span>{icon}</span>}
        <span>{name}</span>
      </Button>
    </>
  )
}

const icons = {
  Youtube: <Youtube size={20} />,
  Instagram: <Instagram size={20} />,
  Facebook: <Facebook size={20} />,
}

export default function CanvasOptions() {
  const { resolution, setResolution } = useResizeCanvas()
  const [customWidth, setCustomWidth] = useState('')
  const [customHeight, setCustomHeight] = useState('')

  useEffect(() => {
    const [width, height] = resolution.split('x')
    setCustomWidth(width)
    setCustomHeight(height)
  }, [resolution])

  const handleCustomWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value
    if (newWidth.length >= 3 && customHeight.length >= 3) {
      setCustomWidth(newWidth)
      setResolution(`${newWidth}x${customHeight}`)
    } else {
      setCustomWidth(newWidth)
    }
  }

  const handleCustomHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value
    if (newHeight.length >= 3 && customWidth.length >= 3) {
      setCustomHeight(newHeight)
      setResolution(`${customWidth}x${newHeight}`)
    } else {
      setCustomHeight(newHeight)
    }
  }

  return (
    <>
      <h1 className="mb-3 mt-4 px-1 text-[0.85rem]">Custom Resolution</h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={customWidth}
          onChange={handleCustomWidth}
          type="number"
          placeholder="Width"
          min={MIN_RESOLUTION}
          max={MAX_RESOLUTION}
        />
        <span className="mx-2 my-auto">x</span>
        <Input
          type="number"
          value={customHeight}
          onChange={handleCustomHeight}
          placeholder="Height"
          min={MIN_RESOLUTION}
          max={MAX_RESOLUTION}
        />
      </div>

      <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Canvas sizes</h1>
      <div className="flex flex-wrap gap-3">
        {resolutions.map((res, index) => {
          return (
            <ResolutionButton
              key={index}
              resolution={res.resolution}
              name={res.name}
              icon={
                res.icon ? icons[res.icon as keyof typeof icons] : undefined
              }
            />
          )
        })}
      </div>

      <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Patterns</h1>
      <Popover>
        <PopoverTrigger className="relative flex h-14 items-center overflow-hidden rounded-lg border border-border bg-sidebar">
          <div className="flex h-full basis-1/5 items-center bg-purple-400"></div>
          <div className="flex h-full w-full flex-1 items-center justify-between px-4">
            <p className="text-[0.85rem] text-primary/70 dark:text-dark/70">
              {resolution}
            </p>
            <ChevronDown
              size={18}
              className="text-primary/70 dark:text-dark/80"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex w-[350px] flex-wrap gap-4">
          TODO : ADD PATTERNS
        </PopoverContent>
      </Popover>
    </>
  )
}
