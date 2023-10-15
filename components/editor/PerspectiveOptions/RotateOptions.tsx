import { Button } from '@/components/ui/Button'
import { Slider } from '@/components/ui/Slider'
import { useMoveable } from '@/store/use-moveable'
import { RotateCcw } from 'lucide-react'
import { useImageOptions } from '@/store/use-image-options'

export default function RotateOptions() {
  const { images, setImages, selectedImage } = useImageOptions()
  const { setShowControls } = useMoveable()

  return (
    <>
      {/* Perspective */}
      <div className="mb-3 mt-8 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Perspective</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(images[selectedImage - 1]?.style.perspective)}px`}
        </p>
        <Button
          aria-label="reset rotate x"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() =>
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        perspective: 500,
                      },
                    }
                  : image
              )
            )
          }
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="flex mb-3 max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={1000}
          min={0}
          step={0.001}
          value={[images[selectedImage - 1]?.style.perspective]}
          onValueChange={(value: number[]) => {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        perspective: value[0],
                      },
                    }
                  : image
              )
            )
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
        />
      </div>

      {/* RotateX */}
      <div className="mb-3 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Rotate X</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(images[selectedImage - 1]?.style.rotateX)}px`}
        </p>
        <Button
          aria-label="reset rotate x"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() =>
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        rotateX: 0,
                      },
                    }
                  : image
              )
            )
          }
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="mb-3 flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={1000}
          min={-1000}
          step={0.001}
          value={[images[selectedImage - 1]?.style.rotateX]}
          onValueChange={(value: number[]) => {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        rotateX: value[0],
                      },
                    }
                  : image
              )
            )
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
        />
      </div>

      {/* RotateY */}
      <div className="mb-3 mt-3 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Rotate Y</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(images[selectedImage - 1]?.style.rotateY)}px`}
        </p>
        <Button
          aria-label="reset rotate y"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() =>
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        rotateY: 0,
                      },
                    }
                  : image
              )
            )
          }
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={500}
          min={-500}
          step={0.001}
          value={[images[selectedImage - 1]?.style.rotateY]}
          onValueChange={(value: number[]) => {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        rotateY: value[0],
                      },
                    }
                  : image
              )
            )
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
        />
      </div>

      {/* RotateZ */}
      <div className="mb-3 mt-3 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Rotate Z</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {`${Math.round(images[selectedImage - 1]?.style.rotateZ)}px`}
        </p>
        <Button
          aria-label="reset size"
          variant="secondary"
          size="sm"
          className="ml-auto translate-x-2"
          onClick={() =>
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        rotateZ: 0,
                      },
                    }
                  : image
              )
            )
          }
        >
          <RotateCcw size={15} className="text-primary/70 dark:text-dark/80" />
        </Button>
      </div>

      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={500}
          min={-500}
          step={0.001}
          value={[images[selectedImage - 1]?.style.rotateZ]}
          onValueChange={(value: number[]) => {
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        rotateZ: value[0],
                      },
                    }
                  : image
              )
            )
            setShowControls(false)
          }}
          onValueCommit={() => setShowControls(true)}
        />
      </div>
    </>
  )
}
