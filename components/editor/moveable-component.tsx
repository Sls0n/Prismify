'use client'

import React from 'react'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'

import { useImageQualityStore } from '@/store/use-image-quality'
import { useMoveable } from '@/store/use-moveable'
import { splitWidthHeight } from '@/utils/helper-fns'
import {
  Draggable,
  DraggableProps,
  GroupableProps,
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

  const otherImages = images.filter((image) => image.id !== selectedImage)
  const elementGuidelines = otherImages.map((image) => ({
    element:
      typeof document !== 'undefined'
        ? document?.getElementById(`${image.id}`)
        : '',
  }))

  const [domWidth, domHeight]: number[] = domResolution.split('x').map(Number)
  return (
    <Moveable
      ref={moveableRef as any}
      target={
        isMultipleTargetSelected
          ? '.selected'
          : typeof document !== 'undefined'
          ? document?.getElementById(id)
          : ''
      }
      hideChildMoveableDefaultLines={true}
      draggable={true}
      onDrag={({ target, beforeTranslate }) => {
        const perspective = target.style.transform.match(/perspective\((.*?)\)/)
        // @ts-expect-error
        const xPerc = (beforeTranslate[0] / target?.offsetWidth) * 100
        // @ts-expect-error
        const yPerc = (beforeTranslate[1] / target?.offsetHeight) * 100

        const scale = target.style.transform.match(/scale\((.*?)\)/)

        const rotate = target.style.transform.match(/rotate\((.*?)\)/)

        const rotateX = target.style.transform.match(/rotateX\((.*?)\)/)
        const rotateY = target.style.transform.match(/rotateY\((.*?)\)/)
        const rotateZ = target.style.transform.match(/rotateZ\((.*?)\)/)

        target.style.transform = `${
          perspective ? perspective[0] : ''
        } translate(${xPerc}%, ${yPerc}%) ${scale ? scale[0] : ''} ${
          rotate ? rotate[0] : ''
        } ${rotateX ? rotateX[0] : ''} ${rotateY ? rotateY[0] : ''} ${
          rotateZ ? rotateZ[0] : ''
        } `
      }}
      onDragEnd={({ target, lastEvent }) => {
        // @ts-expect-error
        const xPerc = (lastEvent?.translate[0] / target?.offsetWidth) * 100
        // @ts-expect-error
        const yPerc = (lastEvent?.translate[1] / target?.offsetHeight) * 100

        selectedImage &&
          setImages(
            images.map((image, index) =>
              index === selectedImage - 1
                ? {
                    ...image,
                    style: {
                      ...image.style,
                      translateX: xPerc,
                      translateY: yPerc,
                    },
                  }
                : image
            )
          )
      }}
      scalable={true}
      keepRatio={true}
      onScale={({ scale, target, drag }) => {
        const perspective = target.style.transform.match(/perspective\((.*?)\)/)
        const rotateX = target.style.transform.match(/rotateX\((.*?)\)/)

        const scaleX = scale[0]
        const scaleY = scale[1]

        const rotate = target.style.transform.match(/rotate\((.*?)\)/)

        const rotateY = target.style.transform.match(/rotateY\((.*?)\)/)
        const rotateZ = target.style.transform.match(/rotateZ\((.*?)\)/)

        // @ts-expect-error
        const xPerc = (drag.beforeTranslate[0] / target.offsetWidth) * 100
        // @ts-expect-error
        const yPerc = (drag.beforeTranslate[1] / target.offsetHeight) * 100

        target.style.transform = `${
          perspective ? perspective[0] : ''
        } translate(${xPerc}%, ${yPerc}%) scale(${scaleX}, ${scaleY}) ${
          rotate ? rotate[0] : ''
        } ${rotateX ? rotateX[0] : ''} ${rotateY ? rotateY[0] : ''} ${
          rotateZ ? rotateZ[0] : ''
        }`
      }}
      onScaleEnd={({ target, lastEvent }) => {
        const scaleX = lastEvent.scale[0]
        // @ts-expect-error
        const xPerc = (lastEvent?.drag?.translate[0] / target.offsetWidth) * 100
        const yPerc =
          // @ts-expect-error
          (lastEvent?.drag?.translate[1] / target.offsetHeight) * 100

        selectedImage &&
          setImages(
            images.map((image, index) =>
              index === selectedImage - 1
                ? {
                    ...image,
                    style: {
                      ...image.style,
                      translateX: xPerc,
                      translateY: yPerc,
                      imageSize: `${scaleX}`,
                    },
                  }
                : image
            )
          )
      }}
      rotatable={!isMultipleTargetSelected}
      rotationPosition={'top'}
      onRotate={({ target, beforeRotate }) => {
        const scale = target.style.transform.match(/scale\((.*?)\)/)
        const translate = target.style.transform.match(/translate\((.*?)\)/)

        const perspective = target.style.transform.match(/perspective\((.*?)\)/)
        const rotateX = target.style.transform.match(/rotateX\((.*?)\)/)
        const rotateY = target.style.transform.match(/rotateY\((.*?)\)/)
        const rotateZ = target.style.transform.match(/rotateZ\((.*?)\)/)

        const rotate = beforeRotate || ''

        target.style.transform = `${perspective ? perspective[0] : ''} ${
          translate ? translate[0] : ''
        } ${scale ? scale[0] : ''} ${rotate ? `rotate(${rotate}deg)` : ''} ${
          rotateX ? rotateX[0] : ''
        } ${rotateY ? rotateY[0] : ''} ${rotateZ ? rotateZ[0] : ''}`
      }}
      onRotateEnd={({ target, lastEvent }) => {
        const rotate = lastEvent.rotate

        selectedImage &&
          setImages(
            images.map((image, index) =>
              index === selectedImage - 1
                ? {
                    ...image,
                    style: {
                      ...image.style,
                      rotate: rotate,
                    },
                  }
                : image
            )
          )
      }}
      snapRotationThreshold={2}
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
      onRenderGroup={({ targets, events }) => {
        if (!isMultipleTargetSelected) return

        events.forEach((ev) => {
          ev.target.style.transform = ev.transform
        })
      }}
      onRenderGroupEnd={({ targets, events }) => {
        if (isMultipleTargetSelected) {
          const updatedImages = images.map((image, index) => {
            const targetIndex = events.findIndex(
              (ev: any) => ev.target.id === `${image.id}`
            )
            const updatedEvent = events[targetIndex]

            if (targetIndex !== -1) {
              const updatedEvent = events[targetIndex]

              const xPerc =
                (updatedEvent?.transformObject?.translate[0] /
                  // @ts-expect-error
                  targets[targetIndex]?.offsetWidth) *
                100
              const yPerc =
                (updatedEvent?.transformObject?.translate[1] /
                  // @ts-expect-error
                  targets[targetIndex]?.offsetHeight) *
                100

              return {
                ...image,
                style: {
                  ...image.style,
                  translateX: xPerc,
                  translateY: yPerc,
                  imageSize: `${updatedEvent.transformObject.scale[0]}`,
                },
              }
            }

            // Return the original image if the target is not found
            return image
          })

          setImages(updatedImages)
        }
      }}
    />
  )
}
