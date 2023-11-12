'use client'

import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import React from 'react'

import { useImageQualityStore } from '@/store/use-image-quality'
import { useMoveable } from '@/store/use-moveable'
import { splitWidthHeight } from '@/utils/helperFns'
import {
  Draggable,
  DraggableProps,
  GroupableProps,
  OnDragEnd,
  OnRenderGroupEnd,
  OnRotateEnd,
  OnScaleEnd,
  Rotatable,
  RotatableProps,
  Scalable,
  ScalableProps,
  Snappable,
  SnappableProps,
  makeMoveable,
} from 'react-moveable'

const Moveable = makeMoveable<
  DraggableProps &
    ScalableProps &
    RotatableProps &
    SnappableProps &
    GroupableProps
  // @ts-ignore
>([Draggable, Scalable, Rotatable, Snappable])

export default function MoveableComponent({ id }: { id: string }) {
  const { quality } = useImageQualityStore()
  const { domResolution, scaleFactor, exactDomResolution } = useResizeCanvas()
  const { setImages, images } = useImageOptions()
  const { selectedImage } = useSelectedLayers()
  const moveableRef = React.useRef<typeof Moveable>()
  const { width, height } = splitWidthHeight(exactDomResolution)
  const { isMultipleTargetSelected } = useMoveable()

  const handleDrag = (e: OnDragEnd) => {
    // e.target.style.transform = e?.lastEvent.style.transform
    if (e?.lastEvent?.translate) {
      console.log(e)
      selectedImage &&
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
    }
  }

  const handleRotate = (e: OnRotateEnd) => {
    selectedImage &&
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
  }

  const handleScale = (e: OnScaleEnd) => {
    console.log(e)
    selectedImage &&
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  imageSize: `${e.lastEvent?.scale[0]}`,
                  translateX: e?.lastEvent?.drag?.translate[0],
                  translateY: e?.lastEvent?.drag.translate[1],
                },
              }
            : image
        )
      )
  }

  const handleRenderGroupEnd = (e: OnRenderGroupEnd) => {
    if (isMultipleTargetSelected) {
      const updatedImages = images.map((image, index) => {
        const targetIndex = e.events.findIndex(
          (ev: any) => ev.target.id === `${image.id}`
        )
        const updatedEvent = e.events[targetIndex]

        if (targetIndex !== -1) {
          const updatedEvent = e.events[targetIndex]

          console.log(updatedEvent)

          return {
            ...image,
            style: {
              ...image.style,
              translateX: updatedEvent.transformObject.translate[0],
              translateY: updatedEvent.transformObject.translate[1],
              rotate: updatedEvent.transformObject.rotate,
              imageSize: `${updatedEvent.transformObject.scale[0]}`,
              rotateX: updatedEvent.transformObject.rotateX,
              rotateY: updatedEvent.transformObject.rotateY,
              rotateZ: updatedEvent.transformObject.rotateZ,
            },
          }
        }

        // Return the original image if the target is not found
        return image
      })

      setImages(updatedImages)
    }
  }

  const otherImages = images.filter((image) => image.id !== selectedImage)
  const elementGuidelines = otherImages.map((image) => ({
    element: document?.getElementById(`${image.id}`),
  }))

  const [domWidth, domHeight]: number[] = domResolution.split('x').map(Number)
  return (
    <>
      <Moveable
        ref={moveableRef as any}
        target={
          isMultipleTargetSelected ? '.selected' : document?.getElementById(id)
        }
        hideChildMoveableDefaultLines={true}
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
        elementGuidelines={!isMultipleTargetSelected ? elementGuidelines : []}
        onRenderGroup={(e) => {
          if (!isMultipleTargetSelected) return

          e.events.forEach((ev) => {
            ev.target.style.transform = ev.transform
          })
        }}
        onRenderGroupEnd={handleRenderGroupEnd}
      />
    </>
  )
}
