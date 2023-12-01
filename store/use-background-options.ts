import { create } from 'zustand'

interface BackgroundOptionsState {
  background: string
  setBackground: (background: string) => void

  isBackgroundClicked: boolean
  setIsBackgroundClicked: (isBackgroundClicked: boolean) => void

  backgroundType: 'mesh' | 'solid' | 'gradient' | 'pattern' | 'custom'
  setBackgroundType: (
    backgroundType: 'mesh' | 'solid' | 'gradient' | 'pattern' | 'custom'
  ) => void

  solidColor: string
  setSolidColor: (solidColor: string) => void

  imageBackground: string | null
  setImageBackground: (imageBackground: string | null) => void

  attribution: { name: string | null; link: string | null }
  setAttribution: (attribution: {
    name: string | null
    link: string | null
  }) => void

  highResBackground: boolean
  setHighResBackground: (highResBackground: boolean) => void

  gradientAngle: number
  setGradientAngle: (gradientAngle: number) => void

  noise: number
  setNoise: (noise: number) => void
}

export const useBackgroundOptions = create<BackgroundOptionsState>()((set) => ({
  background:
    'linear-gradient(var(--gradient-angle), rgb(202, 194, 255), rgb(242, 231, 248) 100%)',
  setBackground: (background) => set({ background }),

  solidColor: '',
  setSolidColor: (solidColor) => set({ solidColor }),

  imageBackground: null,
  setImageBackground: (imageBackground) => set({ imageBackground }),

  attribution: { name: null, link: null },
  setAttribution: (attribution) => set({ attribution }),

  highResBackground: true,
  setHighResBackground: (highResBackground) => set({ highResBackground }),

  backgroundType: 'gradient',
  setBackgroundType: (backgroundType) => set({ backgroundType }),

  gradientAngle: 170,
  setGradientAngle: (gradientAngle) => set({ gradientAngle }),

  noise: 0,
  setNoise: (noise) => set({ noise }),

  isBackgroundClicked: false,
  setIsBackgroundClicked: (isBackgroundClicked) => set({ isBackgroundClicked }),
}))
