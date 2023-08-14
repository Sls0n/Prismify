import { Slider } from '@/components/ui/Slider'
import { useImageOptions } from '@/store/use-image-options'

export default function RoundnessOption() {
  const { imageRoundness, setImageRoundness } = useImageOptions()
  return (
    <>
      <div className="mb-3 mt-8 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Roundness</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round((imageRoundness / 4) * 100)} `}
        </p>
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
          value={[imageRoundness]}
        />
      </div>
    </>
  )
}
