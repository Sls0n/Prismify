import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { RotateCcw } from 'lucide-react'

export default function CanvasRoundnessSlider() {
  const { canvasRoundness, setCanvasRoundness } = useResizeCanvas()

  return (
    <>
      <div className="mb-3 mt-4 flex items-center px-1 md:max-w-full">
        <h1 className="text-[0.85rem]">Roundness</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-dark/70">
          {`${Math.round((canvasRoundness / 3) * 100)} `}
        </p>
        <Button
          aria-label="reset roundness"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() => setCanvasRoundness(0)}
        >
          <RotateCcw size={15} className="text-dark/80" />
        </Button>
      </div>
      <div className="flex gap-4 text-[0.85rem] md:max-w-full">
        <Slider
          defaultValue={[0]}
          max={3}
          min={0}
          step={0.01}
          value={[canvasRoundness]}
          onValueChange={(value: number[]) => {
            setCanvasRoundness(value[0])
          }}
          onDecrement={() => {
            if (canvasRoundness <= 0) return
            setCanvasRoundness(canvasRoundness - 0.03)
          }}
          onIncrement={() => {
            if (canvasRoundness >= 3) return
            setCanvasRoundness(canvasRoundness + 0.03)
          }}
        />
      </div>
    </>
  )
}
