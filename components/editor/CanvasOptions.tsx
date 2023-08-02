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
  RotateCcw,
  Minus,
} from 'lucide-react'
import { resolutions } from '@/utils/config'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Button } from '../ui/Button'
import { useResizeCanvas } from '@/hooks/use-resize-canvas'
import { cn } from '@/utils/buttonUtils'
import { useImageOptions } from '@/hooks/use-image-options'
import { Slider } from '@/components/ui/Slider'
import { Separator } from '@/components/ui/Separator'

export function ResolutionButton({
  resolution,
  name,
  icon,
  className,
  variant,
}: {
  resolution: string
  name: string
  icon?: React.ReactNode
  className?: string
  variant: 'outline' | 'stylish'
}) {
  const { setResolution } = useResizeCanvas()
  const { isImageUploaded } = useImageOptions()

  return (
    <>
      <Button
        className={cn('flex items-center gap-2 rounded-lg', className)}
        variant={variant}
        onClick={() => {
          if (!isImageUploaded) return
          setResolution(resolution)
        }}
        aria-label={name}
      >
        {icon && <span>{icon}</span>}
        <span>{name}</span>
      </Button>
    </>
  )
}

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
  GalleryVerticalEnd: <GalleryVerticalEnd size={18} />,
  RectangleHorizontal: <RectangleHorizontal size={18} />,
}

export default function CanvasOptions() {
  const { resolution, domResolution, canvasRoundness, setCanvasRoundness } =
    useResizeCanvas()

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
          if (index < 7) {
            return (
              <ResolutionButton
                key={index}
                resolution={res.resolution}
                name={res.name}
                icon={
                  res.icon ? icons[res.icon as keyof typeof icons] : undefined
                }
                variant={`${
                  res.resolution === resolution ? 'stylish' : 'outline'
                }`}
                className="rounded-lg"
              />
            )
          }
        })}
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
            {resolutions.map((res, index) => {
              if (index >= 7) {
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
                    variant={`${
                      res.resolution === resolution ? 'stylish' : 'outline'
                    }`}
                    className="rounded-lg"
                  />
                )
              }
            })}
          </PopoverContent>
        </Popover>
      </div>

      <Separator className="mt-8 h-[0.1rem] w-full" />

      <div className="mb-3 mt-8 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Roundness</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round((canvasRoundness / 3) * 100)} `}
        </p>
        <Button variant="secondary" size="sm" className="ml-auto translate-x-2">
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>
      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={3}
          min={0}
          step={0.01}
          value={[canvasRoundness]}
          onValueChange={(value: number[]) => {
            setCanvasRoundness(value[0])
          }}
        />
      </div>
    </>
  )
}
