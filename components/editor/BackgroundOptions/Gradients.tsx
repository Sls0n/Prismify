import { useCallback } from 'react'
import CircularSliderComp from '@/components/ui/CircularSlider'
import { GaugeCircle, Info, Paintbrush } from 'lucide-react'
import { gradients, Gradient } from '@/utils/config'
import { Button } from '@/components/ui/Button'
import { useBackgroundOptions } from '@/store/use-background-options'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Balancer } from 'react-wrap-balancer'

export default function GradientOptions() {
  const {
    setBackground,
    background: backgroundInStore,
    setIsMeshGradient,
    isMeshGradient,
    setIsSolidColor,
    setImageBackground,
  } = useBackgroundOptions()

  const handleGradientClick = useCallback(
    (gradient: Gradient, isMesh: boolean) => {
      document.documentElement.style.setProperty(
        '--gradient-bg',
        gradient.gradient
      )
      document.documentElement.style.setProperty(
        '--mesh-bg',
        isMesh ? gradient.background! : gradient.gradient
      )
      setBackground(gradient.gradient)
      setIsMeshGradient(isMesh)
      setIsSolidColor(false)
      setImageBackground(null)
    },
    [setBackground, setIsMeshGradient, setIsSolidColor, setImageBackground]
  )

  return (
    <>
      <div>
        <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <GaugeCircle size={20} />
          <span>Angle:</span>
          {isMeshGradient && (
            <Popover>
              <PopoverTrigger className="ml-2">
                <Info className="text-red-400/60" size={18} />
              </PopoverTrigger>
              <PopoverContent
                className="ml-16 max-w-[14rem] text-center"
                align="center"
              >
                <p className="text-sm text-neutral-400 ">
                  <Balancer>
                    {/*  eslint-disable-next-line react/no-unescaped-entities */}
                    Angle doesn't work with the current gradient preset.
                  </Balancer>
                </p>
              </PopoverContent>
            </Popover>
          )}
        </h3>
        <div
          className={`circular-slider mt-4 ${
            isMeshGradient && 'pointer-events-none opacity-50'
          }`}
        >
          <CircularSliderComp />
        </div>
      </div>

      <div>
        <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <Paintbrush size={20} />
          <span>Gradients:</span>
        </h3>

        <div className="mt-4 grid max-w-[18rem] auto-rows-auto grid-cols-6 gap-4">
          {gradients.map(({ gradient, background, type }: Gradient) => (
            <Button
              key={gradient}
              variant="secondary"
              className={`aspect-square rounded-sm ${
                gradient === backgroundInStore &&
                'outline-none ring-2 ring-ring ring-offset-2'
              }`}
              onClick={() =>
                handleGradientClick(
                  {
                    gradient,
                    background,
                    type: 'Normal',
                  },
                  type === 'Mesh' // will be true if its of type Mesh
                )
              }
              style={
                type === 'Normal'
                  ? { background: gradient }
                  : { backgroundColor: background, backgroundImage: gradient }
              }
            />
          ))}
        </div>
      </div>
    </>
  )
}
