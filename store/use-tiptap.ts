import { create } from 'zustand'

interface TiptapState {
  shouldShow: boolean
  setShouldShow: (shouldShow: boolean) => void
}

export const useTiptap = create<TiptapState>()((set) => ({
  shouldShow: false,
  setShouldShow: (shouldShow) => set({ shouldShow }),
}))
