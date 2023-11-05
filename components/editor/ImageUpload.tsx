/* eslint-disable @next/next/no-img-element */
'use client'

import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import demoImage from '@/public/images/demo-tweet.png'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useColorExtractor } from '@/store/use-color-extractor'
import { useFrameOptions } from '@/store/use-frame-options'
import { useImageOptions } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import {
  calculateEqualCanvasSize,
  convertHex,
  splitWidthHeight,
} from '@/utils/helperFns'
import { ImageIcon, Upload } from 'lucide-react'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import analyze from 'rgbaster'
import { Button } from '../ui/Button'
import BrowserFrame from './BrowserFrame'
import ContextMenuImage from './ContextMenuImage'
import { useEventListener } from '@/hooks/use-event-listener'

const ImageUpload = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const multipleTargetRef = useRef<HTMLDivElement>(null)

  const {
    images,
    setImages,
    setSelectedImage,
    selectedImage,
    setInitialImageUploaded,
    initialImageUploaded,
  } = useImageOptions()
  const {
    setShowControls,
    showControls,
    setIsSelecting,
    isSelecting,
    isMultipleTargetSelected,
    setIsMultipleTargetSelected,
  } = useMoveable()
  const { exactDomResolution } = useResizeCanvas()
  const { width: exactDomWidth, height: exactDomHeight } =
    splitWidthHeight(exactDomResolution)
  const { browserFrame } = useFrameOptions()
  const { imagesCheck } = useColorExtractor()

  useEffect(() => {
    if (images.length === 0) {
      return
    }
    setInitialImageUploaded(true)
    console.log('is extracting colors')
    const extractColors = async () => {
      const result = await analyze(images[images.length - 1].image, {
        scale: 0.3,
      })
      const extractedColors = result.slice(0, 12)
      setImages(
        images.map((image, index) =>
          index === images.length - 1
            ? {
                ...image,
                extractedColors,
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
  console.log(imagesCheck)
  console.log(images)

  const handleImageClick = (id: number) => {
    isMultipleTargetSelected && setIsMultipleTargetSelected(false)
    setShowControls(!showControls)
    setSelectedImage(id)
  }

  useOnClickOutside(
    targetRef,
    () => {
      // if (isMultipleTargetSelected) return
      setShowControls(false)
    },
    isMultipleTargetSelected ? 'mouseup' : 'mousedown'
  )

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
                    className={`image pointer-events-auto flex-1 overflow-hidden ${
                      isSelecting ? 'selectable' : ''
                    }`}
                    ref={
                      !isMultipleTargetSelected
                        ? image.id === selectedImage
                          ? targetRef
                          : null
                        : targetRef
                    }
                    style={{
                      transform: `scale(${image.style.imageSize}) translate(${image.style.translateX}px, ${image.style.translateY}px) rotate(${image.style.rotate}deg) perspective(${image.style.perspective}px) rotateX(${image.style.rotateX}deg) rotateY(${image.style.rotateY}deg) rotateZ(${image.style.rotateZ}deg)`,
                      borderRadius: `${image.style.imageRoundness}rem`,
                      boxShadow:
                        image.style.shadowName !== 'Medium'
                          ? `${image.style.imageShadow} ${convertHex(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}`
                          : `0px 18px 88px -4px ${convertHex(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}, 0px 8px 28px -6px ${convertHex(
                              image.style.shadowColor,
                              image.style.shadowOpacity
                            )}`,

                      padding:
                        browserFrame !== 'None'
                          ? browserFrame === 'Arc'
                            ? '15px'
                            : ''
                          : `${image.style.insetSize}px`,

                      backgroundColor:
                        image.style.insetSize !== '0' && browserFrame === 'None'
                          ? `${image?.style.insetColor}`
                          : browserFrame === 'Arc'
                          ? '#ffffff50'
                          : '',

                      border:
                        browserFrame === 'Arc' ? '1px solid #ffffff60' : '',
                    }}
                    id={`${image.id}`}
                    onClick={() => {
                      handleImageClick(image.id)
                    }}
                    // on right click too do the same
                    onContextMenu={(e) => {
                      handleImageClick(image.id)
                    }}
                  >
                    <BrowserFrame />
                    <img
                      className={`h-full w-full ${
                        browserFrame === 'Arc' ? 'shadow-md' : ''
                      }`}
                      src={image.image}
                      alt="Uploaded image"
                      style={{
                        borderRadius:
                          browserFrame !== 'None'
                            ? browserFrame === 'Arc'
                              ? `calc(${image.style.imageRoundness}rem - 9px)`
                              : ''
                            : `calc(${image.style.imageRoundness}rem - ${image.style.insetSize}px)`,

                        padding:
                          browserFrame === 'None'
                            ? ''
                            : `${image.style.insetSize}px`,

                        backgroundColor:
                          image.style.insetSize !== '0' &&
                          browserFrame !== 'None'
                            ? `${image?.style.insetColor}`
                            : '',
                      }}
                    />
                  </div>
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
  const {
    images,
    setImages,
    defaultStyle,
    setSelectedImage,
    setInitialImageUploaded,
  } = useImageOptions()
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
          insetSize: '10',
        },
      },
    ])
    setImagesCheck([...imagesCheck, demoImage.src])
    document?.documentElement.style.setProperty('--borderSize1', `15px`)
    document?.documentElement.style.setProperty(
      '--borderColor1',
      defaultStyle.borderColor
    )
    document?.documentElement.style.setProperty('--borderRoundness1', '2rem')
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
          className="h-25 absolute-center w-4/5 lg:w-3/5"
        >
          <div className="flex flex-col gap-4 rounded-xl border-border text-center md:border-[3px] md:shadow-md ">
            <div className="flex-center flex-col rounded-lg p-10 md:bg-sidebar">
              <Upload
                style={{
                  transition: 'all 0.8s cubic-bezier(0.6, 0.6, 0, 1)',
                }}
                className={`mx-auto hidden h-10 w-10 text-gray-400 sm:block ${
                  isDragging ? 'rotate-180' : 'rotate-0'
                }`}
                aria-hidden="true"
              />
              <div className="flex-center mt-4 text-base leading-6 text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="focus-within:ring-purple relative cursor-pointer rounded-md font-semibold text-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
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
                <p className="hidden pl-1 md:block">or drag and drop</p>
              </div>

              <p className="mt-4 hidden text-sm font-semibold leading-5 text-gray-500 sm:block">
                OR
              </p>

              <Button
                onClick={loadDemoImage}
                className="z-[120] mt-4 hidden rounded-md sm:inline-flex"
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
