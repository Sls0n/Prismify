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

export default function MoveableComponent({ id }: { id: string }) {
  const { quality } = useImageQualityStore()
  const { domResolution, scaleFactor } = useResizeCanvas()
  const { setImages, images, selectedImage } = useImageOptions()
  const moveableRef = React.useRef<typeof Moveable>(null)

  const handleDrag = useCallback(
    (e: any) => {
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  translateX: e?.lastEvent?.translate[0],
                  translateY: e?.lastEvent?.translate[1],
                },
              }
            : image
        )
      )
    },
    [images, selectedImage, setImages]
  )

  const handleRotate = useCallback(
    (e: any) => {
      console.log(e)
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  rotate: e?.lastEvent?.rotate,
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
                  imageSize: `${e.lastEvent.scale[0]}`,
                  translateX: e?.lastEvent?.drag.translate[0],
                  translateY: e?.lastEvent?.drag.translate[1],
                },
              }
            : image
        )
      )
    },
    [setImages, images, selectedImage]
  )

  const otherImages = images.filter((image) => image.id !== selectedImage)
  const elementGuidelines = otherImages.map((image) => ({
    element: document.getElementById(`${image.id}`),
  }))

  const [domWidth, domHeight]: number[] = domResolution.split('x').map(Number)
  return (
    <>
      <Moveable
        ref={moveableRef as any}
        target={document?.getElementById(id)}
        draggable={true}
        onDrag={(e) => {
          e.target.style.transform = e.transform
        }}
        onDragEnd={handleDrag}
        scalable={true}
        keepRatio={true}
        onScale={(e) => {
          e.target.style.transform = e.drag.transform
        }}
        onScaleEnd={handleScale}
        rotatable={true}
        rotationPosition={'top'}
        onRotate={(e) => {
          e.target.style.transform = e.drag.transform
        }}
        onRotateEnd={handleRotate}
        snapRotationThreshold={5}
        snapRotationDegrees={[0, 90, 180, 270]}
        snappable={true}
        snapDirections={{
          center: true,
          middle: true,
          left: true,
          top: true,
          right: true,
          bottom: true,
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
    </>
  )
}
