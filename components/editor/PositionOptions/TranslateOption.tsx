import { Button } from '@/components/ui/Button'
import { Slider } from '@/components/ui/Slider'
import { usePositionOptions } from '@/store/use-position-options'
import { RotateCcw } from 'lucide-react'

export default function TranslateOption() {
  const { translateX, translateY, setTranslateX, setTranslateY } =
    usePositionOptions()
  return (
    <>
      <div className="mb-3 mt-2 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Translate X</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(translateX)}%`}
        </p>
        <Button
          aria-label="reset size"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() => setTranslateX(0)}
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="mb-3 flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={100}
          min={-100}
          step={0.01}
          value={[translateX]}
          onValueChange={(value: number[]) => {
            setTranslateX(value[0])
          }}
        />
      </div>

      <div className="mb-3 mt-3 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Translate Y</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(translateY)}%`}
        </p>
        <Button
          aria-label="reset size"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() => setTranslateY(0)}
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={100}
          min={-100}
          step={0.01}
          value={[translateY]}
          onValueChange={(value: number[]) => {
            setTranslateY(value[0])
          }}
        />
      </div>
    </>
  )
}
