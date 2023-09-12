import { create } from 'zustand'

interface ImageOptionsState {
  accordionOpen: {
    appearanceOpen: boolean
    shadowOpen: boolean
    borderOpen: boolean
  }
  setAccordionOpen: (accordionOpen: {
    appearanceOpen: boolean
    shadowOpen: boolean
    borderOpen: boolean
  }) => void

  images: {
    id: number
    image: string
    style: {
      imageSize: string
      imageRoundness: number
      imageShadow: string
      shadowName: string
      shadowColor: string
      borderSize: string | null
      borderColor: string
      rotate: string
      translateX: number
      translateY: number
    }
  }[]
  setImages: (
    images: {
      id: number
      image: string
      style: {
        imageSize: string
        imageRoundness: number
        imageShadow: string
        shadowName: string
        shadowColor: string
        borderSize: string | null
        borderColor: string
        rotate: string
        translateX: number
        translateY: number
      }
    }[]
  ) => void

  selectedImage: number
  setSelectedImage: (selectedImage: number) => void

  defaultStyle: {
    imageSize: '0.8'
    imageRoundness: 0.7
    imageShadow: '0 25px 50px -12px'
    shadowName: 'Bottom'
    shadowColor: '#00000030'
    borderSize: '0'
    borderColor: '#ffffff50'
    rotate: '0'
    translateX: 0
    translateY: 0
  }
}

export const useImageOptions = create<ImageOptionsState>()((set) => ({
  accordionOpen: { appearanceOpen: true, shadowOpen: false, borderOpen: false },
  setAccordionOpen: (accordionOpen) => set({ accordionOpen }),

  selectedImage: 1,
  setSelectedImage: (selectedImage) => set({ selectedImage }),

  defaultStyle: {
    imageSize: '0.8',
    imageRoundness: 0.7,
    imageShadow: '0 25px 50px -12px',
    shadowName: 'Bottom',
    shadowColor: '#00000030',
    borderSize: '0',
    borderColor: '#ffffff50',
    rotate: '0',
    translateX: 0,
    translateY: 0,
  },

  images: [],

  setImages: (images) => set({ images }),
}))
