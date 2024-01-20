'use client'

import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { splitWidthHeight } from '@/utils/helper-fns'
import { useImageQualityStore } from '@/store/use-image-quality'
import {
  Draggable,
  DraggableProps,
  Rotatable,
  RotatableProps,
  Scalable,
  ScalableProps,
  Snappable,
  SnappableProps,
  makeMoveable,
} from 'react-moveable'

const Moveable = makeMoveable<
  DraggableProps & ScalableProps & RotatableProps & SnappableProps
  // @ts-ignore
>([Draggable, Scalable, Rotatable, Snappable])

export default function TiptapMoveable({ id }: { id: string }) {
  const { quality } = useImageQualityStore()
  const { domResolution, scaleFactor, exactDomResolution } = useResizeCanvas()
  const { images, texts } = useImageOptions()
  const { selectedImage, selectedText } = useSelectedLayers()
  const { width, height } = splitWidthHeight(exactDomResolution)

  const [domWidth, domHeight]: number[] = domResolution.split('x').map(Number)

  const otherTexts = texts.filter((text) => text.id !== selectedText)
  const elementGuidelines = [
    ...images.map((image) => ({
      element:
        typeof document !== 'undefined'
          ? document?.getElementById(`${image.id}`)
          : '',
    })),
    ...otherTexts.map((text) => ({
      element:
        typeof document !== 'undefined'
          ? document?.getElementById(`text-${text.id}`)
          : '',
    })),
  ]

  return (
    <Moveable
      target={
        typeof document !== 'undefined' ? document?.getElementById(id) : ''
      }
      draggable={true}
      onDrag={(e) => {
        e.target.style.transform = e.transform
        // const x = e.beforeTranslate[0]
        // const y = e.beforeTranslate[1]
        // // Calculate percentage values based on the parent dimensions
        // const translateXPercent = (x / +width) * 100
        // const translateYPercent = (y / +height) * 100
        // // Apply the translate with percentage values
        // e.target.style.transform = `translate(${translateXPercent}%, ${translateYPercent}%)`
      }}
      scalable={true}
      keepRatio={true}
      onScale={(e) => {
        e.target.style.transform = e.drag.transform
      }}
      rotatable={true}
      rotationPosition={'top'}
      onRotate={(e) => {
        e.target.style.transform = e.drag.transform
      }}
      snapRotationThreshold={5}
      snapRotationDegrees={[0, 90, 180, 270]}
      snappable={true}
      snapDirections={{
        top: true,
        left: true,
        bottom: true,
        right: true,
        center: true,
        middle: true,
      }}
      snapThreshold={7}
      horizontalGuidelines={[
        domHeight / 2 / scaleFactor / quality,
        domHeight / 1 / scaleFactor / quality,
        0,
      ]}
      verticalGuidelines={[
        domWidth / 2 / scaleFactor / quality,
        domWidth / 1 / scaleFactor / quality,
        0,
      ]}
      elementSnapDirections={{
        top: true,
        left: true,
        bottom: true,
        right: true,
        center: true,
        middle: true,
      }}
      elementGuidelines={elementGuidelines}
    />
  )
}
