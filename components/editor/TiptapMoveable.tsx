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
  const { images, selectedImage, texts, selectedText } = useImageOptions()

  const [domWidth, domHeight]: number[] = domResolution.split('x').map(Number)

  const otherImages = images.filter((image) => image.id !== selectedImage)
  const otherTexts = texts.filter((text) => text.id !== selectedText)
  const elementGuidelines = [
    ...otherImages.map((image) => ({
      element: document.getElementById(`${image.id}`),
    })),
    ...otherTexts.map((text) => ({
      element: document.getElementById(`text-${text.id}`),
    })),
  ]

  return (
    <Moveable
      target={document?.getElementById(id)}
      draggable={true}
      onDrag={(e) => {
        e.target.style.transform = e.transform
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
