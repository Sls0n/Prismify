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
              // rotate: updatedEvent.transformObject.rotate,
              imageSize: `${updatedEvent.transformObject.scale[0]}`,
              // rotateX: updatedEvent.transformObject.rotateX,
              // rotateY: updatedEvent.transformObject.rotateY,
              // rotateZ: updatedEvent.transformObject.rotateZ,
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
    element:
      typeof document !== 'undefined'
        ? document?.getElementById(`${image.id}`)
        : '',
  }))

  const [domWidth, domHeight]: number[] = domResolution.split('x').map(Number)
  return (
    <>
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
          const perspective =
            target.style.transform.match(/perspective\((.*?)\)/)
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
        // onDragEnd={handleDrag}
        scalable={true}
        keepRatio={true}
        onScale={({ scale, target, drag }) => {
          const perspective =
            target.style.transform.match(/perspective\((.*?)\)/)
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
        // onScaleEnd={handleScale}
        rotatable={!isMultipleTargetSelected}
        rotationPosition={'top'}
        onRotate={({ target, beforeRotate }) => {
          const scale = target.style.transform.match(/scale\((.*?)\)/)
          const translate = target.style.transform.match(/translate\((.*?)\)/)

          const perspective =
            target.style.transform.match(/perspective\((.*?)\)/)
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
        // onRotateEnd={handleRotate}
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
        onRenderGroup={({ targets, events }) => {
          events.forEach((ev) => {
            const perspective =
              ev.target.style.transform.match(/perspective\((.*?)\)/)
            const xPerc =
              // @ts-expect-error
              (ev?.transformObject?.translate[0] / ev?.target?.offsetWidth) *
              100
            const yPerc =
              // @ts-expect-error
              (ev?.transformObject?.translate[1] / ev?.target?.offsetHeight) *
              100

            const scale = ev.target.style.transform.match(/scale\((.*?)\)/)

            const rotate = ev.target.style.transform.match(/rotate\((.*?)\)/)

            const rotateX = ev.target.style.transform.match(/rotateX\((.*?)\)/)
            const rotateY = ev.target.style.transform.match(/rotateY\((.*?)\)/)
            const rotateZ = ev.target.style.transform.match(/rotateZ\((.*?)\)/)

            ev.target.style.transform = `${
              perspective ? perspective[0] : ''
            } translate(${xPerc}%, ${yPerc}%) ${scale ? scale[0] : ''} ${
              rotate ? rotate[0] : ''
            } ${rotateX ? rotateX[0] : ''} ${rotateY ? rotateY[0] : ''} ${
              rotateZ ? rotateZ[0] : ''
            } `
          })
        }}
      />
    </>
  )
}
