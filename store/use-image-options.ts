import { create, useStore } from 'zustand'
import { temporal, TemporalState } from 'zundo'
import throttle from 'just-throttle'
import { FrameTypes } from './use-frame-options'

interface ImageOptionsState {
  scale: number
  setScale: (scale: number) => void

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
    linearGradients?: string[]
    meshGradients?: string[]
    radialGradients?: string[]
    dominantColor?: string
    pallettes?: string[]
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
      zIndex: number
    }
    frame?: FrameTypes
  }[]
  setImages: (
    images: {
      id: number
      image: string
      extractedColors?: { color: string; count: number }[]
      linearGradients?: string[]
      meshGradients?: string[]
      radialGradients?: string[]
      dominantColor?: string
      pallettes?: string[]
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
        zIndex: number
      }
      frame?: FrameTypes
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
      zIndex: number
      position: string
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
        zIndex: number
        position: string
      }
    }[]
  ) => void

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
    zIndex: number
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
    zIndex: number
    position: string
  }
}

export const useImageOptions = create(
  temporal<ImageOptionsState>(
    (set) => ({
      scale: 1,
      setScale: (scale) => set({ scale }),

      accordionOpen: {
        appearanceOpen: true,
        shadowOpen: true,
        borderOpen: false,
      },
      setAccordionOpen: (accordionOpen) => set({ accordionOpen }),

      initialImageUploaded: false,
      setInitialImageUploaded: (initialImageUploaded) =>
        set({ initialImageUploaded }),

      defaultStyle: {
        imageSize: '0.8',
        imageRoundness: 0.5,
        imageShadow: '',
        shadowPreview: '0 25px 50px -12px #000000',
        shadowOpacity: 0.22,
        shadowName: 'Medium',
        shadowColor: '#000',
        borderSize: '0',
        borderColor: '#ffffff50',
        insetSize: '0',
        insetColor: '#fff',
        rotate: '0',
        rotateX: 0.0001,
        rotateY: 0,
        rotateZ: 0,
        perspective: 2000,
        translateX: 0,
        translateY: 0,
        hasFrame: false,
        zIndex: 2,
      },

      defaultTextStyle: {
        textSize: '3',
        textColor: '#151515',
        textAlign: 'center',
        fontWeight: 500,
        fontFamily: 'Inter',
        letterSpacing: -0.03,
        textShadow: '1px 1px 8px',
        shadowName: 'Bottom',
        shadowColor: '#000',
        shadowOpacity: 0.16,
        hasBackground: false,
        backgroundColor: '#ffffff50',
        padding: '0',
        zIndex: 2,
        position: '',
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
        }, 800),
    }
  )
)

export const useTemporalStore = <T extends unknown>(
  selector: (state: TemporalState<ImageOptionsState>) => T,
  equality?: (a: T, b: T) => boolean
) => useStore(useImageOptions.temporal, selector, equality)

interface SelectedLayerState {
  selectedImage: number | null
  setSelectedImage: (selectedImage: number | null) => void

  selectedText: number | null
  setSelectedText: (selectedText: number | null) => void

  enableCrop: boolean
  setEnableCrop: (enableCrop: boolean) => void
}

export const useSelectedLayers = create<SelectedLayerState>((set) => ({
  selectedImage: null,
  setSelectedImage: (selectedImage) => set({ selectedImage }),

  selectedText: null,
  setSelectedText: (selectedText) => set({ selectedText }),

  enableCrop: false,
  setEnableCrop: (enableCrop) => set({ enableCrop }),
}))
