import { create } from 'zustand'

interface FrameOptionsState {
  browserFrame: 'Arc' | 'MacOS Dark' | 'MacOS Light' | 'None'
  setBrowserFrame: (
    browserFrame: 'Arc' | 'MacOS Dark' | 'MacOS Light' | 'None'
  ) => void

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

  showSearchBar: true,
  setShowSearchBar: (searchBar) => set({ showSearchBar: searchBar }),
}))
