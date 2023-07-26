import { create } from 'zustand'

interface ResizeCanvasState {
  resolution: string
  setResolution: (res: string) => void

  domResolution: string
  setDomResolution: (res: string) => void
}

export const useResizeCanvas = create<ResizeCanvasState>()((set) => ({
  resolution: '1280x720',
  setResolution: (res) => set({ resolution: res }),

  domResolution: '2000x2000',
  setDomResolution: (res) => set({ domResolution: res }),
}))
