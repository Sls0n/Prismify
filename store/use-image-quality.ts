import { create } from 'zustand'

interface ImageQualityState {
  quality: number
  setQuality: (quality: number) => void

  fileType: 'PNG' | 'JPG' | 'SVG' | 'WEBP'
  setFileType: (fileType: 'PNG' | 'JPG' | 'SVG' | 'WEBP') => void
}

export const useImageQualityStore = create<ImageQualityState>()((set) => ({
  quality: 1,
  setQuality: (quality) => set(() => ({ quality: quality })),

  fileType: 'PNG',
  setFileType: (fileType) => set(() => ({ fileType: fileType })),
}))
