import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useMoveable } from '@/store/use-moveable'
import { RotateCcw } from 'lucide-react'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'

export default function TranslateOption() {
  const { images, setImages } = useImageOptions()
  const { selectedImage } = useSelectedLayers()
  const { setShowControls } = useMoveable()

  return (
    <div className={`${selectedImage ? '' : 'pointer-events-none opacity-40'}`}>
      <div className="mb-3 mt-2 flex items-center px-1 md:max-w-full">
        <h1 className="text-[0.85rem]">Translate X</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-dark/70">
          {`${Math.round(
            selectedImage ? images[selectedImage - 1]?.style.translateX : 0
          )}px`}
        </p>
        <Button
          aria-label="reset size"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() => {
            selectedImage &&
              setImages(
                images.map((image, index) =>
                  index === selectedImage - 1
                    ? {
                        ...image,
                        style: {
                          ...image.style,
                          translateX: 0,
                        },
                      }
                    : image
                )
              )
          }}
        >
          <RotateCcw size={15} className="text-dark/80" />
        </Button>
      </div>

      <div className="mb-3 flex gap-4 text-[0.85rem] md:max-w-full">
        <Slider
          defaultValue={[0]}
          max={1000}
          min={-1000}
          step={0.001}
          value={
            selectedImage ? [images[selectedImage - 1]?.style.translateX] : [0]
          }
          onValueChange={(value: number[]) => {
            selectedImage &&
              setImages(
                images.map((image, index) =>
                  index === selectedImage - 1
                    ? {
                        ...image,
                        style: {
                          ...image.style,
                          translateX: value[0],
                        },
                      }
                    : image
                )
              )
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
          onIncrement={() => {
            selectedImage &&
              (images[selectedImage - 1]?.style.translateX >= 1000 ||
                setImages(
                  images.map((image, index) =>
                    index === selectedImage - 1
                      ? {
                          ...image,
                          style: {
                            ...image.style,
                            translateX: image.style.translateX + 1,
                          },
                        }
                      : image
                  )
                ))
          }}
          onDecrement={() => {
            selectedImage &&
              (images[selectedImage - 1]?.style.translateX <= -1000 ||
                setImages(
                  images.map((image, index) =>
                    index === selectedImage - 1
                      ? {
                          ...image,
                          style: {
                            ...image.style,
                            translateX: image.style.translateX - 1,
                          },
                        }
                      : image
                  )
                ))
          }}
        />
      </div>

      <div className="mb-3 mt-3 flex items-center px-1 md:max-w-full">
        <h1 className="text-[0.85rem]">Translate Y</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-dark/70">
          {`${Math.round(
            selectedImage ? images[selectedImage - 1]?.style.translateY : 0
          )}px`}
        </p>
        <Button
          aria-label="reset size"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() => {
            selectedImage &&
              setImages(
                images.map((image, index) =>
                  index === selectedImage - 1
                    ? {
                        ...image,
                        style: {
                          ...image.style,
                          translateY: 0,
                        },
                      }
                    : image
                )
              )
          }}
        >
          <RotateCcw size={15} className="text-dark/80" />
        </Button>
      </div>

      <div className="flex gap-4 text-[0.85rem] md:max-w-full">
        <Slider
          defaultValue={[0]}
          max={500}
          min={-500}
          step={0.001}
          value={
            selectedImage ? [images[selectedImage - 1]?.style.translateY] : [0]
          }
          onValueChange={(value: number[]) => {
            selectedImage &&
              setImages(
                images.map((image, index) =>
                  index === selectedImage - 1
                    ? {
                        ...image,
                        style: {
                          ...image.style,
                          translateY: value[0],
                        },
                      }
                    : image
                )
              )
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
          onIncrement={() => {
            selectedImage &&
              (images[selectedImage - 1]?.style.translateY >= 500 ||
                setImages(
                  images.map((image, index) =>
                    index === selectedImage - 1
                      ? {
                          ...image,
                          style: {
                            ...image.style,
                            translateY: image.style.translateY + 1,
                          },
                        }
                      : image
                  )
                ))
          }}
          onDecrement={() => {
            selectedImage &&
              (images[selectedImage - 1]?.style.translateY <= -500 ||
                setImages(
                  images.map((image, index) =>
                    index === selectedImage - 1
                      ? {
                          ...image,
                          style: {
                            ...image.style,
                            translateY: image.style.translateY - 1,
                          },
                        }
                      : image
                  )
                ))
          }}
        />
      </div>
    </div>
  )
}
