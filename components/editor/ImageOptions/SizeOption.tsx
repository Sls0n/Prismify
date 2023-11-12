import { Slider } from '@/components/ui/Slider'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'

type SizeOptionProps = {
  text?: string
}

export default function SizeOption({ text = 'Scale' }: SizeOptionProps) {
  const { images, setImages, scale, setScale } = useImageOptions()
  const { selectedImage } = useSelectedLayers()
  const { setShowControls } = useMoveable()

  return (
    <>
      <div className="mb-3 mt-2 flex items-center px-1 md:md:max-w-[70%]">
        <h1 className="text-[0.85rem]">{text}</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {Math.round(scale * 100)}%
        </p>
      </div>

      <div className="flex gap-4 text-[0.85rem] md:md:max-w-[70%]">
        <Slider
          defaultValue={[1]}
          max={3}
          min={0.25}
          step={0.01}
          onValueChange={(value: number[]) => {
            setShowControls(false)
            setScale(value[0])
          }}
          onValueCommit={() => setShowControls(true)}
          value={[scale] || [1]}
        />
      </div>
    </>
  )
}
