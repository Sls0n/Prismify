import { create } from 'zustand'

interface TiptapState {
  shouldShow: boolean
  setShouldShow: (shouldShow: boolean) => void

  blogOutput: object
  setBlogOutput: (blogOutput: object) => void
}

export const useTiptap = create<TiptapState>()((set) => ({
  shouldShow: false,
  setShouldShow: (shouldShow) => set({ shouldShow }),

  blogOutput: {},
  setBlogOutput: (blogOutput) => set({ blogOutput }),
}))
