import { create, useStore } from 'zustand'
import { temporal, TemporalState } from 'zundo'
import throttle from 'just-throttle'

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

  initialImageUploaded: boolean
  setInitialImageUploaded: (initialImageUploaded: boolean) => void

  images: {
    id: number
    image: string
    extractedColors?: { color: string; count: number }[]
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
      insetSize: string
      insetColor: string
      rotate: string
      rotateX: number
      rotateY: number
      rotateZ: number
      perspective: number
      translateX: number
      translateY: number
    }
  }[]
  setImages: (
    images: {
      id: number
      image: string
      extractedColors?: { color: string; count: number }[]
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
        insetSize: string
        insetColor: string
        rotate: string
        rotateX: number
        rotateY: number
        rotateZ: number
        perspective: number
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
      textAlign: 'left' | 'center' | 'right'
      fontWeight: number
      fontFamily: string
      letterSpacing: number
      textShadow: string
      shadowName: string
      shadowColor: string
      shadowOpacity: number
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
        textAlign: 'left' | 'center' | 'right'
        fontWeight: number
        fontFamily: string
        letterSpacing: number
        textShadow: string
        shadowName: string
        shadowColor: string
        shadowOpacity: number
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
    insetSize: string
    insetColor: string
    rotate: string
    rotateX: number
    rotateY: number
    rotateZ: number
    perspective: number
    translateX: number
    translateY: number
  }

  defaultTextStyle: {
    textSize: string
    textColor: string
    textAlign: 'left' | 'center' | 'right'
    fontWeight: number
    fontFamily: string
    letterSpacing: number
    textShadow: string
    shadowName: string
    shadowColor: string
    shadowOpacity: number
    hasBackground: boolean
    backgroundColor: string
    padding: string
  }
}

export const useImageOptions = create(
  temporal<ImageOptionsState>(
    (set) => ({
      accordionOpen: {
        appearanceOpen: true,
        shadowOpen: true,
        borderOpen: false,
      },
      setAccordionOpen: (accordionOpen) => set({ accordionOpen }),

      initialImageUploaded: false,
      setInitialImageUploaded: (initialImageUploaded) =>
        set({ initialImageUploaded }),

      selectedImage: 1,
      setSelectedImage: (selectedImage) => set({ selectedImage }),

      selectedText: 1,
      setSelectedText: (selectedText) => set({ selectedText }),

      defaultStyle: {
        imageSize: '0.8',
        imageRoundness: 1.6,
        imageShadow: '0px 8px 55px 0px',
        shadowPreview: '0px 6px 30px 0px #000',
        shadowOpacity: 0.5,
        shadowName: 'Large',
        shadowColor: '#000',
        borderSize: '0',
        borderColor: '#ffffff50',
        insetSize: '0',
        insetColor: '#fff',
        rotate: '0',
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        perspective: 2000,
        translateX: 0,
        translateY: 0,
      },

      defaultTextStyle: {
        textSize: '3',
        textColor: '#151515',
        textAlign: 'center',
        fontWeight: 400,
        fontFamily: 'DM Sans',
        letterSpacing: -0.01,
        textShadow: '1px 1px 8px',
        shadowName: 'Bottom',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        hasBackground: false,
        backgroundColor: '#ffffff50',
        padding: '0',
      },

      images: [],
      setImages: (images) => set({ images }),

      texts: [],
      setTexts: (texts) => set({ texts }),
    }),
    {
      limit: 30,
      handleSet: (handleSet) =>
        throttle<typeof handleSet>((state) => {
          handleSet(state)
        }, 1000),
    }
  )
)

export const useTemporalStore = <T extends unknown>(
  selector: (state: TemporalState<ImageOptionsState>) => T,
  equality?: (a: T, b: T) => boolean
) => useStore(useImageOptions.temporal, selector, equality)
