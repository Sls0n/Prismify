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
import { Button } from '@/components/ui/Button'
import ImageUpload from './ImageUpload'
import { useImageUploaded } from '@/hooks/use-image-uploaded'
// import CustomizedRnd from '@/components/Rnd'

export default function Canvas() {
  const [scrollScale, setScrollScale] = useState(0.9)
  const { quality } = useImageQualityStore()
  const { resolution, setDomResolution } = useResizeCanvas()
  const { isImageUploaded } = useImageUploaded()
  const screenshotRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)

  const [width, height]: number[] = resolution.split('x').map(Number)

  const aspectRatio = width / height

  let style: CSSProperties = {
    aspectRatio,
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
        className="flex flex-1 justify-center overflow-auto rounded-xl"
      >
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <motion.div
              className="relative flex rounded-xl bg-gradient-to-r from-violet-300 to-violet-400"
              ref={screenshotRef}
              id="canvas-container"
              style={style}
            >
              <ImageUpload />
              {/* eslint-disable-next-line @next/next/no-img-element */}

              {/* <div className="">
                 <motion.img
                  className="hover:border-3 h-full w-full rounded-xl border-[3px] border-transparent object-cover shadow-2xl hover:border-purple-700/20"
                  src={
                    // random cat image
                    'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg'
                  }
                  alt="placeholder"
                /> 
              </div>*/}
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
