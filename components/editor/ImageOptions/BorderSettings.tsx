import { useImageOptions } from '@/store/use-image-options'
import { Slider } from '@/components/ui/Slider'
import { useFrameOptions } from '@/store/use-frame-options'
import PopupColorPicker from '@/components/PopupColorPicker'
import RoundnessOption from './RoundnessOption'

export default function BorderSettings() {
  const { setImages, images, selectedImage, defaultStyle } = useImageOptions()
  const { browserFrame } = useFrameOptions()

  const handleColorChange = (color: string) => {
    setImages(
      images.map((image, index) =>
        index === selectedImage - 1
          ? {
              ...image,
              style: {
                ...image.style,
                borderColor: color,
              },
            }
          : image
      )
    )
    document.documentElement.style.setProperty(
      `--borderColor${selectedImage}`,
      color
    )
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
          max={40}
          min={0}
          step={0.01}
          onValueChange={(value: number[]) => {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        borderSize: value[0].toString(),
                      },
                    }
                  : image
              )
            )
            document.documentElement.style.setProperty(
              `--borderSize${selectedImage}`,
              `${value.toString()}px`
            )
            document.documentElement.style.setProperty(
              `--borderColor${selectedImage}`,
              images[selectedImage - 1]?.style.borderColor
            )
          }}
          value={[+images[selectedImage - 1]?.style.borderSize!]}
          disabled={browserFrame !== 'None'}
        />
      </div>

      {/* Roundness */}
      {/* <div
        className={`mb-3 mt-9 flex max-w-[70%] items-center px-1 ${
          browserFrame !== 'None' && 'pointer-events-none  opacity-50'
        }`}
      >
        <h1 className="text-[0.85rem]">Radius</h1>

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
      </div> */}
      <RoundnessOption />

      <div
        className={`mt-8 flex flex-col gap-3 px-1 ${
          browserFrame !== 'None' && 'pointer-events-none opacity-50'
        }`}
      >
        <h1 className="text-[0.85rem]">Border color</h1>
        <PopupColorPicker
          color={images[selectedImage - 1]?.style.borderColor}
          onChange={handleColorChange}
        />
      </div>
    </>
  )
}
