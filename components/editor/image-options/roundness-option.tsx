'use client'

import { Slider } from '@/components/ui/slider'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'

export default function RoundnessOption() {
  const { images, setImages } = useImageOptions()
  const { setShowControls } = useMoveable()
  const { selectedImage } = useSelectedLayers()

  const browserFrame = selectedImage ? images[selectedImage - 1]?.frame : 'None'

  return (
    <div className={`${selectedImage ? '' : 'pointer-events-none opacity-40'}`}>
      <div className="mb-3 mt-6 flex items-center px-1 md:max-w-full">
        <h1 className="text-[0.85rem]">Roundness</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-dark/70">
          {`${Math.round(
            Number(
              selectedImage
                ? images[selectedImage - 1]?.style.imageRoundness
                : 0.2 ?? 0.2
            ) * 10
          )} `}
        </p>
      </div>

      <div className="flex gap-4 px-1 text-[0.85rem] md:max-w-full">
        <Slider
          defaultValue={[0.7]}
          max={browserFrame !== 'None' && browserFrame !== 'Arc' ? 1.6 : 5}
          min={0}
          step={0.05}
          onValueChange={(value) => {
            setShowControls(false)
            selectedImage &&
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
          }}
          value={
            images.length !== 0 && selectedImage
              ? [+images[selectedImage - 1]?.style.imageRoundness]
              : [1]
          }
          onValueCommit={() => setShowControls(true)}
          onIncrement={() => {
            if (images.length === 0 || !selectedImage) return
            if (Number(images[selectedImage - 1]?.style.imageRoundness) >= 5)
              return
            setShowControls(false)
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        imageRoundness:
                          Number(image.style.imageRoundness) + 0.1,
                      },
                    }
                  : image
              )
            )
          }}
          onDecrement={() => {
            if (images.length === 0 || !selectedImage) return
            if (Number(images[selectedImage - 1]?.style.imageRoundness) <= 0)
              return
            setShowControls(false)
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        imageRoundness:
                          Number(image.style.imageRoundness) - 0.1,
                      },
                    }
                  : image
              )
            )
          }}
        />
      </div>
    </div>
  )
}
