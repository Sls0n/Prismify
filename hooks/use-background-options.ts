import { create } from 'zustand'

interface BackgroundOptionsState {
  background: string
  setBackground: (background: string) => void

  isMeshGradient: boolean
  setIsMeshGradient: (isMeshGradient: boolean) => void

  gradientAngle: number
  setGradientAngle: (gradientAngle: number) => void
}

export const useBackgroundOptions = create<BackgroundOptionsState>()((set) => ({
  background:
    'linear-gradient(var(--gradient-angle), rgb(202, 194, 255), rgb(242, 231, 248) 100%)',
  setBackground: (background) => set({ background }),

  isMeshGradient: false,
  setIsMeshGradient: (isMeshGradient) => set({isMeshGradient}),

  gradientAngle: 0,
  setGradientAngle: (gradientAngle) => set({ gradientAngle }),
}))
