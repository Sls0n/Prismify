'use client'

import FloatingOptions from '@/components/FloatingOptions'
import BackgroundOptions from '@/components/editor/BackgroundOptions/BackgroundOptions'
import CanvasOptions from '@/components/editor/CanvasOptions/CanvasOptions'
import FrameOptions from '@/components/editor/FrameOptions/FrameOptions'
import ImageOptions from '@/components/editor/ImageOptions/ImageOptions'
import PerspectiveOptions from '@/components/editor/PerspectiveOptions/PerspectiveOptions'
import PositionOptions from '@/components/editor/PositionOptions/PositionOptions'
import TextOptions from '@/components/editor/TextOptions/TextOptions'
import { useEventListener } from '@/hooks/use-event-listener'
import useStore from '@/hooks/use-store'
import { useActiveIndexStore } from '@/store/use-active-index'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useImageQualityStore } from '@/store/use-image-quality'
import { useMoveable } from '@/store/use-moveable'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { ScrollArea } from '../ui/ScrollArea'
import ImageUpload from './ImageUpload'
// import MoveableComponent from './MoveableComponent'
import Noise from './Noise'
import SelectoComponent from './SelectoComponent'
import TipTap from './Tiptap'
import TiptapMoveable from './TiptapMoveable'
import dynamic from 'next/dynamic'
import { useColorExtractor } from '@/store/use-color-extractor'
import { toast } from '@/hooks/use-toast'

const MoveableComponent = dynamic(
  () => import('./MoveableComponent').then((mod) => mod.default),
  { ssr: false }
)

