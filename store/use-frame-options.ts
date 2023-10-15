import { create } from 'zustand'

export type FrameTypes = 'Arc' | 'MacOS Dark' | 'MacOS Light' | 'None'

interface FrameOptionsState {
  browserFrame: FrameTypes
  setBrowserFrame: (browserFrame: FrameTypes) => void

  frameHeight: 'small' | 'medium' | 'large' | string
  setFrameHeight: (height: string) => void

  showSearchBar: boolean
  setShowSearchBar: (searchBar: boolean) => void
}

export const useFrameOptions = create<FrameOptionsState>()((set) => ({
  browserFrame: 'None',
  setBrowserFrame: (browserFrame) => set({ browserFrame }),

  frameHeight: 'small',
  setFrameHeight: (frameHeight) => set({ frameHeight }),

  showSearchBar: false,
  setShowSearchBar: (searchBar) => set({ showSearchBar: searchBar }),
}))
