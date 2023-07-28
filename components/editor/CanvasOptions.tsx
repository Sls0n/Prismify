'use client'

import {
  Dribbble,
  Facebook,
  GalleryThumbnails,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
  UserSquare2,
  Youtube,
  GalleryHorizontalEnd,
  MonitorPlay,
  Smartphone,
  GalleryVerticalEnd,
  RectangleHorizontal,
} from 'lucide-react'
import { resolutions, qualities } from '@/utils/config'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Button } from '../ui/Button'
import { useResizeCanvas } from '@/hooks/use-resize-canvas'
import { useImageQualityStore } from '@/hooks/use-image-quality'
import { cn } from '@/utils/buttonUtils'

function ResolutionButton({
  resolution,
  name,
  icon,
  className,
}: {
  resolution: string
  name: string
  icon?: React.ReactNode
  className?: string
}) {
  const { setResolution } = useResizeCanvas()

  return (
    <>
      <Button
        className={cn('flex items-center gap-2 rounded-lg', className)}
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
  Linkedin: <Linkedin size={20} />,
  Twitter: <Twitter size={20} />,
  Dribble: <Dribbble size={20} />,
  UserSquare2: <UserSquare2 size={20} />,
  GalleryThumbnails: <GalleryThumbnails size={20} />,
  GalleryHorizontalEnd: <GalleryHorizontalEnd size={20} />,
  MonitorPlay: <MonitorPlay size={20} />,
  Smartphone: <Smartphone size={20} />,
  GalleryVerticalEnd: <GalleryVerticalEnd size={20} />,
  RectangleHorizontal: <RectangleHorizontal size={20} />,
}

export default function CanvasOptions() {
  const { resolution, domResolution } = useResizeCanvas()
  const { quality, setQuality } = useImageQualityStore()

  return (
    <>
      <h1 className="mb-3 mt-4 px-1 text-[0.85rem]">Current Resolution</h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="w-full rounded-lg border border-border bg-formDark px-4 py-2 text-sm ">
          {domResolution.split('x')[0]}
        </div>
        <span className="mx-2 my-auto">x</span>
        <div className="w-full rounded-lg border border-border bg-formDark px-4 py-2 text-sm ">
          {domResolution.split('x')[1]}
        </div>
      </div>

      <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Aspect ratio</h1>
      <div className="flex flex-wrap gap-3">
        {resolutions.map((res, index) => {
          if (index < 8) {
            return (
              <ResolutionButton
                key={index}
                resolution={res.resolution}
                name={res.name}
                icon={
                  res.icon ? icons[res.icon as keyof typeof icons] : undefined
                }
                className={`${
                  res.resolution === resolution && 'ring-[#898aeb]/50'
                }`}
              />
            )
          }
        })}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="flex items-center gap-2 rounded-lg"
              variant="stylish"
            >
              <span>
                <Plus size={20} />
              </span>
              <span>More...</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-[350px] flex-wrap gap-3">
            {resolutions.map((res, index) => {
              if (index > 8) {
                return (
                  <ResolutionButton
                    key={index}
                    resolution={res.resolution}
                    name={res.name}
                    icon={
                      res.icon
                        ? icons[res.icon as keyof typeof icons]
                        : undefined
                    }
                    className={`${
                      res.resolution === resolution && 'ring-[#898aeb]/50'
                    }`}
                  />
                )
              }
            })}
          </PopoverContent>
        </Popover>
      </div>

      <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Image quality</h1>
      <div className="flex flex-wrap gap-3">
        {qualities.map((q) => {
          return (
            <Button
              key={q.quality}
              variant="stylish"
              onClick={() => {
                setQuality(q.value)
              }}
              className={`rounded-lg ${
                q.value === quality && 'ring-[#898aeb]/50'
              }`}
              aria-label="quality"
            >
              {q.quality}
            </Button>
          )
        })}
      </div>

      {/* <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Patterns</h1> */}
      {/* <Popover>
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
      </Popover> */}
    </>
  )
}
