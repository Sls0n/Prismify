import { cn } from '@/utils/buttonUtils'
import { useImageOptions } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { Button } from '@/components/ui/Button'

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
  const { setResolution, setScaleFactor, domResolution } = useResizeCanvas()
  const { isImageUploaded, image, setImageSize } = useImageOptions()

  const [outputWidth]: number[] = resolution.split('x').map(Number)
  const [domWidth]: number[] = domResolution.split('x').map(Number)

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

  return (
    <Button
      className={cn('flex items-center gap-2 rounded-lg', className)}
      variant={variant}
      onClick={() => {
        if (!isImageUploaded) return
        if (resolution === 'fit') {
          if (!image) return

          const padding = 200
          const img = new Image()
          img.src = image

          img.onload = () => {
            const { naturalWidth, naturalHeight } = img
            const newResolution = calculateCanvasSize(
              naturalWidth,
              naturalHeight,
              padding
            )
            setResolution(newResolution.toString())
            console.log(newResolution)
            setImageSize('1.5')
          }
          return
        }
        setResolution(resolution)

        setScaleFactor(outputWidth / domWidth)
      }}
      aria-label={name}
    >
      {icon && <span>{icon}</span>}
      <span>{name}</span>
    </Button>
  )
}
