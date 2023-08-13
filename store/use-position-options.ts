import { create } from 'zustand'

interface PositionOptionsState {
  translateX: number
  setTranslateX: (translateX: number) => void

  translateY: number
  setTranslateY: (translateY: number) => void
}

export const usePositionOptions = create<PositionOptionsState>()((set) => ({
  translateX: 0, // in %
  setTranslateX: (translateX) => set({ translateX }),

  translateY: 0, // in %
  setTranslateY: (translateY) => set({ translateY }),
}))
