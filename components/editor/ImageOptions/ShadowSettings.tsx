import PopupColorPicker from '@/components/PopupColorPicker'
import { Button } from '@/components/ui/Button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { useBackgroundOptions } from '@/hooks/use-background-options'
import { useImageOptions } from '@/hooks/use-image-options'
import { shadows } from '@/utils/config'
import { ChevronDown } from 'lucide-react'

export default function ShadowSettings() {
  const {
    imageShadow,
    setImageShadow,
    shadowName,
    setShadowName,
    setShadowColor,
    shadowColor,
  } = useImageOptions()

  const { isMeshGradient } = useBackgroundOptions()

  const boxShadowStyle = {
    boxShadow: imageShadow,
  }

  const backgroundStyle = {
    backgroundImage: `var(--gradient-bg)`,
    backgroundColor: isMeshGradient ? `var(--mesh-bg)` : 'var(--solid-bg)',
  }

  const handleShadowButtonClick = (shadow: {
    shadow: string
    fullName: string
  }) => {
    setImageShadow(shadow.shadow)
    setShadowName(shadow.fullName)
  }

  const handleColorChange = (color: string) => {
    setShadowColor(color)
    setImageShadow(
      shadows.find((shadow) => shadow.fullName === (shadowName ?? ''))
        ?.shadow ?? ''
    )
    document.documentElement.style.setProperty('--shadow', color)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger className="relative mt-8 flex h-14 max-w-[70%] items-center overflow-hidden rounded-lg border border-border bg-formDark">
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
              {shadowName}
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
                shadow.shadow === imageShadow &&
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

      <PopupColorPicker color={shadowColor} onChange={handleColorChange} />
    </>
  )
}
