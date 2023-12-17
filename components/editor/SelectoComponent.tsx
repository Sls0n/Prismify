import React from 'react'
import { useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import dynamic from 'next/dynamic'

const Selecto = dynamic(
  () => import('react-selecto').then((mod) => mod.default),
  {
    ssr: false,
  }
)

export default function SelectoComponent() {
  const {
    setShowControls,
    showControls,
    isSelecting,
    setIsSelecting,
    setIsMultipleTargetSelected,
    setShowTextControls,
    setIsEditable,
  } = useMoveable()
  const { setSelectedImage, setSelectedText } = useSelectedLayers()

  if (showControls) return
  return (
    <Selecto
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
        setTimeout(() => {
          setIsSelecting(false)
        }, 100)
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

        // if (
        //   e?.selected.length === 1 &&
        //   e?.selected?.[0]?.classList.contains('text')
        // ) {
        //   setShowTextControls(true)
        //   setIsEditable(true)
        //   setSelectedText(+e?.selected?.[0]?.id.charAt(-1)! ?? 0)
        // }

        if (e?.selected.length > 1) {
          setIsMultipleTargetSelected(true)
        }
      }}
    ></Selecto>
  )
}
