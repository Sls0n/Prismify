import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface ResizeCanvasState {
  resolution: string
  setResolution: (res: string) => void

  domResolution: string
  setDomResolution: (res: string) => void

  canvasRoundness: number
  setCanvasRoundness: (canvasRoundness: number) => void

  scrollScale: number
  setScrollScale: (scrollScale: number) => void

  scaleFactor: number
  setScaleFactor: (scaleFactor: number) => void

  shouldFloat: boolean
  setShouldFloat: (shouldFloat: boolean) => void

  automaticResolution: boolean
  setAutomaticResolution: (automaticResolution: boolean) => void

  exactDomResolution: string
  setExactDomResolution: (exactDomResolution: string) => void
}

type MyPersist = (
  config: StateCreator<ResizeCanvasState>,
  options: PersistOptions<ResizeCanvasState>
) => StateCreator<ResizeCanvasState>

export const useResizeCanvas = create<ResizeCanvasState, []>(
  (persist as MyPersist)(
    (set): ResizeCanvasState => ({
      resolution: '1920x1080',
      setResolution: (res) => set({ resolution: res }),

      exactDomResolution: '1920x1080',
      setExactDomResolution: (exactDomResolution) =>
        set({ exactDomResolution }),

      domResolution: '....x....',
      setDomResolution: (res) => set({ domResolution: res }),

      canvasRoundness: 0.75,
      setCanvasRoundness: (canvasRoundness) => set({ canvasRoundness }),

      scrollScale: 1,
      setScrollScale: (scrollScale) => set({ scrollScale }),

      scaleFactor: 1,
      setScaleFactor: (scaleFactor) => set({ scaleFactor }),

      shouldFloat: false,
      setShouldFloat: (shouldFloat) => set({ shouldFloat }),

      automaticResolution: false,
      setAutomaticResolution: (automaticResolution) =>
        set({ automaticResolution }),
    }),
    {
      name: 'resize-canvas',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
