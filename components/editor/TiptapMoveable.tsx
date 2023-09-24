'use client'

import React, { useCallback } from 'react'
import { useImageOptions } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'

import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  SnappableProps,
  Draggable,
  Scalable,
  Rotatable,
  Snappable,
} from 'react-moveable'
import { useImageQualityStore } from '@/store/use-image-quality'

const Moveable = makeMoveable<
  DraggableProps & ScalableProps & RotatableProps & SnappableProps
  // @ts-ignore
>([Draggable, Scalable, Rotatable, Snappable])

export default function TiptapMoveable({ id }: { id: string }) {
  const { quality } = useImageQualityStore()
  const { domResolution, scaleFactor } = useResizeCanvas()

  const [domWidth, domHeight]: number[] = domResolution.split('x').map(Number)
  return (
    <Moveable
      target={document?.getElementById(id)}
      draggable={true}
      onDrag={(e) => {
        e.target.style.transform = e.transform
      }}
      // onDragEnd={handleDrag}
      scalable={true}
      keepRatio={true}
      onScale={(e) => {
        e.target.style.transform = e.drag.transform
      }}
      // onScaleEnd={handleScale}
      rotatable={true}
      rotationPosition={'top'}
      onRotate={(e) => {
        e.target.style.transform = e.drag.transform
      }}
      // onRotateEnd={handleRotate}
      snapRotationThreshold={5}
      snapRotationDegrees={[0, 90, 180, 270]}
      snappable={true}
      snapDirections={{
        center: true,
        middle: true,
      }}
      snapThreshold={10}
      horizontalGuidelines={[domHeight / 2 / scaleFactor / quality]}
      verticalGuidelines={[domWidth / 2 / scaleFactor / quality]}
    />
  )
}