export default function Canvas() {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false)
  const activeIndex = useStore(
    useActiveIndexStore,
    (state) => state.activeIndex
  )
  const { quality } = useImageQualityStore()
  const { backgroundType, imageBackground, attribution } =
    useBackgroundOptions()
  const {
    resolution,
    setDomResolution,
    exactDomResolution,
    setExactDomResolution,
    scrollScale,
    setScrollScale,
    canvasRoundness,
    setScaleFactor,
    setShouldFloat,
  } = useResizeCanvas()
  const {
    images,
    initialImageUploaded,

    scale,
  } = useImageOptions()
  const { selectedImage, selectedText, setSelectedImage, enableCrop } =
    useSelectedLayers()
  const { imagesCheck } = useColorExtractor()
  const screenshotRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)
  const {
    showControls,
    setShowControls,
    isMultipleTargetSelected,
    setIsMultipleTargetSelected,
    showTextControls,
    isEditable,
    isSelecting,
  } = useMoveable()

  const [width, height]: number[] = resolution.split('x').map(Number)

  const aspectRatio = width / height

  console.log(`Current DOM resoltion: ${exactDomResolution}`)

  let style: CSSProperties = {
    aspectRatio,
    backgroundImage: `var(--gradient-bg)`,
    borderRadius: `${canvasRoundness}rem`,
  }

  if (backgroundType === 'mesh') {
    style = {
      ...style,
      backgroundColor: `var(--mesh-bg)`,
    }
  }

  if (backgroundType === 'solid') {
    style = {
      ...style,
      backgroundColor: `var(--solid-bg)`,
    }
  }

  // if (aspectRatio <= 1) {
  //   // After the screen width is less than 1100px then width to 100% and height to auto
  //   style = { ...style, width: 'auto', height: '100%' }
  // } else {
  //   style = { ...style, width: '100%', height: 'auto' }
  // }

  useEffect(() => {
    const element = screenshotRef.current

    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width: domWidth, height: domHeight } = entry.contentRect
          const dynamicScaleFactor = width / domWidth
          setScaleFactor(dynamicScaleFactor)
          setExactDomResolution(`${domWidth}x${domHeight}`)
          setDomResolution(
            `${domWidth * dynamicScaleFactor * quality}x${
              domHeight * dynamicScaleFactor * quality
            }`
          )
        }
      })

      resizeObserver.observe(element)

      return () => {
        resizeObserver.unobserve(element)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolution, quality])

  useEffect(
    () => {
      const parentEl = parentRef.current
      const childEl = screenshotRef.current

      if (parentEl && childEl) {
        if (parentEl && childEl) {
          if (
            parentEl.clientWidth <= childEl.clientWidth ||
            parentEl.clientHeight <= childEl.clientHeight
          ) {
            console.log('is overflowing')

            if (
              childEl.classList.contains('w-auto') &&
              childEl.classList.contains('h-full')
            ) {
              childEl.classList.remove('w-auto')
              childEl.classList.add('w-full')
              childEl.classList.add('h-auto')
              childEl.classList.remove('h-full')
            } else if (
              childEl.classList.contains('w-full') &&
              childEl.classList.contains('h-auto')
            ) {
              childEl.classList.remove('w-full')
              childEl.classList.add('w-auto')
              childEl.classList.add('h-full')
              childEl.classList.remove('h-auto')
            }
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resolution, quality, imagesCheck]
  )

  // if the screen width is less than 768px then set the scrollScale to 1
  useEffect(() => {
    const handleResize = () => {
      setScrollScale(1)

      const parentEl = parentRef.current
      const childEl = screenshotRef.current

      if (parentEl && childEl) {
        if (
          parentEl.clientWidth <= childEl.clientWidth ||
          parentEl.clientHeight <= childEl.clientHeight
        ) {
          console.log('is overflowing')

          if (
            childEl.classList.contains('w-auto') &&
            childEl.classList.contains('h-full')
          ) {
            childEl.classList.remove('w-auto')
            childEl.classList.add('w-full')
            childEl.classList.add('h-auto')
            childEl.classList.remove('h-full')
          } else if (
            childEl.classList.contains('w-full') &&
            childEl.classList.contains('h-auto')
          ) {
            childEl.classList.remove('w-full')
            childEl.classList.add('w-auto')
            childEl.classList.add('h-full')
            childEl.classList.remove('h-auto')
          }
        }
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return
    }
    if (enableCrop) return
    if (e.deltaY < 0) {
      // Scrolling up
      if (scrollScale === 1) return
      setScrollScale(scrollScale + 0.1) // Increment the scroll scale by 0.1
    } else if (e.deltaY > 0) {
      // Scrolling down
      if (scrollScale <= 0.4) return
      setScrollScale(scrollScale - 0.1) // Decrement the scroll scale by 0.1
    }
  }

  useEffect(() => {
    if (window.innerWidth <= 768 && !sessionStorage.getItem('toastShown')) {
      toast({
        title: 'Not optimized for mobile devices!',
        description:
          "The editor is not optimized for mobile devices, hence many feature won't work as expected. Please use a desktop device for the best experience.",
      })
      sessionStorage.setItem('toastShown', 'true')
    }
  }, [])

  let parentScaleStyle = {
    scale: `${scrollScale}`,
  }

  useHotkeys('Escape', () => {
    if (showControls) {
      setShowControls(false)
      setIsMultipleTargetSelected(false)
    }
  })

  useEventListener(
    'click',
    (e: any) => {
      if (isSelecting) return
      if (!selectedImage && !showControls) return
      if (
        e?.target?.classList?.contains('canvas-container') ||
        e?.target?.classList?.contains('selecto-area')
      ) {
        setSelectedImage(null)
        setShowControls(false)
        setIsMultipleTargetSelected(false)
      }
    },
    screenshotRef
  )

  console.log(`SelectedImage : - ${selectedImage}`)

  return (
    <>
      <section
        ref={parentRef}
        className={`relative flex h-full w-full flex-col overflow-hidden bg-[#111] md:grid md:place-items-center ${
          aspectRatio <= 1 ? 'p-8 md:p-16' : 'p-8 md:p-16'
        }
        `}
        style={parentScaleStyle}
        onWheel={handleScroll}
      >
        <div
          className={`canvas-container relative flex items-center justify-center overflow-hidden ${
            aspectRatio <= 1
              ? 'h-auto w-full lg:h-full lg:w-auto'
              : 'h-auto w-full'
          }`}
          ref={screenshotRef}
          id="canvas-container"
          style={style}
        >
          {imageBackground && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              draggable={false}
              className={`pointer-events-none absolute z-[0] h-full w-full object-cover`}
              src={imageBackground}
              alt="background image"
            />
          )}
          <Noise />
          {showControls && <MoveableComponent id={`${selectedImage}`} />}
          {showTextControls && !isEditable && (
            <TiptapMoveable id={`text-${selectedText}`} />
          )}

          <div
            className="selecto-area relative flex h-full min-h-[15rem] w-full place-items-center items-center justify-center"
            style={{
              scale,
            }}
          >
            <ImageUpload />
            <TipTap />
          </div>
        </div>
        <ScrollArea className="mt-6 w-full md:hidden" type="auto">
          <div className="w-full max-w-[90%] md:hidden">
            {activeIndex === 0 && <CanvasOptions />}
            {activeIndex === 1 && <ImageOptions />}
            {activeIndex === 2 && <BackgroundOptions />}
            {activeIndex === 3 && <FrameOptions />}
            {activeIndex === 4 && <TextOptions />}
            {activeIndex === 5 && <PerspectiveOptions />}
            {activeIndex === 6 && <PositionOptions />}
          </div>
        </ScrollArea>
        {/* <FloatingOptions /> */}
      </section>

      <SelectoComponent />

      {attribution.name !== null && (
        <div className="absolute bottom-2 right-4 rounded-md bg-[#151515] p-2 text-[0.85rem] text-dark/70 backdrop-blur-md ">
          Img by{' '}
          <a
            className="text-blue-500"
            href={`https://unsplash.com/@${attribution.link}?utm_source=Prismify&utm_medium=referral`}
          >
            {attribution.name}
          </a>{' '}
          on{' '}
          <a
            className="underline underline-offset-2"
            href="https://unsplash.com/?utm_source=Prismify&utm_medium=referral"
          >
            Unsplash
          </a>
        </div>
      )}
    </>
  )
}
