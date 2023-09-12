import PopupColorPicker from '@/components/PopupColorPicker'
import { Button } from '@/components/ui/Button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useImageOptions } from '@/store/use-image-options'
import { shadows } from '@/utils/config'
import { ChevronDown } from 'lucide-react'

export default function ShadowSettings() {
  const { images, setImages, selectedImage, defaultStyle } = useImageOptions()

  const { backgroundType } = useBackgroundOptions()

  const boxShadowStyle = {
    boxShadow: images[selectedImage - 1]?.style.imageShadow,
  }

  const backgroundStyle = {
    backgroundImage: `var(--gradient-bg)`,
    backgroundColor:
      backgroundType === 'mesh' ? `var(--mesh-bg)` : 'var(--solid-bg)',
  }

  const handleShadowButtonClick = (shadow: {
    shadow: string
    fullName: string
  }) => {
    setImages(
      images.map((image, index) =>
        index === selectedImage - 1
          ? {
              ...image,
              style: {
                ...image.style,
                imageShadow: shadow.shadow,
                shadowName: shadow.fullName,
              },
            }
          : image
      )
    )
  }

  const handleColorChange = (color: string) => {
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

    document.documentElement.style.setProperty(
      `--shadowColor${selectedImage}`,
      color
    )
  }

  return (
    <>
      <Popover>
        <PopoverTrigger className="relative mt-2 flex h-14 w-[70%] items-center overflow-hidden rounded-lg border border-border bg-formDark">
          <div
            style={backgroundStyle}
            className="flex-center h-full basis-[25%]"
          >
            <div
              className="flex-center h-1/2 w-1/2 rounded-md bg-white"
              style={boxShadowStyle}
            ></div>
          </div>
          <div className="flex h-full w-full flex-1 items-center justify-between px-4">
            <p className="text-[0.85rem] text-primary/70 dark:text-dark/70">
              {images[selectedImage - 1]?.style.shadowName}
            </p>
            <ChevronDown
              size={18}
              className="text-primary/70 dark:text-dark/80"
            />
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
              onClick={() => handleShadowButtonClick(shadow)}
              className={`flex-center relative h-20 w-24 cursor-pointer rounded-md ${
                shadow.shadow ===
                  images[selectedImage - 1]?.style.imageShadow &&
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
        <h1 className="text-[0.85rem]">Shadow color</h1>
      </div>

      <PopupColorPicker
        color={images[selectedImage - 1]?.style.shadowColor}
        onChange={handleColorChange}
      />
    </>
  )
}
