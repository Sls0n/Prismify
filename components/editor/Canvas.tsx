'use client'

import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { useResizeCanvas } from '@/hooks/use-resize-canvas'
import { motion } from 'framer-motion'
import { useImageQualityStore } from '@/hooks/use-image-quality'
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
// import CustomizedRnd from '@/components/Rnd'

export default function Canvas() {
  const [scrollScale, setScrollScale] = useState(0.9)
  const { quality } = useImageQualityStore()
  const { resolution, setDomResolution } = useResizeCanvas()
  const screenshotRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)

  const [width, height]: number[] = resolution.split('x').map(Number)

  const aspectRatio = width / height

  let style: CSSProperties = {
    aspectRatio,
  }

  if (aspectRatio < 1) {
    style = { ...style, width: 'auto', height: '100%' }
  } else if (aspectRatio > 1) {
    style = { ...style, width: '100%', height: 'auto' }
  } else {
    const containerSize = '82vmin' // 100vmin will make it fit within the viewport while maintaining aspect ratio, but had overflow issue so 82vmin (it just makes it a bit smaller)
    style = {
      ...style,
      width: containerSize,
      height: containerSize,
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
      setScrollScale((prevScale) => prevScale + 0.1) // Increment the scroll scale by 0.1
    } else if (e.deltaY > 0) {
      // Scrolling down
      if (scrollScale <= 0.4) return
      setScrollScale((prevScale) => prevScale - 0.1) // Decrement the scroll scale by 0.1
    }
  }

  let parentScaleStyle = {
    scale: `${scrollScale}`,
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
              className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-violet-300 to-violet-400"
              ref={screenshotRef}
              id="canvas-container"
              style={style}
            >
              <ImageUpload />
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
    </>
  )
}
