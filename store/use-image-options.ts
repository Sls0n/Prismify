import { create, useStore } from 'zustand'
import { temporal, TemporalState } from 'zundo'

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
      shadowOpacity: number
      shadowPreview: string
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
        shadowOpacity: number
        shadowPreview: string
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

  texts: {
    id: number
    content: string
    style: {
      textSize: string
      textColor: string
      textAlign: string
      fontWeight: string
      fontFamily: string
      letterSpacing: string
      textShadow: string
      shadowName: string
      shadowColor: string
      hasBackground: boolean
      backgroundColor: string
      padding: string
    }
  }[]
  setTexts: (
    texts: {
      id: number
      content: string
      style: {
        textSize: string
        textColor: string
        textAlign: string
        fontWeight: string
        fontFamily: string
        letterSpacing: string
        textShadow: string
        shadowName: string
        shadowColor: string
        hasBackground: boolean
        backgroundColor: string
        padding: string
      }
    }[]
  ) => void

  selectedImage: number
  setSelectedImage: (selectedImage: number) => void

  selectedText: number
  setSelectedText: (selectedText: number) => void

  defaultStyle: {
    imageSize: string
    imageRoundness: number
    imageShadow: string
    shadowPreview: string
    shadowName: string
    shadowOpacity: number
    shadowColor: string
    borderSize: string
    borderColor: string
    rotate: string
    translateX: number
    translateY: number
  }

  defaultTextStyle: {
    textSize: string
    textColor: string
    textAlign: string
    fontWeight: string
    fontFamily: string
    letterSpacing: string
    textShadow: string
    shadowName: string
    shadowColor: string
    hasBackground: boolean
    backgroundColor: string
    padding: string
  }
}

export const useImageOptions = create(
  temporal<ImageOptionsState>((set) => ({
    accordionOpen: {
      appearanceOpen: true,
      shadowOpen: true,
      borderOpen: false,
    },
    setAccordionOpen: (accordionOpen) => set({ accordionOpen }),

    selectedImage: 1,
    setSelectedImage: (selectedImage) => set({ selectedImage }),

    selectedText: 1,
    setSelectedText: (selectedText) => set({ selectedText }),

    defaultStyle: {
      imageSize: '0.8',
      imageRoundness: 0.7,
      imageShadow: '0px 8px 55px 0px',
      shadowPreview: '0px 6px 30px 0px #000',
      shadowOpacity: 0.5,
      shadowName: 'Large',
      shadowColor: '#000',
      borderSize: '0',
      borderColor: '#ffffff50',
      rotate: '0',
      translateX: 0,
      translateY: 0,
    },

    defaultTextStyle: {
      textSize: '3',
      textColor: '#151515',
      textAlign: 'center',
      fontWeight: '400',
      fontFamily: 'inherit',
      letterSpacing: '0',
      textShadow: '0 25px 50px -12px',
      shadowName: 'Bottom',
      shadowColor: '#00000030',
      hasBackground: false,
      backgroundColor: '#ffffff50',
      padding: '0',
    },

    images: [],
    setImages: (images) => set({ images }),

    texts: [],
    setTexts: (texts) => set({ texts }),
  }))
)

export const useTemporalStore = <T extends unknown>(
  selector: (state: TemporalState<ImageOptionsState>) => T,
  equality?: (a: T, b: T) => boolean
) => useStore(useImageOptions.temporal, selector, equality)
