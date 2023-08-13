import { create } from 'zustand'


interface ActiveIndexState {
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export const useActiveIndexStore = create<ActiveIndexState>()((set) => ({
  activeIndex: 1,
  setActiveIndex: (index) => set(() => ({ activeIndex: index })),
}))
