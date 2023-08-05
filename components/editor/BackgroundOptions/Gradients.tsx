import CircularSliderComp from '@/components/ui/CircularSlider'
import { GaugeCircle, Info, Paintbrush } from 'lucide-react'
import { gradients } from '@/utils/config'
import { Button } from '@/components/ui/Button'
import { useBackgroundOptions } from '@/hooks/use-background-options'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Balancer } from 'react-wrap-balancer'

export default function GradientOptions() {
  const {
    setBackground,
    background,
    setIsMeshGradient,
    isMeshGradient,
    setIsSolidColor,
  } = useBackgroundOptions()

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
                    Angle doesn't work with the current gradient
                    preset.
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

        <div className="mt-4 grid max-w-[18rem] grid-cols-6 auto-rows-auto gap-4">
          {gradients.map((gradient) => {
            if (gradient.type === 'Normal') {
              return (
                <Button
                  key={gradient.gradient}
                  variant="secondary"
                  className={`h-9 w-9 rounded-sm ${
                    gradient.gradient === background &&
                    'outline-none ring-2 ring-ring ring-offset-2'
                  }`}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      '--gradient-bg',
                      gradient.gradient
                    )
                    document.documentElement.style.setProperty(
                      '--mesh-bg',
                      gradient.gradient
                    )
                    setBackground(gradient.gradient)
                    setIsMeshGradient(false)
                    setIsSolidColor(false)
                  }}
                  style={{ background: gradient.gradient }}
                />
              )
            } else if (gradient.type === 'Mesh') {
              return (
                <Button
                  key={gradient.gradient}
                  variant="secondary"
                  className={`h-9 w-9 rounded-sm ${
                    gradient.gradient === background &&
                    'outline-none ring-2 ring-ring ring-offset-2'
                  }`}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      '--gradient-bg',
                      gradient.gradient
                    )
                    document.documentElement.style.setProperty(
                      '--mesh-bg',
                      gradient.background!
                    )
                    setBackground(gradient.gradient)
                    setIsMeshGradient(true)
                    setIsSolidColor(false)
                  }}
                  style={{
                    backgroundColor: gradient.background,
                    backgroundImage: gradient.gradient,
                  }}
                />
              )
            }
          })}
        </div>
      </div>
    </>
  )
}
