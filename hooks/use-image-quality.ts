import { create } from 'zustand'

interface ImageQualityState {
  quality: number
  setQuality: (quality: number) => void
}

export const useImageQualityStore = create<ImageQualityState>()((set) => ({
  quality: 1,
  setQuality: (quality) => set(() => ({ quality: quality })),
}))
