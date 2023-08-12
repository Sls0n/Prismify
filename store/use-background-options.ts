import { create } from 'zustand'

interface BackgroundOptionsState {
  background: string
  setBackground: (background: string) => void

  isMeshGradient: boolean
  setIsMeshGradient: (isMeshGradient: boolean) => void

  isSolidColor: boolean
  setIsSolidColor: (isSolidColor: boolean) => void

  solidColor: string
  setSolidColor: (solidColor: string) => void

  imageBackground: string | null
  setImageBackground: (imageBackground: string | null) => void
}

export const useBackgroundOptions = create<BackgroundOptionsState>()((set) => ({
  background:
    'linear-gradient(var(--gradient-angle), rgb(202, 194, 255), rgb(242, 231, 248) 100%)',
  setBackground: (background) => set({ background }),

  isMeshGradient: false,
  setIsMeshGradient: (isMeshGradient) => set({ isMeshGradient }),

  isSolidColor: false,
  setIsSolidColor: (isSolidColor) => set({ isSolidColor }),

  solidColor: '',
  setSolidColor: (solidColor) => set({ solidColor }),

  imageBackground: null,
  setImageBackground: (imageBackground) => set({ imageBackground }),
}))
