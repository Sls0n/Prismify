import { create } from 'zustand'

interface MoveableState {
  showControls: boolean
  setShowControls: (showControls: boolean) => void

  showTextControls: boolean
  setShowTextControls: (showTextControls: boolean) => void

  isEditable: boolean
  setIsEditable: (isEditable: boolean) => void

  isSelecting: boolean
  setIsSelecting: (isSelecting: boolean) => void

  isMultipleTargetSelected: boolean
  setIsMultipleTargetSelected: (isMultipleTargetSelected: boolean) => void
}

export const useMoveable = create<MoveableState>()((set) => ({
  showControls: false,
  setShowControls: (showControls) => set({ showControls }),

  showTextControls: false,
  setShowTextControls: (showTextControls) => set({ showTextControls }),

  isEditable: false,
  setIsEditable: (isEditable) => set({ isEditable }),

  isSelecting: false,
  setIsSelecting: (isSelecting) => set({ isSelecting }),

  isMultipleTargetSelected: false,
  setIsMultipleTargetSelected: (isMultipleTargetSelected) =>
    set({ isMultipleTargetSelected }),
}))
