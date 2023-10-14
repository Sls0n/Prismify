import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface ActiveIndexState {
  activeIndex: number
  setActiveIndex: (index: number) => void
}

type MyPersist = (
  config: StateCreator<ActiveIndexState>,
  options: PersistOptions<ActiveIndexState>
) => StateCreator<ActiveIndexState>

export const useActiveIndexStore = create<ActiveIndexState, []>(
  (persist as MyPersist)(
    (set): ActiveIndexState => ({
      activeIndex: 1,
      setActiveIndex: (index) => set(() => ({ activeIndex: index })),
    }),
    {
      name: 'active-index',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
