import { create } from 'zustand'

interface MoveableState {
  showControls: boolean
  setShowControls: (showControls: boolean) => void
}

export const useMoveable = create<MoveableState>()((set) => ({
  showControls: false,
  setShowControls: (showControls) => set({ showControls }),
}))
