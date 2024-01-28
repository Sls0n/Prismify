/* eslint-disable @next/next/no-img-element */
'use client'

import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import demoImage from '@/public/images/demo-tweet.png'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useColorExtractor } from '@/store/use-color-extractor'
import { useFrameOptions } from '@/store/use-frame-options'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import {
  calculateEqualCanvasSize,
  convertHexToRgba,
  splitWidthHeight,
} from '@/utils/helper-fns'
import { ImageIcon, Upload } from 'lucide-react'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { Button } from '../ui/button'
import BrowserFrame from './browser-frames'
import ContextMenuImage from './image-context-menu'

const ImageUpload = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const {
    images,
    setImages,

    setInitialImageUploaded,
    initialImageUploaded,
  } = useImageOptions()
  const { selectedImage, setSelectedImage, setSelectedText } = useSelectedLayers()
  const { setShowControls, isSelecting, isMultipleTargetSelected } =
    useMoveable()
  const { exactDomResolution } = useResizeCanvas()
  const { width: exactDomWidth, height: exactDomHeight } =
    splitWidthHeight(exactDomResolution)
  const { frameHeight, showStroke, arcDarkMode } = useFrameOptions()
  const { imagesCheck } = useColorExtractor()

  useEffect(() => {
    if (images.length === 0) {
      return
    }
    setInitialImageUploaded(true)

    const extractColors = async () => {
      const analyze = (await import('rgbaster')).default

      const result = await analyze(images[images.length - 1].image, {
        scale: 0.5,
      })

      const extractedColors = result.slice(0, 12)

      setImages(
        images.map((image, index) =>
          index === images.length - 1
            ? {
                ...image,
                extractedColors,
                // gradientColors,
                style: {
                  ...image.style,
                  insetColor: extractedColors[0].color,
                },
              }
            : image
        )
      )
    }
    extractColors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesCheck])
  console.log(images)

  useOnClickOutside(targetRef, () => {
    if (isMultipleTargetSelected) return
    // setShowControls(false)
  })

  // useOnClickOutside(multipleTargetRef, () => {
  //   setShowControls(false)

  //   setIsSelecting(false)
  // })

  // const {
  //   imageSize,
  //   imageRoundness,
  //   imageShadow,
  //   borderSize,
  //   borderColor,
  //   rotate,
  // } = images[selectedImage - 1]?.style || {}

  return (
    <>
      {!initialImageUploaded && <LoadAImage />}
      {images && (
        <>
          {images.map((image, index) => {
            if (image.image !== '')
              return (
                <ContextMenuImage key={image.id + index}>
                  <div
                    className={`image image-check absolute z-[2] flex-1 overflow-hidden ${
                      isSelecting ? 'selectable' : ''
                    } ${selectedImage ? '' : ''}`}
                    ref={
                      !isMultipleTargetSelected
                        ? image.id === selectedImage
                          ? targetRef
                          : null
                        : targetRef
                    }
                    style={{
                      // transition:
                      //   'box-shadow 0.8s cubic-bezier(0.6, 0.6, 0, 1)',
                      transformStyle: 'preserve-3d',
                      transformOrigin: `50% 50%`,
                      // rotate: `${image.style.rotate}deg`,
                      // transform: `scale(${image.style.imageSize}) rotateX(${image.style.rotateX}deg) rotateY(${image.style.rotateY}deg) rotateZ(${image.style.rotateZ}deg) `,
                      transform: `perspective(${image.style.perspective}px) translate(${image.style.translateX}%, ${image.style.translateY}%) scale(${image.style.imageSize}) rotate(${image.style.rotate}deg) rotateX(${image.style.rotateX}deg) rotateY(${image.style.rotateY}deg) rotateZ(${image.style.rotateZ}deg)`,
                      borderRadius: `${image.style.imageRoundness}rem`,
                      boxShadow:
                        image.style.shadowName !== 'Medium'
                          ? `${image.style.imageShadow} ${convertHexToRgba(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}${
                              image.frame === 'Shadow'
                                ? ',11px 11px rgba(0,0,0,0.8)'
                                : ''
                            }`
                          : `0px 18px 88px -4px ${convertHexToRgba(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}, 0px 8px 28px -6px ${convertHexToRgba(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}${
                              image.frame === 'Shadow'
                                ? ',11px 11px rgba(0,0,0,0.8)'
                                : ''
                            }`,

                      padding:
                        image.frame !== 'None'
                          ? image.frame === 'Arc'
                            ? frameHeight === 'small'
                              ? '10px'
                              : frameHeight === 'medium'
                              ? '13px'
                              : '15px'
                            : ''
                          : `${image.style.insetSize}px`,

                      backgroundColor:
                        image.style.insetSize !== '0' && image.frame === 'None'
                          ? `${image?.style.insetColor}`
                          : image.frame === 'Arc'
                          ? arcDarkMode
                            ? '#00000050'
                            : '#ffffff50'
                          : image.frame === 'Shadow'
                          ? 'rgba(0,0,0,0.8)'
                          : 'transparent',

                      border:
                        image.frame === 'Arc'
                          ? arcDarkMode
                            ? '1px solid #00000020'
                            : '1px solid #ffffff60'
                          : image.frame === 'Shadow'
                          ? showStroke
                            ? '3px solid rgba(0,0,0,0.8)'
                            : ''
                          : '',

                      zIndex: `${image.style.zIndex}`,
                    }}
                    id={`${image.id}`}
                    onClick={() => {
                      setShowControls(true)
                      setSelectedImage(image.id)
                    }}
                    // on right click too do the same
                    onContextMenu={(e) => {
                      setShowControls(true)
                      setSelectedImage(image.id)
                    }}
                  >
                    <BrowserFrame frame={image.frame || 'None'} />

                    <img
                      draggable={false}
                      className={`pointer-events-none h-full w-full shrink-0 ${
                        image.frame === 'Arc' ? 'shadow-md' : ''
                      }`}
                      id={`img-${image.id}`}
                      src={image.image}
                      alt="Uploaded image"
                      style={{
                        borderRadius:
                          image.frame !== 'None'
                            ? image.frame === 'Arc'
                              ? `calc(${image.style.imageRoundness}rem - 9px)`
                              : ''
                            : `calc(${image.style.imageRoundness}rem - ${image.style.insetSize}px)`,

                        padding:
                          image.frame === 'None'
                            ? ''
                            : `${image.style.insetSize}px`,

                        backgroundColor:
                          image.style.insetSize !== '0' &&
                          image.frame !== 'None'
                            ? `${image?.style.insetColor}`
                            : '',
                      }}
                    />
                  </div>

                  {/* Trying layout feature! */}
                  {/* <div
                    className={`flex flex-col image image-check absolute flex-1 z-[2]   ${
                      isSelecting ? 'selectable' : ''
                    } ${selectedImage ? '' : ''}`}
                    style={{
                      // width: '65%',
                      // maxHeight: '35%',
                      width: `${+image.style.imageSize * +exactDomWidth}px`,
                      maxHeight: `${+image.style.imageSize * +exactDomHeight}px`,
                      // transform: `translate(35%,50%) rotateX(40deg) rotate(50deg) scale(1.3) skew(8deg, 0deg)`,
                      borderRadius: `${image.style.imageRoundness}rem`,
                      boxShadow:
                        image.style.shadowName !== 'Medium'
                          ? `${image.style.imageShadow} ${convertHexToRgba(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}${
                              image.frame === 'Shadow'
                                ? ',11px 11px rgba(0,0,0,0.8)'
                                : ''
                            }`
                          : `0px 18px 88px -4px ${convertHexToRgba(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}, 0px 8px 28px -6px ${convertHexToRgba(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}${
                              image.frame === 'Shadow'
                                ? ',11px 11px rgba(0,0,0,0.8)'
                                : ''
                            }`,
                    }}
                    ref={
                      !isMultipleTargetSelected
                        ? image.id === selectedImage
                          ? targetRef
                          : null
                        : targetRef
                    }
                    id={`${image.id}`}
                    onClick={() => {
                      setShowControls(true)
                      setSelectedImage(image.id)
                    }}
                    onContextMenu={(e) => {
                      setShowControls(true)
                      setSelectedImage(image.id)
                    }}
                  >
                    <BrowserFrame frame={image.frame || 'None'} />
                    <img
                      draggable={false}
                      className={`pointer-events-none h-full w-full shrink-0 object-cover object-center ${
                        image.frame === 'Arc' ? 'shadow-md' : ''
                      }`}
                      id={`img-${image.id}`}
                      src={image.image}
                      alt="Uploaded image"
                      style={{
                        borderRadius:
                          image.frame !== 'None'
                            ? image.frame === 'Arc'
                              ? `calc(${image.style.imageRoundness}rem - 9px)`
                              : ''
                            : `calc(${image.style.imageRoundness}rem - ${image.style.insetSize}px)`,

                        padding:
                          image.frame === 'None'
                            ? ''
                            : `${image.style.insetSize}px`,

                        backgroundColor:
                          image.style.insetSize !== '0' &&
                          image.frame !== 'None'
                            ? `${image?.style.insetColor}`
                            : '',
                      }}
                    />
                  </div> */}
                </ContextMenuImage>
              )
          })}
        </>
      )}
    </>
  )
}

