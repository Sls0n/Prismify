import { create } from 'zustand'

interface AuthModalState {
  show: 'signin' | 'signup'
  setShow: (show: 'signin' | 'signup') => void
}

export const useAuthModal = create<AuthModalState>()((set) => ({
  show: 'signin',
  setShow: (show) => set({ show }),
}))
