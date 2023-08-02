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

  imageRoundness: number
  setImageRoundness: (imageRoundness: number) => void

  imageShadow: string
  setImageShadow: (imageShadow: string) => void
}

export const useImageOptions = create<ImageOptionsState>()((set) => ({
  image: null,
  setImage: (image) => set({ image: image }),

  isImageUploaded: false,
  setIsImageUploaded: (uploaded) => set({ isImageUploaded: uploaded }),

  background:
    'linear-gradient(0deg, rgb(202, 194, 255), rgb(242, 231, 248) 100%)',
  setBackground: (background) => set({ background }),

  imageSize: '1',
  setImageSize: (imageSize) => set({ imageSize }),

  imageRoundness: 1, // in rem
  setImageRoundness: (imageRoundness) => set({ imageRoundness }),

  imageShadow: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
  setImageShadow: (imageShadow) => set({ imageShadow }),
}))
