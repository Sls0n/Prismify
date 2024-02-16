'use client'

import { useEventListener } from '@/hooks/use-event-listener'
import { toast } from '@/hooks/use-toast'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useColorExtractor } from '@/store/use-color-extractor'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useImageQualityStore } from '@/store/use-image-quality'
import { useMoveable } from '@/store/use-moveable'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import dynamic from 'next/dynamic'
import React, { CSSProperties, useEffect, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import UnsplashAttribute from '../unsplash-attribute'
import BackgroundImageCanvas from './background-image-canvas'
import ImageUpload from './main-image-area'
import MobileViewImageOptions from './mobile-view-image-options'
import SelectoComponent from './selecto-component'
import TextLayers from './text-layers'
import TiptapMoveable from './tiptap-moveable'

const MoveableComponent = dynamic(
  () => import('./moveable-component').then((mod) => mod.default),
  { ssr: false }
)

export default function Canvas() {
  const { quality } = useImageQualityStore()
  const { backgroundType, imageBackground } = useBackgroundOptions()
  const {
    resolution,
    setDomResolution,
    exactDomResolution,
    setExactDomResolution,
    scrollScale,
    setScrollScale,
    canvasRoundness,
    setScaleFactor,
  } = useResizeCanvas()
  const { scale } = useImageOptions()
  const {
    selectedImage,
    selectedText,
    setSelectedImage,
    enableCrop,
    setSelectedText,
  } = useSelectedLayers()
  const { imagesCheck } = useColorExtractor()
  const screenshotRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)
  const {
    showControls,
    setShowControls,
    setShowTextControls,
    setIsMultipleTargetSelected,
    showTextControls,
    isEditable,
    setIsEditable,
    isSelecting,
  } = useMoveable()

  const [width, height]: number[] = resolution.split('x').map(Number)

  const aspectRatio = width / height

  console.log(`Current DOM resoltion: ${exactDomResolution}`)

  let style: CSSProperties = {
    aspectRatio,
    backgroundImage: `var(--gradient-bg)`,
    borderRadius: `${canvasRoundness * 16}px`,
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
        setShowTextControls(false)
        setShowControls(false)
        setIsMultipleTargetSelected(false)
      }
    },
    screenshotRef
  )

  useEventListener(
    'click',
    (e: any) => {
      if (
        e?.target?.classList?.contains('canvas-container') ||
        e?.target?.classList?.contains('selecto-area')
      ) {
        setSelectedText(null)
        setShowTextControls(false)
        setShowTextControls(false)
        setIsEditable(false)
      }
    },
    screenshotRef
  )

  return (
    <>
      <section
        ref={parentRef}
        className={`relative flex h-full w-full flex-col overflow-hidden bg-[#111] md:grid md:place-items-center ${
          aspectRatio <= 1 ? 'p-4 md:p-8' : 'p-4 md:p-8'
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
          <BackgroundImageCanvas />
          {showControls && <MoveableComponent id={`${selectedImage}`} />}
          {showTextControls && !isEditable && (
            <TiptapMoveable id={`text-${selectedText}`} />
          )}

          <div
            className="selecto-area relative flex h-full w-full place-items-center items-center justify-center"
            style={{
              scale,
            }}
          >
            <ImageUpload />
            <TextLayers />
          </div>
        </div>
        <MobileViewImageOptions />
      </section>

      <SelectoComponent />
      <UnsplashAttribute />
    </>
  )
}
