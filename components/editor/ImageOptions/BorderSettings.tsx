import { Button } from '@/components/ui/Button'
import { useImageOptions } from '@/store/use-image-options'
import { Slider } from '@/components/ui/Slider'
import { RotateCcw } from 'lucide-react'
import { useFrameOptions } from '@/store/use-frame-options'
import PopupColorPicker from '@/components/PopupColorPicker'

export default function BorderSettings() {
  const {
    setBorderSize,
    setImageRoundness,
    imageRoundness,
    borderColor,
    setBorderColor,
    borderSize,
  } = useImageOptions()
  const { browserFrame } = useFrameOptions()

  const handleColorChange = (color: string) => {
    setBorderColor(color)
    document.documentElement.style.setProperty('--borderColor', color)
  }

  return (
    <>
      <div
        className={`mb-3 mt-2 flex max-w-[70%] items-center px-1 ${
          browserFrame !== 'None' && 'cursor-not-allowed opacity-50'
        }`}
      >
        <h1 className="text-[0.85rem]">Width</h1>
      </div>

      <div
        className={`flex max-w-[70%] gap-4 text-[0.85rem] ${
          browserFrame !== 'None' && 'pointer-events-none  opacity-50'
        }`}
      >
        <Slider
          defaultValue={[0]}
          max={20}
          min={0}
          step={0.01}
          onValueChange={(value: number[]) => {
            setBorderSize(value[0].toString())
            document.documentElement.style.setProperty(
              '--borderSize',
              `${value.toString()}px`
            )
            document.documentElement.style.setProperty(
              '--borderColor',
              borderColor
            )
          }}
          value={[+borderSize!]}
          disabled={browserFrame !== 'None'}
        />
      </div>

      {/* Roundness */}
      <div
        className={`mb-3 mt-9 flex max-w-[70%] items-center px-1 ${
          browserFrame !== 'None' && 'pointer-events-none  opacity-50'
        }`}
      >
        <h1 className="text-[0.85rem]">Radius</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round((imageRoundness / 4) * 100)} `}
        </p>

        <Button
          aria-label="reset border radius"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() => {
            setImageRoundness(0.7)
            document.documentElement.style.setProperty(
              '--borderRoundness',
              `0.6rem`
            )
          }}
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div
        className={`flex max-w-[70%] gap-4 text-[0.85rem] ${
          browserFrame !== 'None' && 'pointer-events-none  opacity-50'
        }`}
      >
        <Slider
          defaultValue={[1]}
          max={4}
          min={0}
          step={0.01}
          onValueChange={(value) => {
            setImageRoundness(value[0])
            document.documentElement.style.setProperty(
              '--borderRoundness',
              `${value.toString()}rem`
            )
          }}
          value={[imageRoundness]}
          disabled={browserFrame !== 'None'}
        />
      </div>

      <div
        className={`mt-8 flex flex-col gap-3 px-1 ${
          browserFrame !== 'None' && 'pointer-events-none opacity-50'
        }`}
      >
        <h1 className="text-[0.85rem]">Border color</h1>
        <PopupColorPicker color={borderColor} onChange={handleColorChange} />
      </div>
    </>
  )
}
