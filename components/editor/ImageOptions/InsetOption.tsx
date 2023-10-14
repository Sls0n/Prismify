'use client'

import { Slider } from '@/components/ui/Slider'
import { useImageOptions } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'

export default function InsetOption() {
  const { images, setImages, selectedImage } = useImageOptions()
  const { setShowControls } = useMoveable()

  return (
    <>
      <div className="mb-3 mt-6 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Inset</h1>
        {images.length !== 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="ml-2 h-5 w-5 rounded-md"
                style={{
                  backgroundColor: images[selectedImage - 1]?.style.insetColor,
                }}
                variant="outline"
              />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[250px] rounded-lg bg-formDark p-4"
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="pb-1 text-sm font-medium tracking-tight">
                    Detected colors
                  </h4>
                  <hr className="border-border pt-2" />
                  <div className="flex flex-wrap gap-2">
                    {images[selectedImage - 1]?.extractedColors?.map(
                      (color) => (
                        <button
                          key={color.color}
                          className={`h-7 w-7 rounded-sm ${
                            images[selectedImage - 1]?.style.insetColor ===
                            color.color
                              ? 'ring-2 ring-ring ring-offset-2'
                              : ''
                          }`}
                          style={{ backgroundColor: color.color }}
                          onClick={() => {
                            setImages(
                              images.map((image, index) =>
                                index === selectedImage - 1
                                  ? {
                                      ...image,
                                      style: {
                                        ...image.style,
                                        insetColor: color.color,
                                      },
                                    }
                                  : image
                              )
                            )
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={150}
          min={0}
          step={0.02}
          onValueChange={(value: number[]) => {
            setShowControls(false)
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        insetSize: value[0].toString(),
                      },
                    }
                  : image
              )
            )
          }}
          value={
            images.length !== 0
              ? [+images[selectedImage - 1]?.style.insetSize]
              : [10]
          }
          onValueCommit={() => setShowControls(true)}
        />
      </div>
    </>
  )
}
