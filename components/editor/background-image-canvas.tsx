// this component shows background image & noise in the canvas

import { useBackgroundOptions } from '@/store/use-background-options'
import Noise from '@/components/editor/noise'

export default function BackgroundImageCanvas() {
  const { imageBackground } = useBackgroundOptions()

  return (
    <>
      {imageBackground && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          draggable={false}
          className={`pointer-events-none absolute z-[0] h-full w-full object-cover`}
          src={imageBackground}
          alt="background image"
        />
      )}
      <Noise />
    </>
  )
}
