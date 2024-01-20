import { create } from 'zustand'

interface ResizeCanvasState {
  resolution: string
  setResolution: (res: string) => void

  domResolution: string
  setDomResolution: (res: string) => void

  canvasRoundness: number
  setCanvasRoundness: (canvasRoundness: number) => void

  scrollScale: number
  setScrollScale: (scrollScale: number) => void

  scaleFactor: number
  setScaleFactor: (scaleFactor: number) => void

  shouldFloat: boolean
  setShouldFloat: (shouldFloat: boolean) => void

  automaticResolution: boolean
  setAutomaticResolution: (automaticResolution: boolean) => void

  exactDomResolution: string
  setExactDomResolution: (exactDomResolution: string) => void
}

export const useResizeCanvas = create<ResizeCanvasState>((set) => ({
  resolution: '1920x1080',
  setResolution: (res) => set({ resolution: res }),

  exactDomResolution: '1920x1080',
  setExactDomResolution: (exactDomResolution) => set({ exactDomResolution }),

  domResolution: '....x....',
  setDomResolution: (res) => set({ domResolution: res }),

  canvasRoundness: 0,
  setCanvasRoundness: (canvasRoundness) => set({ canvasRoundness }),

  scrollScale: 1,
  setScrollScale: (scrollScale) => set({ scrollScale }),

  scaleFactor: 1,
  setScaleFactor: (scaleFactor) => set({ scaleFactor }),

  shouldFloat: false,
  setShouldFloat: (shouldFloat) => set({ shouldFloat }),

  automaticResolution: true,
  setAutomaticResolution: (automaticResolution) => set({ automaticResolution }),
}))
