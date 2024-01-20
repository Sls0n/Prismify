'use client'

import PopupColorPicker from '@/components/popup-color-picker'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { shadows } from '@/utils/presets/shadows'
import { ChevronDown } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { useMoveable } from '@/store/use-moveable'

export default function ShadowSettings() {
  const { images, setImages, defaultStyle } = useImageOptions()
  const { showControls } = useMoveable()
  const { selectedImage } = useSelectedLayers()

  const { backgroundType } = useBackgroundOptions()

  const boxShadowStyle = {
    boxShadow: selectedImage
      ? images[selectedImage - 1]?.style.imageShadow
      : '',
  }

  const boxShadowPreview = {
    boxShadow: selectedImage
      ? images[selectedImage - 1]?.style.shadowPreview
      : '',
  }

  const backgroundStyle = {
    backgroundImage: `var(--gradient-bg)`,
    backgroundColor:
      backgroundType === 'mesh' ? `var(--mesh-bg)` : 'var(--solid-bg)',
  }

  const handleShadowButtonClick = (shadow: {
    shadow: string
    fullName: string
    preview: string
  }) => {
    selectedImage &&
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  imageShadow: shadow.shadow,
                  shadowName: shadow.fullName,
                  shadowPreview: shadow.preview,
                },
              }
            : image
        )
      )
  }

  const handleColorChange = (color: string) => {
    selectedImage &&
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  shadowColor: color,
                  imageShadow:
                    shadows.find(
                      (shadow) =>
                        shadow.fullName ===
                        (images[selectedImage - 1]?.style.shadowName ?? '')
                    )?.shadow ?? '',
                },
              }
            : image
        )
      )
  }

  return (
    <div className={`${selectedImage ? '' : 'pointer-events-none opacity-40'}`}>
      <Popover>
        <PopoverTrigger className="relative mt-2 flex h-14 w-full items-center overflow-hidden rounded-lg border border-border/80 bg-[#898beb05]">
          <div
            style={backgroundStyle}
            className="flex-center h-full basis-[23%]"
          >
            <div
              className="flex-center h-1/2 w-1/2 rounded-md bg-white"
              style={boxShadowPreview}
            ></div>
          </div>
          <div className="flex h-full w-full flex-1 items-center justify-between px-4">
            <div className="flex w-full flex-col items-start">
              <p className="text-[0.85rem] font-medium text-dark/70">
                {selectedImage
                  ? images[selectedImage - 1]?.style.shadowName
                  : 'None'}
              </p>
              <p className="text-[0.7rem] font-bold text-dark/50">
                {selectedImage
                  ? images[selectedImage - 1]?.style.shadowColor.slice(0, 7)
                  : '#000'}
              </p>
            </div>

            <ChevronDown size={18} className="text-dark/80" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="grid w-[350px] grid-cols-3 gap-4 rounded-lg bg-formDark p-4"
        >
          {/* Inside popup  */}
          {shadows.map((shadow) => (
            <Button
              variant="secondary"
              key={shadow.name}
              onClick={() => {
                handleShadowButtonClick(shadow)
              }}
              className={`flex-center relative h-20 w-24 cursor-pointer rounded-md ${
                shadow.shadow ===
                  images[selectedImage! - 1]?.style.imageShadow &&
                'outline-none ring-2 ring-ring ring-offset-2'
              }`}
              style={backgroundStyle}
            >
              <div
                className="flex-center h-[75%] w-[95%] rounded-md bg-white text-xs text-[#333]"
                style={{ boxShadow: `${shadow.preview}` }}
              >
                {shadow.name}
              </div>
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <div className="mb-3 mt-8 flex items-center px-1">
        <h1 className="text-[0.85rem]">Opacity</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-dark/70">
          {Math.round(
            Number(
              selectedImage
                ? images[selectedImage - 1]?.style.shadowOpacity
                : 0.5 ?? 1
            ) * 100
          )}
          %
        </p>
      </div>

      <div className="flex gap-4 px-1 text-[0.85rem] md:max-w-full">
        <Slider
          defaultValue={[0.5]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            selectedImage &&
              setImages(
                images.map((image, index) =>
                  index === selectedImage - 1
                    ? {
                        ...image,
                        style: {
                          ...image.style,
                          shadowOpacity: value[0],
                        },
                      }
                    : image
                )
              )
          }}
          value={
            images.length !== 0 && selectedImage
              ? [+images[selectedImage - 1]?.style.shadowOpacity]
              : [1]
          }
          onIncrement={() => {
            if (images.length === 0 || !selectedImage) return
            if (Number(images[selectedImage - 1]?.style.shadowOpacity) >= 1)
              return
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        shadowOpacity: Number(image.style.shadowOpacity) + 0.01,
                      },
                    }
                  : image
              )
            )
          }}
          onDecrement={() => {
            if (images.length === 0 || !selectedImage) return
            if (Number(images[selectedImage - 1]?.style.shadowOpacity) <= 0)
              return
            setImages(
              images.map((image, index) =>
                index === selectedImage - 1
                  ? {
                      ...image,
                      style: {
                        ...image.style,
                        shadowOpacity: Number(image.style.shadowOpacity) - 0.01,
                      },
                    }
                  : image
              )
            )
          }}
        />
      </div>

      <div className="mb-3 mt-8 flex items-center px-1">
        <h1 className="text-[0.85rem]">Shadow color</h1>
      </div>

      <PopupColorPicker
        shouldShowAlpha={false}
        color={
          selectedImage ? images[selectedImage - 1]?.style.shadowColor : '#000'
        }
        onChange={handleColorChange}
      />
    </div>
  )
}
