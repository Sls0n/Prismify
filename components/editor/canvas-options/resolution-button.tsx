import { useState } from 'react'
import { cn } from '@/utils/button-utils'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PopoverArrow } from '@radix-ui/react-popover'
import { ChevronDown } from 'lucide-react'
import { calculateEqualCanvasSize } from '@/utils/helper-fns'

export function ResolutionButton({
  resolutions,
  name,
  icon,
  className,
  color,
  variant,
}: {
  resolutions: any
  name: string
  icon?: React.ReactNode
  className?: string
  color?: string
  variant: 'outline' | 'stylish'
}) {
  const [isHovering, setIsHovering] = useState(false)

  const { setResolution, setScaleFactor, domResolution } = useResizeCanvas()
  const { images, setImages, initialImageUploaded } = useImageOptions()
  const { selectedImage } = useSelectedLayers()

  const [domWidth]: number[] = domResolution.split('x').map(Number)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const calculateCanvasSize = (
    imgWidth: number,
    imgHeight: number,
    padding: number
  ) => {
    const aspectRatio = imgWidth / imgHeight
    let canvasWidth, canvasHeight

    if (aspectRatio > 1) {
      canvasWidth = imgWidth + 2 * padding
      canvasHeight = canvasWidth / aspectRatio
    } else {
      canvasHeight = imgHeight + 2 * padding
      canvasWidth = canvasHeight * aspectRatio
    }

    return `${canvasWidth}x${canvasHeight}`
  }

  if (name === 'Fit') {
    return (
      <Button
        name="Fit"
        size="sm"
        className={cn('flex items-center gap-2 rounded-lg', className)}
        variant={variant}
        onClick={() => {
          if (images.length === 0) return

          const padding = 200
          const img = new Image()
          img.src = images[0].image

          img.onload = () => {
            const { naturalWidth, naturalHeight } = img
            const newResolution = calculateCanvasSize(
              naturalWidth,
              naturalHeight,
              padding
            )
            setResolution(newResolution.toString())
            selectedImage &&
              setImages(
                images.map((image, index) =>
                  index === selectedImage - 1
                    ? {
                        ...image,
                        style: {
                          ...image.style,
                          imageSize: '0.75',
                        },
                      }
                    : image
                )
              )
          }
        }}
        aria-label={name}
      >
        Fit image
      </Button>
    )
  }

  if (name === 'Equal padding') {
    return (
      <Button
        name="Equal padding"
        size="sm"
        className={cn('flex items-center gap-2 rounded-lg', className)}
        variant={variant}
        onClick={() => {
          if (images.length === 0) return

          const padding = 250
          const img = new Image()
          img.src = images[0].image

          img.onload = () => {
            const { naturalWidth, naturalHeight } = img
            const newResolution = calculateEqualCanvasSize(
              naturalWidth,
              naturalHeight,
              padding
            )
            setResolution(newResolution.toString())
            selectedImage &&
              setImages(
                images.map((image, index) =>
                  index === selectedImage - 1
                    ? {
                        ...image,
                        style: {
                          ...image.style,
                          imageSize: '0.75',
                        },
                      }
                    : image
                )
              )
          }
        }}
        aria-label={name}
      >
        Equal padding
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={cn(
            'flex items-center gap-1.5 rounded-lg transition-colors',
            className
          )}
          style={{
            backgroundColor: isHovering ? `${color}1A` : '',
            color: isHovering ? `${color}` : '',
            borderColor: isHovering ? `${color}33` : '',
          }}
          variant={variant}
          size="sm"
        >
          {icon && <div>{icon}</div>}
          <div className="sr-only">{name}</div>
          <ChevronDown size={18} className="translate-y-[1.5px] text-inherit" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        avoidCollisions
        className="grid w-[220px] grid-cols-1 gap-3"
      >
        <PopoverArrow
          width={14}
          height={7}
          className="stroke fill-[#1A1C1F] stroke-border"
        />
        {resolutions?.map((res: { resolution: string; preset: string }) => {
          return (
            <Button
              onClick={() => {
                const [outputWidth]: number[] = res.resolution
                  .split('x')
                  .map(Number)

                if (!initialImageUploaded) return

                setResolution(res.resolution)

                setScaleFactor(outputWidth / domWidth)
              }}
              variant="stylish"
              size={'sm'}
              style={{
                backgroundColor: `${color}1A`,
                color: `${color}`,
                borderColor: `${color}33`,
              }}
              key={res.resolution}
            >
              <p>{`${res.preset}`}</p>
              &nbsp;
              <p>({res.resolution})</p>
            </Button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
