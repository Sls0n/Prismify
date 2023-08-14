import { Slider } from '@/components/ui/Slider'
import { useImageOptions } from '@/store/use-image-options'

type SizeOptionProps = {
  text?: string
}

export default function SizeOption({ text = 'Size' }: SizeOptionProps) {
  const { imageSize, setImageSize } = useImageOptions()
  return (
    <>
      <div className="mb-3 mt-2 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">{text}</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {Math.round(Number(imageSize) * 100)}%
        </p>
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
    </>
  )
}
