import { create } from 'zustand'

interface ResizeCanvasState {
  resolution: string
  setResolution: (res: string) => void
}

export const useResizeCanvas = create<ResizeCanvasState>()((set) => ({
  resolution: '1024x1024',
  setResolution: (res) => set({ resolution: res }),
}))
