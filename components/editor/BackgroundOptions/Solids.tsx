import { solidColors } from '@/utils/config'
import { Paintbrush } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useBackgroundOptions } from '@/hooks/use-background-options'
import PopupColorPicker from '@/components/PopupColorPicker'

export default function GradientOptions() {
  const {
    setBackground,
    background,
    setIsMeshGradient,
    setIsSolidColor,
    solidColor,
    setSolidColor,
  } = useBackgroundOptions()

  return (
    <>
      <div>
        <h3 className="mb-3 mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <span>Pick a color:</span>
        </h3>
        <PopupColorPicker
          onChange={(color) => {
            setSolidColor(color)
            document.documentElement.style.setProperty('--solid-bg', color)
          }}
          color={solidColor}
        />
      </div>

      <div>
        <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <Paintbrush size={20} />
          <span>Solid Colors:</span>
        </h3>

        <div className="mt-4 grid max-w-[18rem] auto-rows-auto grid-cols-6 gap-4">
          {solidColors.map((solid) => {
            return (
              <Button
                key={solid.background}
                variant="secondary"
                className={`h-9 w-9 rounded-sm ${
                  solid.background === background &&
                  'outline-none ring-2 ring-ring ring-offset-2'
                }`}
                onClick={() => {
                  setIsSolidColor(true)
                  setSolidColor(solid.background)
                  document.documentElement.style.setProperty(
                    '--solid-bg',
                    solid.background
                  )
                  document.documentElement.style.setProperty(
                    '--gradient-bg',
                    solid.background
                  )
                  document.documentElement.style.setProperty(
                    '--mesh-bg',
                    solid.background
                  )
                  setBackground(solid.background)
                  setIsMeshGradient(false)
                }}
                style={{ background: solid.background }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