export default ImageUpload

function LoadAImage() {
  const { images, setImages, defaultStyle, setInitialImageUploaded } =
    useImageOptions()
  const { setSelectedImage } = useSelectedLayers()
  const { imagesCheck, setImagesCheck } = useColorExtractor()
  const { setResolution, automaticResolution } = useResizeCanvas()
  const { setBackground } = useBackgroundOptions()
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleImageLoad = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setInitialImageUploaded(true)

        setImagesCheck([...imagesCheck, imageUrl])
        setImages([
          ...images,
          { image: imageUrl, id: images.length + 1, style: defaultStyle },
        ])
        setSelectedImage(images.length + 1)

        if (images.length > 0) return
        if (automaticResolution) {
          const padding = 200
          const img = new Image()
          img.src = imageUrl

          img.onload = () => {
            const { naturalWidth, naturalHeight } = img
            const newResolution = calculateEqualCanvasSize(
              naturalWidth,
              naturalHeight,
              padding
            )
            setResolution(newResolution.toString())
          }
        }
      }
    },
    [
      setInitialImageUploaded,
      setImagesCheck,
      imagesCheck,
      setImages,
      images,
      defaultStyle,
      setSelectedImage,
      automaticResolution,
      setResolution,
    ]
  )

  const handleImageChange = useCallback(
    (file: any) => {
      // const file = event.target.files?.[0]

      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setInitialImageUploaded(true)

        setImagesCheck([...imagesCheck, imageUrl])
        setImages([
          ...images,
          { image: imageUrl, id: images.length + 1, style: defaultStyle },
        ])
        setSelectedImage(images.length + 1)

        if (images.length > 0) return
        if (automaticResolution) {
          const padding = 250
          const img = new Image()
          img.src = imageUrl

          img.onload = () => {
            const { naturalWidth, naturalHeight } = img
            const newResolution = calculateEqualCanvasSize(
              naturalWidth,
              naturalHeight,
              padding
            )
            setResolution(newResolution.toString())
          }
        }
      }
    },
    [
      setInitialImageUploaded,
      setImagesCheck,
      imagesCheck,
      setImages,
      images,
      defaultStyle,
      setSelectedImage,
      automaticResolution,
      setResolution,
    ]
  )

  const loadDemoImage = () => {
    if (typeof window === 'undefined') return
    setBackground('linear-gradient(var(--gradient-angle), #898aeb, #d8b9e3)')
    document?.documentElement.style.setProperty(
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
          imageRoundness: 0.7,
          imageSize: '0.78',
          insetSize: '10',
        },
      },
    ])
    setImagesCheck([...imagesCheck, demoImage.src])
    setResolution('1920x1080')
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={(acceptedFiles) => {
        handleImageChange(acceptedFiles[0])
      }}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      noClick
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="h-25 absolute-center w-4/5 xl:w-2/5"
        >
          <div className="flex flex-col gap-4 rounded-xl  text-center  md:shadow-2xl">
            <div className="flex-center flex-col rounded-xl px-4 py-10 md:bg-[#f1f1f1]">
              <Upload
                style={{
                  transition: 'all 0.8s cubic-bezier(0.6, 0.6, 0, 1)',
                }}
                className={`mx-auto mb-2 hidden h-10 w-10 text-[#332]/80 sm:block ${
                  isDragging ? 'rotate-180' : 'rotate-0'
                }`}
                aria-hidden="true"
              />
              <div className="flex-center mt-4 text-base leading-6 text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="focus-within:ring-purple relative cursor-pointer rounded-md font-bold text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-purple"
                >
                  <span>Load a image</span>
                </label>
                <input {...getInputProps()} />
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  onChange={handleImageLoad}
                  accept="image/*"
                  className="sr-only"
                />
                <p className="hidden pl-1 font-medium text-[#333]/80 lg:block">
                  or drag and drop
                </p>
              </div>

              <p className="mt-4 hidden text-sm font-extrabold leading-5 text-[#555]/80 sm:block">
                OR
              </p>

              <Button
                onClick={loadDemoImage}
                className="z-[120] mt-4 hidden rounded-md border-[#898aeb]/40 bg-[#898aeb]/30 font-semibold text-[#6264aa] shadow-sm sm:inline-flex"
                variant="stylish"
              >
                Try with a demo image
                <ImageIcon className="ml-2" size={19} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  )
}
