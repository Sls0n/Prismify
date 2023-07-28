import { create } from 'zustand'

interface ResizeCanvasState {
  resolution: string
  setResolution: (res: string) => void

  domResolution: string
  setDomResolution: (res: string) => void
}

export const useResizeCanvas = create<ResizeCanvasState>()((set) => ({
  resolution: '16x9',
  setResolution: (res) => set({ resolution: res }),

  domResolution: '....x....',
  setDomResolution: (res) => set({ domResolution: res }),
}))
