import { create } from 'zustand'

interface FrameOptionsState {
  browserFrame: 'MacOS Dark' | 'MacOS Light' | 'None'
  setBrowserFrame: (browserFrame: 'MacOS Dark' | 'MacOS Light' | 'None') => void

  frameHeight: 'small' | 'medium' | 'large' | string
  setFrameHeight: (height: string) => void
}

export const useFrameOptions = create<FrameOptionsState>()((set) => ({
  browserFrame: 'None',
  setBrowserFrame: (browserFrame) => set({ browserFrame }),

  frameHeight: 'medium',
  setFrameHeight: (frameHeight) => set({ frameHeight }),
}))
