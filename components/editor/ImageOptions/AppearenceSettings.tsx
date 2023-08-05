import { Button } from '@/components/ui/Button'
import { useImageOptions } from '@/hooks/use-image-options'
import { Slider } from '@/components/ui/Slider'
import { RotateCcw } from 'lucide-react'

export default function AppearenceSettings() {
  const { imageSize, setImageSize, setImageRoundness, imageRoundness } =
    useImageOptions()
  return (
    <>
      <div className="mb-3 mt-8 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Size</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {Math.round(Number(imageSize) * 100)}%
        </p>
        <Button
          aria-label="reset size"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[1]}
          max={3}
          min={0.25}
          step={0.01}
          onValueChange={(value: number[]) => {
            setImageSize(value[0].toString())
          }}
        />
      </div>

      {/* Roundness */}
      <div className="mb-3 mt-9 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Roundness</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round((imageRoundness / 4) * 100)} `}
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
          defaultValue={[1]}
          max={4}
          min={0}
          step={0.01}
          onValueChange={(value) => {
            setImageRoundness(value[0])
          }}
        />
      </div>
    </>
  )
}
