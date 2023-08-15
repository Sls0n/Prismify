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
  const { isImageUploaded } = useImageOptions()

  const [outputWidth]: number[] = resolution.split('x').map(Number)
  const [domWidth]: number[] = domResolution.split('x').map(Number)

  return (
    <Button
      className={cn('flex items-center gap-2 rounded-lg', className)}
      variant={variant}
      onClick={() => {
        if (!isImageUploaded) return
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
