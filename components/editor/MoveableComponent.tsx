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
import { usePositionOptions } from '@/store/use-position-options'

const Moveable = makeMoveable<
  DraggableProps & ScalableProps & RotatableProps & SnappableProps
  // @ts-ignore
>([Draggable, Scalable, Rotatable, Snappable])

export default function MoveableComponent({ id }: { id: string }) {
  const { quality } = useImageQualityStore()
  const { domResolution, scaleFactor } = useResizeCanvas()
  const { setRotate, setImageSize } = useImageOptions()
  const { setTranslateX, setTranslateY } = usePositionOptions()

  const handleDrag = useCallback(
    (e: any) => {
      e.target.style.transform = e.transform
      setTranslateX(e.translate[0])
      setTranslateY(e.translate[1])
    },
    [setTranslateX, setTranslateY]
  )

  const handleScale = useCallback(
    (e: any) => {
      setImageSize(`${e.scale[0]}`)
    },
    [setImageSize]
  )

  const [domWidth, domHeight]: number[] = domResolution.split('x').map(Number)
  return (
    <Moveable
      target={document.getElementById(id)}
      draggable={true}
      throttleDrag={0}
      onDrag={handleDrag}
      scalable={true}
      keepRatio={true}
      onScale={handleScale}
      rotatable={true}
      rotationPosition={'top'}
      onRotate={(e) => {
        setRotate(`${e.rotation}`)
      }}
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
