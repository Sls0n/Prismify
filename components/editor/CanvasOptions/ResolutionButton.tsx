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
  const { setResolution } = useResizeCanvas()
  const { isImageUploaded } = useImageOptions()

  return (
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
  )
}
