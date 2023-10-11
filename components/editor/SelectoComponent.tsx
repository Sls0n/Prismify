import { useImageOptions } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import React from 'react'
import Selecto from 'react-selecto'

export default function SelectoComponent() {
  const { setShowControls, showControls } = useMoveable()
  const { setSelectedImage } = useImageOptions()

  if (showControls) return
  return (
    <>
      <Selecto
        // The container to add a selection element
        // The area to drag selection element (default: container)
        dragContainer={document?.getElementById('canvas-container')}
        // Targets to select. You can register a queryselector or an Element.
        selectableTargets={['.image']}
        // Whether to select by click (default: true)
        selectByClick={false}
        preventClickEventOnDrag={true}
        // Whether to select from the target inside (default: true)
        selectFromInside={true}
        clickBySelectEnd={false}
        // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
        continueSelect={false}
        // Determines which key to continue selecting the next target via keydown and keyup.
        toggleContinueSelect={'shift'}
        // The container for keydown and keyup events
        keyContainer={window}
        // The rate at which the target overlaps the drag area to be selected. (default: 100)
        hitRate={100}
        // onSelect={(e) => {
        //   setShowControls(true)
        //   setSelectedImage(+e?.selected?.[0]?.id! ?? 0)
        //   console.log(e)
        //   if (e.added) {
        //     e.added.forEach((el) => {
        //       el.classList.add('selected')
        //     })
        //   }

        //   if (e.removed) {
        //     e.removed.forEach((el) => {
        //       el.classList.remove('selected')
        //     })
        //   }
        // }}
        onSelectEnd={(e) => {
           setShowControls(true)
          setSelectedImage(+e?.selected?.[0]?.id! ?? 0)
          console.log(e)
          if (e.added) {
            e.added.forEach((el) => {
              el.classList.add('selected')
            })
          }

          if (e.removed) {
            e.removed.forEach((el) => {
              el.classList.remove('selected')
            })
          }
        }}
      />
    </>
  )
}
