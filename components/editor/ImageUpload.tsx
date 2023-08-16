/* eslint-disable @next/next/no-img-element */
'use client'

import { ImageIcon, Upload } from 'lucide-react'
import React, { CSSProperties, ChangeEvent, useCallback, useRef } from 'react'
import { useImageOptions } from '@/store/use-image-options'
import BrowserFrame from './BrowserFrame'
import { usePositionOptions } from '@/store/use-position-options'
import { Button } from '../ui/Button'
import demoImage from '@/public/images/demo-tweet.png'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useActiveIndexStore } from '@/store/use-active-index'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
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
import { useMoveable } from '@/store/use-moveable'
import { useImageQualityStore } from '@/store/use-image-quality'

const Moveable = makeMoveable<
  DraggableProps & ScalableProps & RotatableProps & SnappableProps
  // @ts-ignore
>([Draggable, Scalable, Rotatable, Snappable])

const ImageUpload = () => {
  const targetRef = useRef<HTMLDivElement>(null)

  const {
    isImageUploaded,
    setIsImageUploaded,
    image,
    setImage,
    imageSize,
    imageRoundness,
    imageShadow,
    borderSize,
    setImageSize,
    setImageRoundness,
    setBorderSize,
    borderColor,
  } = useImageOptions()
  const { setShowControls, showControls } = useMoveable()
  const { setResolution, domResolution, scaleFactor } = useResizeCanvas()
  const { quality } = useImageQualityStore()
  const { setImageBackground } = useBackgroundOptions()
  const { setActiveIndex } = useActiveIndexStore()

  const { translateX, translateY, setTranslateX, setTranslateY } =
    usePositionOptions()

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setImage(imageUrl)
        setIsImageUploaded(true)
      }
    },
    [setImage, setIsImageUploaded]
  )

  const handleImageClick = useCallback(() => {
    setShowControls(!showControls)
  }, [setShowControls, showControls])

  useOnClickOutside(targetRef, () => {
    setShowControls(false)
  })

  const imageStyle: CSSProperties = {
    transform: `scale(${imageSize}) translate(${translateX}px, ${translateY}px)`,
    borderRadius: `${imageRoundness}rem`,
    boxShadow: `${imageShadow}`,
    border: `var(--borderSize) solid var(--borderColor)`,
    background: borderSize === '0' ? '' : 'var(--borderColor)',
  }

  const loadDemoImage = () => {
    setImageBackground(
      'https://images.unsplash.com/photo-1618367588411-d9a90fefa881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODUwOTB8MHwxfGNvbGxlY3Rpb258MTF8NXdnSGNtbjM4bTR8fHx8fDJ8fDE2OTIwMTU4MDZ8&ixlib=rb-4.0.3&q=80&w=1080'
    )
    setImage(demoImage.src)
    setIsImageUploaded(true)
    setActiveIndex(2)
    setImageSize('1.5')
    setImageRoundness(1.13)
    setBorderSize('9.5')
    document.documentElement.style.setProperty('--borderSize', `9.5px`)
    document.documentElement.style.setProperty('--borderColor', borderColor)
    setResolution('1920x1080')
  }

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
    <>
      {!image && !isImageUploaded && (
        <>
          <div className="h-25 absolute-center w-4/5 lg:w-3/5">
            <div className="scale flex flex-col gap-4 rounded-xl border-[3px] border-border text-center shadow-md ">
              <div className="flex flex-col items-center justify-center rounded-lg bg-sidebar p-10">
                <Upload
                  className="mx-auto h-10 w-10 text-gray-400"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-base leading-6 text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="focus-within:ring-purple relative cursor-pointer rounded-md font-semibold text-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Load a image</span>
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="sr-only"
                  />
                  <p className="hidden pl-1 sm:block">or drag and drop</p>
                </div>

                <p className="text-sm leading-5 text-gray-400/80">
                  PNG, JPG, GIF up to 10MB
                </p>

                <p className="mt-4 text-sm font-semibold leading-5 text-gray-500">
                  OR
                </p>

                <Button
                  onClick={loadDemoImage}
                  className="mt-4 rounded-md"
                  variant="stylish"
                >
                  Try with a demo image
                  <ImageIcon className="ml-2" size={19} />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {image && isImageUploaded && (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div
              className="flex h-full w-full flex-col overflow-hidden"
              style={imageStyle}
              ref={targetRef}
              onClick={handleImageClick}
            >
              <BrowserFrame />
              <img
                className={`h-full w-full flex-1`}
                src={image}
                alt="Uploaded image"
              />
            </div>
          </div>
          {showControls && (
            <Moveable
              target={targetRef}
              draggable={true}
              throttleDrag={0}
              onDrag={handleDrag}
              scalable={true}
              keepRatio={true}
              onScale={handleScale}
              rotatable={true}
              rotationPosition={'top'}
              onRotate={(e) => {
                e.target.style.transform = e.drag.transform
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
          )}
        </>
      )}
    </>
  )
}

export default ImageUpload
