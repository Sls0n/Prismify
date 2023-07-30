import { create } from 'zustand'

interface ImageOptionsState {
  image: string | null
  setImage: (image: string) => void

  isImageUploaded: boolean
  setIsImageUploaded: (uploaded: boolean) => void

  background: string
  setBackground: (background: string) => void

  imageSize: string
  setImageSize: (imageSize: string) => void
}

export const useImageOptions = create<ImageOptionsState>()((set) => ({
  image: null,
  setImage: (image) => set({ image: image }),

  isImageUploaded: false,
  setIsImageUploaded: (uploaded) => set({ isImageUploaded: uploaded }),

  background: 'from-indigo-300 to-purple-400',
  setBackground: (background) => set({ background }),

  imageSize: '1',
  setImageSize: (imageSize) => set({ imageSize }),
}))
