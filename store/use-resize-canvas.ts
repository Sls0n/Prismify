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
}

export const useResizeCanvas = create<ResizeCanvasState>()((set) => ({
  resolution: '16x9',
  setResolution: (res) => set({ resolution: res }),

  domResolution: '....x....',
  setDomResolution: (res) => set({ domResolution: res }),

  canvasRoundness: 0,
  setCanvasRoundness: (canvasRoundness) => set({ canvasRoundness }),

  scrollScale: 1,
  setScrollScale: (scrollScale) => set({ scrollScale }),

  scaleFactor: 1,
  setScaleFactor: (scaleFactor) => set({ scaleFactor }),
}))
