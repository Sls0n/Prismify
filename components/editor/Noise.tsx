import { useBackgroundOptions } from '@/store/use-background-options'
import { useImageOptions } from '@/store/use-image-options'

export default function Noise() {
  const { initialImageUploaded } = useImageOptions()
  const { noise, setNoise } = useBackgroundOptions()
  return (
    <>
      {initialImageUploaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          draggable={false}
          className={`pointer-events-none absolute h-full w-full object-cover`}
          style={{
            opacity: noise,
          }}
          src={'/images/Noise.svg'}
          alt="noise"
        />
      )}
    </>
  )
}
