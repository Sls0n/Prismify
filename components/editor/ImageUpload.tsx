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
import { useFrameOptions } from '@/store/use-frame-options'
import MoveableComponent from './MoveableComponent'

const Moveable = makeMoveable<
  DraggableProps & ScalableProps & RotatableProps & SnappableProps
  // @ts-ignore
>([Draggable, Scalable, Rotatable, Snappable])

const ImageUpload = () => {
  const targetRef = useRef<HTMLDivElement>(null)

  const {
    imageSize,
    imageRoundness,
    imageShadow,
    borderSize,
    setImageSize,
    setImageRoundness,
    setBorderSize,
    borderColor,
    rotate,
    images,
    setImages,
    setSelectedImage,
    selectedImage,
  } = useImageOptions()
  const { setShowControls, showControls } = useMoveable()
  const { setResolution, domResolution, scaleFactor } = useResizeCanvas()
  const { setImageBackground } = useBackgroundOptions()
  const { setActiveIndex } = useActiveIndexStore()
  const { browserFrame } = useFrameOptions()

  const { translateX, translateY, setTranslateX, setTranslateY } =
    usePositionOptions()

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setImages([...images, { image: imageUrl, id: images.length + 1 }])
      }
    },
    [setImages, images]
  )

  const handleImageClick = useCallback(
    (id: number) => {
      setShowControls(!showControls)
      setSelectedImage(id)
    },
    [setShowControls, showControls, setSelectedImage]
  )

  useOnClickOutside(targetRef, () => {
    setShowControls(false)
  })

  const imageStyle: CSSProperties = {
    transform: `scale(${imageSize}) translate(${translateX}px, ${translateY}px)`,
    borderRadius: `${imageRoundness}rem`,
    boxShadow: `${imageShadow}`,
    // If browserFrame is 'None', then only apply a border only if borderSize is not '0',
    border:
      browserFrame !== 'None'
        ? ''
        : borderSize === '0'
        ? ''
        : `1px solid var(--borderColor)`,

    padding: browserFrame !== 'None' ? '' : `var(--borderSize)`,
    background: borderSize === '0' ? '' : 'var(--borderColor)',
    rotate: `${rotate}deg`,
  }

  const loadDemoImage = () => {
    setImageBackground(
      'https://images.unsplash.com/photo-1615716039130-2d84e4bef125?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODUwOTB8MHwxfGNvbGxlY3Rpb258M3w1d2dIY21uMzhtNHx8fHx8Mnx8MTY5MjUxNzA3MHw&ixlib=rb-4.0.3&q=85'
    )
    setImages([...images, { image: demoImage.src, id: 1 }])
    setActiveIndex(2)
    setImageSize('1.5')
    setImageRoundness(1.13)
    setBorderSize('7')
    document.documentElement.style.setProperty('--borderSize', `7px`)
    document.documentElement.style.setProperty('--borderColor', borderColor)
    document.documentElement.style.setProperty('--borderRoundness', '1.13rem')
    setResolution('1920x1080')
  }

  return (
    <>
      {images.length === 0 && (
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

      {images && (
        <>
          {images.map((image) => {
            return (
              <div
                key={image.image}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              >
                <div
                  className="flex h-full w-full flex-col overflow-hidden"
                  style={imageStyle}
                  ref={targetRef}
                  id={`${image.id}`}
                  onClick={() => handleImageClick(image.id)}
                >
                  <BrowserFrame />
                  <img
                    className={`h-full w-full flex-1`}
                    src={image.image}
                    alt="Uploaded image"
                    style={{
                      borderRadius:
                        browserFrame !== 'None'
                          ? ``
                          : 'calc(var(--borderRoundness) - 6px)',
                    }}
                  />
                </div>
              </div>
            )
          })}

          {showControls && <MoveableComponent id={`${selectedImage}`} />}
        </>
      )}
    </>
  )
}

export default ImageUpload
