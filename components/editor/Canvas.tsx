'use client'

import React, { CSSProperties, useEffect, useRef } from 'react'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { motion } from 'framer-motion'
import { useImageQualityStore } from '@/store/use-image-quality'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu'
import ImageUpload from './ImageUpload'
import { Minus, Plus } from 'lucide-react'
import { useImageOptions } from '@/store/use-image-options'
import { useBackgroundOptions } from '@/store/use-background-options'
import CustomizedRnd from '@/components/CustomizedRnd'

export default function Canvas() {
  const { quality } = useImageQualityStore()
  const { isMeshGradient, isSolidColor, imageBackground } =
    useBackgroundOptions()
  const {
    resolution,
    setDomResolution,
    scrollScale,
    setScrollScale,
    canvasRoundness,
  } = useResizeCanvas()
  const { isImageUploaded, secondImage, imageRoundness, imageShadow } =
    useImageOptions()
  const screenshotRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)

  const [width, height]: number[] = resolution.split('x').map(Number)

  const aspectRatio = width / height

  let style: CSSProperties = {
    aspectRatio,
    backgroundImage: !isImageUploaded
      ? 'linear-gradient(0deg, #131313, #151515 100%)'
      : `var(--gradient-bg)`,

    borderRadius: `${canvasRoundness}rem`,
  }

  if (isMeshGradient) {
    style = {
      ...style,
      backgroundColor: `var(--mesh-bg)`,
    }
  }

  if (isSolidColor) {
    style = {
      ...style,
      backgroundColor: `var(--solid-bg)`,
    }
  }

  if (aspectRatio < 1) {
    style = { ...style, width: 'auto', height: '100%' }
  } else if (aspectRatio > 1) {
    style = { ...style, width: '100%', height: 'auto' }
  } else {
    const containerSize = '84vmin' // 100vmin will make it fit within the viewport while maintaining aspect ratio, but had overflow issue so 84vmin (it just makes it a bit smaller)
    style = {
      ...style,
      width: containerSize,
    }
  }

  useEffect(() => {
    const element = screenshotRef.current

    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect
          setDomResolution(
            `${Math.round(width * 1.561 * quality)}x${Math.round(
              height * 1.561 * quality
            )}`
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

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
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

  const secondImageStyle: CSSProperties = {
    borderRadius: `${imageRoundness}rem`,
    boxShadow: `${imageShadow}`,
  }

  return (
    <>
      <section
        ref={parentRef}
        style={parentScaleStyle}
        onWheel={handleScroll}
        className="flex h-full flex-1 items-center justify-center overflow-hidden rounded-xl"
      >
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <motion.div
              className={
                'relative flex w-full items-center justify-center overflow-hidden rounded-xl'
              }
              ref={screenshotRef}
              id="canvas-container"
              style={style}
            >
              {isImageUploaded && imageBackground && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  draggable={false}
                  className={`h-full w-full object-cover`}
                  src={imageBackground}
                  alt="background image"
                />
              )}

              <ImageUpload />
              {secondImage && (
                <CustomizedRnd className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    draggable={false}
                    className={`h-full w-full`}
                    src={secondImage}
                    alt="second image"
                    style={secondImageStyle}
                  />
                </CustomizedRnd>
              )}
            </motion.div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuItem inset>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset disabled>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                  Save Page As...
                  <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>
              Show Bookmarks Bar
              <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value="pedro">
              <ContextMenuLabel inset>People</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioItem value="pedro">
                Pedro Duarte
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="colm">
                Colm Tuite
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </section>

      <span className="absolute bottom-4 right-4 isolate inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center rounded-l-md bg-sidebar px-2 py-2 text-dark ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed"
          disabled={scrollScale === 1}
          onClick={() => {
            if (scrollScale === 1) return
            setScrollScale(scrollScale + 0.1)
          }}
        >
          <span className="sr-only">Scale up</span>
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md bg-sidebar px-2 py-2 text-dark ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed"
          disabled={scrollScale <= 0.4}
          onClick={() => {
            if (scrollScale <= 0.4) return
            setScrollScale(scrollScale - 0.1)
          }}
        >
          <span className="sr-only">Scale down</span>
          <Minus className="h-5 w-5" aria-hidden="true" />
        </button>
      </span>
    </>
  )
}
