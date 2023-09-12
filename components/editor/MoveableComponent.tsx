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
import { useMoveable } from '@/store/use-moveable'

const Moveable = makeMoveable<
  DraggableProps & ScalableProps & RotatableProps & SnappableProps
  // @ts-ignore
>([Draggable, Scalable, Rotatable, Snappable])

export default function MoveableComponent({ id }: { id: string }) {
  const { quality } = useImageQualityStore()
  const { domResolution, scaleFactor } = useResizeCanvas()
  const { setImages, images, selectedImage } = useImageOptions()

  const handleDrag = useCallback(
    (e: any) => {
      e.target.style.transform = e.transform

      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  translateX: e.translate[0],
                  translateY: e.translate[1],
                },
              }
            : image
        )
      )
    },
    [images, selectedImage, setImages]
  )

  const handleScale = useCallback(
    (e: any) => {
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  imageSize: `${e.scale[0]}`,
                },
              }
            : image
        )
      )
    },
    [setImages, images, selectedImage]
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
        setImages(
          images.map((image, index) =>
            index === selectedImage - 1
              ? {
                  ...image,
                  style: {
                    ...image.style,
                    rotate: `${e.rotation}`,
                  },
                }
              : image
          )
        )
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
