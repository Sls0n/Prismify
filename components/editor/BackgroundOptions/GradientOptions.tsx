import { useCallback } from 'react'
import { gradients, Gradient } from '@/utils/config'
import { Button } from '@/components/ui/Button'
import { useBackgroundOptions } from '@/store/use-background-options'
import ImageGradients from './ImageGradients'

export default function GradientOptions() {
  const {
    setBackground,
    background: backgroundInStore,
    setBackgroundType,
    setImageBackground,
    imageBackground,
    setAttribution,
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
      setBackgroundType('mesh')
      setImageBackground(null)
      setAttribution({ name: null, link: null })
    },
    [setBackground, setBackgroundType, setImageBackground, setAttribution]
  )

  return (
    <>
      <div>
        <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <span>Gradients:</span>
        </h3>

        <div className="mt-4 grid max-w-[18rem] auto-rows-auto grid-cols-6 gap-4">
          {gradients.map(({ gradient, background, type }: Gradient) => (
            <Button
              key={gradient}
              variant="secondary"
              className={`aspect-square rounded-md ${
                gradient === backgroundInStore &&
                !imageBackground &&
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

        <ImageGradients />
      </div>
    </>
  )
}
