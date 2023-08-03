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

  shadowName: string
  setShadowName: (shadowName: string) => void

  shadowColor: string
  setShadowColor: (shadowColor: string) => void
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

  imageShadow: '0 4px 6px -1px #00000026, 0 2px 4px -2px #00000026',
  setImageShadow: (imageShadow) => set({ imageShadow }),

  shadowName: 'Small',
  setShadowName: (shadowName) => set({shadowName}),

  shadowColor: '#00000026',
  setShadowColor: (shadowColor) => set({ shadowColor }),
}))
