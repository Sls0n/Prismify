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
} from '@/utils/helper-fns'
import { ImageIcon, Upload } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { Button } from '../ui/button'
import BrowserFrame from './browser-frames'
import ContextMenuImage from './image-context-menu'
import { ImageItem } from '@/store/use-image-options'

const DEFAULT_PADDING = 200

function getImageContainerStyle(
  image: ImageItem,
  frameHeight: string,
  showStroke: boolean,
  arcDarkMode: boolean
) {
  const { style, frame = 'None' } = image

  const getFramePadding = () => {
    if (frame === 'None') return `${style.insetSize}px`
    if (frame === 'Arc') {
      return frameHeight === 'small' ? '10px' : frameHeight === 'medium' ? '13px' : '15px'
    }
    return ''
  }

  const getBackgroundColor = () => {
    if (style.insetSize !== '0' && frame === 'None') return style.insetColor
    if (frame === 'Arc') return arcDarkMode ? '#00000050' : '#ffffff50'
    if (frame === 'Shadow') return 'rgba(0,0,0,0.8)'
    return 'transparent'
  }

  const getBorder = () => {
    if (frame === 'Arc') {
      return arcDarkMode ? '1px solid #00000020' : '1px solid #ffffff60'
    }
    if (frame === 'Shadow' && showStroke) return '3px solid rgba(0,0,0,0.8)'
    return ''
  }

  const getShadow = () => {
    const shadowColor = convertHexToRgba(style.shadowColor, style.shadowOpacity)
    const frameShadowSuffix = frame === 'Shadow' ? ',11px 11px rgba(0,0,0,0.8)' : ''

    if (style.shadowName !== 'Medium') {
      return `${style.imageShadow} ${shadowColor}${frameShadowSuffix}`
    }
    return `0px 18px 88px -4px ${shadowColor}, 0px 8px 28px -6px ${shadowColor}${frameShadowSuffix}`
  }

  return {
    transformStyle: 'preserve-3d' as const,
    transformOrigin: '50% 50%',
    transform: `perspective(${style.perspective}px) translate(${style.translateX}%, ${style.translateY}%) scale(${style.imageSize}) rotate(${style.rotate}deg) rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) rotateZ(${style.rotateZ}deg)`,
    borderRadius: `${style.imageRoundness}rem`,
    boxShadow: getShadow(),
    padding: getFramePadding(),
    backgroundColor: getBackgroundColor(),
    border: getBorder(),
    zIndex: `${style.zIndex}`,
  }
}

function getImageStyle(image: ImageItem) {
  const { style, frame = 'None' } = image

  const getBorderRadius = () => {
    if (frame === 'Arc') return `calc(${style.imageRoundness}rem - 9px)`
    if (frame !== 'None') return ''
    return `calc(${style.imageRoundness}rem - ${style.insetSize}px)`
  }

  return {
    borderRadius: getBorderRadius(),
    padding: frame === 'None' ? '' : `${style.insetSize}px`,
    backgroundColor:
      style.insetSize !== '0' && frame !== 'None' ? style.insetColor : '',
  }
}

const ImageUpload = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const {
    images,
    updateImage,
    updateImageStyle,
    setInitialImageUploaded,
    initialImageUploaded,
  } = useImageOptions()
  const { selectedImage, setSelectedImage } = useSelectedLayers()
  const { setShowControls, isSelecting, isMultipleTargetSelected } = useMoveable()
  const { frameHeight, showStroke, arcDarkMode } = useFrameOptions()
  const { imagesCheck } = useColorExtractor()

  useEffect(() => {
    if (images.length === 0) return
    setInitialImageUploaded(true)

    const extractColors = async () => {
      const analyze = (await import('rgbaster')).default
      const result = await analyze(images[images.length - 1].image, { scale: 0.5 })
      const extractedColors = result.slice(0, 12)

      updateImage(images.length, { extractedColors })
      updateImageStyle(images.length, { insetColor: extractedColors[0].color })
    }
    extractColors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesCheck])

  useOnClickOutside(targetRef, () => {
    if (isMultipleTargetSelected) return
  })

  return (
    <>
      {!initialImageUploaded && <LoadAImage />}
      {images && (
        <>
          {images.map((image, index) => {
            if (image.image === '') return null
            return (
              <ContextMenuImage key={image.id + index}>
                <div
                  className={`image image-check absolute z-[2] flex-1 overflow-hidden ${
                    isSelecting ? 'selectable' : ''
                  }`}
                  ref={
                    !isMultipleTargetSelected
                      ? image.id === selectedImage
                        ? targetRef
                        : null
                      : targetRef
                  }
                  style={getImageContainerStyle(image, frameHeight, showStroke, arcDarkMode)}
                  id={`${image.id}`}
                  onClick={() => {
                    setShowControls(true)
                    setSelectedImage(image.id)
                  }}
                  onContextMenu={() => {
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
                    style={getImageStyle(image)}
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
  const { images, addImage, defaultStyle, setInitialImageUploaded } = useImageOptions()
  const { setSelectedImage } = useSelectedLayers()
  const { imagesCheck, setImagesCheck } = useColorExtractor()
  const { setResolution, automaticResolution } = useResizeCanvas()
  const { setBackground } = useBackgroundOptions()
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleImageUpload = useCallback(
    (file: File) => {
      const imageUrl = URL.createObjectURL(file)
      setInitialImageUploaded(true)
      setImagesCheck([...imagesCheck, imageUrl])
      addImage({ image: imageUrl, id: images.length + 1, style: defaultStyle })
      setSelectedImage(images.length + 1)

      if (images.length > 0 || !automaticResolution) return

      const img = new Image()
      img.src = imageUrl
      img.onload = () => {
        const { naturalWidth, naturalHeight } = img
        const newResolution = calculateEqualCanvasSize(
          naturalWidth,
          naturalHeight,
          DEFAULT_PADDING
        )
        setResolution(newResolution.toString())
      }
    },
    [
      setInitialImageUploaded,
      setImagesCheck,
      imagesCheck,
      images,
      defaultStyle,
      setSelectedImage,
      automaticResolution,
      addImage,
      setResolution,
    ]
  )

  useEffect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (!items) return

      const itemsArray = Array.from(items)
      for (const item of itemsArray) {
        if (item.type.indexOf('image') === 0) {
          const file = item.getAsFile()
          if (file) handleImageUpload(file)
        }
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [handleImageUpload])

  const loadDemoImage = () => {
    if (typeof window === 'undefined') return
    setBackground('linear-gradient(var(--gradient-angle), #898aeb, #d8b9e3)')
    document?.documentElement.style.setProperty(
      '--gradient-bg',
      ' linear-gradient(var(--gradient-angle), #898aeb, #d8b9e3)'
    )
    addImage({
      image: demoImage.src,
      id: 1,
      style: {
        ...defaultStyle,
        borderSize: '15',
        imageRoundness: 0.7,
        imageSize: '0.78',
        insetSize: '10',
      },
    })
    setImagesCheck([...imagesCheck, demoImage.src])
    setResolution('1920x1080')
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles[0])}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      noClick
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="h-25 absolute-center w-4/5 xl:w-2/5">
          <div className="flex flex-col gap-4 rounded-xl text-center md:shadow-2xl">
            <div className="flex-center flex-col rounded-xl px-4 py-10 md:bg-[#f1f1f1]">
              <Upload
                style={{ transition: 'all 0.8s cubic-bezier(0.6, 0.6, 0, 1)' }}
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
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                  }}
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
