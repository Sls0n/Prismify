import { Button } from '@/components/ui/Button'
import { Slider } from '@/components/ui/Slider'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { RotateCcw } from 'lucide-react'

export default function RoundnessSettings() {
  const { canvasRoundness, setCanvasRoundness } = useResizeCanvas()

  return (
    <>
      <div className="mb-3 mt-4 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Roundness</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round((canvasRoundness / 3) * 100)} `}
        </p>
        <Button
          aria-label="reset roundness"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
        >
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
