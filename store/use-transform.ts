import { create } from 'zustand'

interface TransformState {
  transform: { scale: number; translateX: number; translateY: number }
  setTransform: (transform: {
    scale: number
    translateX: number
    translateY: number
  }) => void
}

export const useTransform = create<TransformState>()((set) => ({
  transform: { scale: 1, translateX: 0, translateY: 0 },
  setTransform: (transform) => set({ transform }),
}))
