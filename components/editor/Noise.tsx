import { useBackgroundOptions } from '@/store/use-background-options'

export default function Noise() {
  const { noise } = useBackgroundOptions()
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        draggable={false}
        className={`pointer-events-none absolute z-[1] h-full w-full object-cover`}
        style={{
          opacity: noise,
        }}
        src={'/images/Noise.svg'}
        alt="noise"
      />
    </>
  )
}
