import { useCallback } from 'react'
import { solidColors } from '@/utils/config'
import { Button } from '@/components/ui/Button'
import PopupColorPicker from '@/components/PopupColorPicker'
import { useBackgroundOptions } from '@/hooks/use-background-options'
import { Paintbrush } from 'lucide-react'

export default function GradientOptions() {
  const {
    setBackground,
    background,
    setIsMeshGradient,
    setIsSolidColor,
    solidColor,
    setSolidColor,
    setImageBackground
  } = useBackgroundOptions()

  const updateRootStyles = useCallback((color: string) => {
    document.documentElement.style.setProperty('--solid-bg', color)
    document.documentElement.style.setProperty('--gradient-bg', color)
    document.documentElement.style.setProperty('--mesh-bg', color)
  }, [])

  const handleColorChange = useCallback(
    (color: string) => {
      setIsSolidColor(true)
      setSolidColor(color)
      setBackground(color)
      setIsMeshGradient(false)
      setImageBackground(null)
      updateRootStyles(color)
    },
    [
      setIsSolidColor,
      setSolidColor,
      setBackground,
      setIsMeshGradient,
      updateRootStyles,
      setImageBackground,
    ]
  )

  return (
    <>
      <div>
        <h3 className="mb-3 mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <span>Pick a color:</span>
        </h3>
        <PopupColorPicker onChange={handleColorChange} color={solidColor} />
      </div>

      <div>
        <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <Paintbrush size={20} />
          <span>Solid Colors:</span>
        </h3>

        <div className="mt-4 grid max-w-[18rem] auto-rows-auto grid-cols-6 gap-4">
          {solidColors.map(({ background: solidBackground }) => {
            return (
              <Button
                key={solidBackground}
                variant="secondary"
                className={`aspect-square rounded-sm ${
                  background === solidBackground &&
                  'outline-none ring-2 ring-ring ring-offset-2'
                }`}
                onClick={() => handleColorChange(solidBackground)}
                style={{ background: solidBackground }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
