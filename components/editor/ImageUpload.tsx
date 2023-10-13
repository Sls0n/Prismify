/* eslint-disable @next/next/no-img-element */
'use client'

import Selecto from 'react-selecto'
import { ImageIcon, Upload } from 'lucide-react'
import React, { ChangeEvent, useCallback, useRef } from 'react'
import { useImageOptions } from '@/store/use-image-options'
import BrowserFrame from './BrowserFrame'
import { Button } from '../ui/Button'
import demoImage from '@/public/images/demo-tweet.png'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useActiveIndexStore } from '@/store/use-active-index'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useMoveable } from '@/store/use-moveable'
import { useFrameOptions } from '@/store/use-frame-options'
import MoveableComponent from './MoveableComponent'
import { convertHex } from '@/utils/helperFns'

const ImageUpload = () => {
  const targetRef = useRef<HTMLDivElement>(null)

  const { images, setImages, setSelectedImage, selectedImage, defaultStyle } =
    useImageOptions()
  const { setShowControls, showControls, setShowTextControls } = useMoveable()
  const { setResolution } = useResizeCanvas()
  const { setBackground } = useBackgroundOptions()
  const { setActiveIndex } = useActiveIndexStore()
  const { browserFrame } = useFrameOptions()

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        const imageUrl = URL.createObjectURL(file)
        console.log(imageUrl)
        setImages([
          ...images,
          { image: imageUrl, id: images.length + 1, style: defaultStyle },
        ])
      }
    },
    [setImages, images, defaultStyle]
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

  // const {
  //   imageSize,
  //   imageRoundness,
  //   imageShadow,
  //   borderSize,
  //   borderColor,
  //   rotate,
  // } = images[selectedImage - 1]?.style || {}

  const loadDemoImage = () => {
    setBackground('linear-gradient(var(--gradient-angle), #898aeb, #d8b9e3)')
    document.documentElement.style.setProperty(
      '--gradient-bg',
      ' linear-gradient(var(--gradient-angle), #898aeb, #d8b9e3)'
    )
    setImages([
      ...images,
      {
        image: demoImage.src,
        id: 1,
        style: {
          ...defaultStyle,
          borderSize: '15',
          imageRoundness: 2,
          imageSize: '0.78',
        },
      },
    ])
    setActiveIndex(2)
    document.documentElement.style.setProperty('--borderSize1', `15px`)
    document.documentElement.style.setProperty(
      '--borderColor1',
      defaultStyle.borderColor
    )
    document.documentElement.style.setProperty('--borderRoundness1', '2rem')
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
          <div className="absolute flex items-center ">
            {images.map((image) => {
              return (
                <div
                  key={image.image}
                  className={`image flex h-full w-full flex-col overflow-hidden `}
                  ref={image.id === selectedImage ? targetRef : null}
                  style={{
                    transform: `scale(${image.style.imageSize}) translate(${image.style.translateX}px, ${image.style.translateY}px) rotate(${image.style.rotate}deg)`,
                    borderRadius: `${image.style.imageRoundness}rem`,
                    // boxShadow: `${image.style.imageShadow} ${image.style.shadowColor}`,
                    boxShadow:
                      image.style.shadowName !== 'Small'
                        ? `${image.style.imageShadow} ${convertHex(
                            image.style.shadowColor,
                            image.style.shadowOpacity
                          )}`
                        : `0 10px 25px -5px ${convertHex(
                            image.style.shadowColor,
                            image.style.shadowOpacity - 0.25
                          )}, 0 8px 10px -6px ${convertHex(
                            image.style.shadowColor,
                            image.style.shadowOpacity - 0.25
                          )}`,

                    // If browserFrame is 'None', then only apply a border only if borderSize is not '0',
                    border:
                      browserFrame !== 'None'
                        ? ''
                        : image.style.borderSize === '0'
                        ? ''
                        : `1px solid var(--borderColor${image.id})`,

                    padding:
                      browserFrame !== 'None'
                        ? ''
                        : `var(--borderSize${image.id})`,
                    background:
                      image.style.borderSize === '0'
                        ? ''
                        : `var(--borderColor${image.id})`,
                  }}
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
                          : `calc(var(--borderRoundness${image.id}) - 9px)`,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </>
      )}
      {showControls && <MoveableComponent id={`${selectedImage}`} />}
    </>
  )
}

export default ImageUpload
