import { create } from 'zustand'

interface ImageUploadedState {
  isImageUploaded: boolean
  setIsImageUploaded: (uploaded: boolean) => void
}

export const useImageUploaded = create<ImageUploadedState>()((set) => ({
  isImageUploaded: false,
  setIsImageUploaded: (uploaded) => set({ isImageUploaded: uploaded }),
}))
