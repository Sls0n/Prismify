import { Slider } from '@/components/ui/Slider'
import { useFrameOptions } from '@/store/use-frame-options'
import { useImageOptions } from '@/store/use-image-options'

export default function RoundnessOption() {
  const { images, setImages, selectedImage } = useImageOptions()
  const { browserFrame } = useFrameOptions()

  return (
    <>
      <div className="mb-3 mt-6 flex items-center px-1 md:max-w-[70%]">
        <h1 className="text-[0.85rem]">Roundness</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(
            Number(images[selectedImage - 1]?.style.imageRoundness ?? 0.2) * 10
          )} `}
        </p>
      </div>

      <div className="flex gap-4 text-[0.85rem] md:max-w-[70%]">
        <Slider
          defaultValue={[0.7]}
          max={browserFrame !== 'None' && browserFrame !== 'Arc' ? 1.6 : 5}
          min={0}
          step={0.05}
          onValueChange={(value) => {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        imageRoundness: value[0],
                      },
                    }
                  : image
              )
            )
            document.documentElement.style.setProperty(
              `--borderRoundness${selectedImage}`,
              `${value.toString()}rem`
            )
          }}
          value={
            images.length !== 0
              ? [+images[selectedImage - 1]?.style.imageRoundness]
              : [1]
          }
        />
      </div>
    </>
  )
}
