'use client'

import useAutomaticAspectRatioSwitcher from '@/hooks/canvas-area-hooks/use-automatic-aspect-ratio-switcher'
import useCanvasResizeObserver from '@/hooks/canvas-area-hooks/use-resize-observer'
import useScreenSizeWarningToast from '@/hooks/canvas-area-hooks/use-screen-size-warning-toast'
import { useEventListener } from '@/hooks/use-event-listener'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import dynamic from 'next/dynamic'
import React, { CSSProperties, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
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
  const { backgroundType } = useBackgroundOptions()
  const {
    resolution,
    exactDomResolution,
    scrollScale,
    setScrollScale,
    canvasRoundness,
  } = useResizeCanvas()
  const { scale } = useImageOptions()
  const {
    selectedImage,
    selectedText,
    setSelectedImage,
    enableCrop,
    setSelectedText,
  } = useSelectedLayers()
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

  // This hook encapsulates the logic for observing changes in the size of the screenshot element & automatically sets the DOM resolution and scale factor based on the size changes of a provided ref element.
  useCanvasResizeObserver(screenshotRef)

  // This hook encapsulates the logic used to automatically switch the aspect ratio of a screenshot within a container. If the screenshot overflows the container, the aspect ratio is adjusted to fit within the container.
  useAutomaticAspectRatioSwitcher({
    containerRef: parentRef,
    screenshotRef,
  })

  // This hook shows a warning toast if the screen size is less than 768px.
  useScreenSizeWarningToast()

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

  let parentScaleStyle = {
    scale: `${scrollScale}`,
  }

  // Close the image controls when the escape key is pressed
  useHotkeys('Escape', () => {
    if (showControls) {
      setShowControls(false)
      setIsMultipleTargetSelected(false)
    }
  })

  // this hook listens for a click event on the canvas and hides the image controls/text controls if the user clicks outside the image. This just works idk how, I suggest you don't touch it.
  useEventListener(
    'click',
    (e: any) => {
      const isCanvasArea =
        e?.target?.classList?.contains('canvas-container') ||
        e?.target?.classList?.contains('selecto-area')

      if (isCanvasArea) {
        setSelectedText(null)
        setShowTextControls(false)
        setShowTextControls(false)
        setIsEditable(false)
      }

      if (isSelecting || (!selectedImage && !showControls)) return
      if (isCanvasArea) {
        setSelectedImage(null)
        setShowTextControls(false)
        setShowControls(false)
        setIsMultipleTargetSelected(false)
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
    </>
  )
}
