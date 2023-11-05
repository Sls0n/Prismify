import { useImageOptions } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import React from 'react'
import Selecto from 'react-selecto'

export default function SelectoComponent() {
  const {
    setShowControls,
    showControls,
    isSelecting,
    setIsSelecting,
    setIsMultipleTargetSelected,
  } = useMoveable()
  const { setSelectedImage } = useImageOptions()
  const selectoRef = React.useRef<Selecto>(null)

  if (showControls) return
  return (
    <Selecto
      ref={selectoRef}
      dragContainer={'.canvas-container'}
      selectableTargets={['.image']}
      selectByClick={false}
      selectFromInside={false}
      toggleContinueSelect={['shift']}
      ratio={0}
      hitRate={0}
      onSelectStart={(e) => {
        console.log('selecting')
        setIsSelecting(true)
      }}
      onSelectEnd={(e) => {
        console.log(e)
        e.added.forEach((el) => {
          el.classList.add('selected')
        })

        e.removed.forEach((el) => {
          el.classList.remove('selected')
        })

        if (e?.selected.length !== 0) {
          setShowControls(true)

          setSelectedImage(+e?.selected?.[0]?.id! ?? 0)
        }

        if (e?.selected.length > 1) {
          setIsMultipleTargetSelected(true)
        }
      }}
    ></Selecto>
  )
}
