'use client'

import { Button } from '@/components/ui/button'
import { useTemporalStore } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { Redo2, Undo2 } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'

export function useUndoRedoHotkeys() {
  const { setShowControls } = useMoveable()
  const { undo, redo } = useTemporalStore((state) => state)

  useHotkeys(
    'ctrl+z',
    () => {
      undo()
      setShowControls(false)
    },
    [undo]
  )

  useHotkeys(
    'ctrl+y',
    () => {
      redo()
      setShowControls(false)
    },
    [redo]
  )

  return { undo, redo }
}

export function UndoRedoButtons() {
  const { undo, redo, futureStates, pastStates } = useTemporalStore(
    (state) => state
  )

  return (
    <div className="ml-auto flex">
      <Button
        variant="outline"
        aria-label="undo"
        className="scale-75 rounded-md px-3 py-1"
        disabled={pastStates.length === 0}
        onClick={() => undo()}
      >
        <Undo2 size={20} />
      </Button>
      <Button
        variant="outline"
        aria-label="redo"
        className="scale-75 rounded-md px-3 py-1"
        disabled={futureStates.length === 0}
        onClick={() => redo()}
      >
        <Redo2 size={20} />
      </Button>
    </div>
  )
}
