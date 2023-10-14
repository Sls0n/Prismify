'use client'

import { useImageQualityStore } from '@/store/use-image-quality'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import React, { CSSProperties, useEffect, useRef } from 'react'
import ImageUpload from './ImageUpload'

import FloatingOptions from '@/components/FloatingOptions'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useImageOptions } from '@/store/use-image-options'
import { motion } from 'framer-motion'
import TipTap from './Tiptap'

export default function Canvas() {
  const { quality } = useImageQualityStore()
  const { backgroundType, imageBackground, attribution } =
    useBackgroundOptions()
  const {
    resolution,
    setDomResolution,
    scrollScale,
    setScrollScale,
    canvasRoundness,
    setScaleFactor,
    setShouldFloat,
  } = useResizeCanvas()
  const { images, initialImageUploaded } = useImageOptions()
  const screenshotRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)

  const [width, height]: number[] = resolution.split('x').map(Number)

  const aspectRatio = width / height

  let style: CSSProperties = {
    aspectRatio,
    backgroundImage: !initialImageUploaded
      ? 'linear-gradient(0deg, #131313, #151515 100%)'
      : `var(--gradient-bg)`,

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

  if (aspectRatio < 1) {
    style = { ...style, width: 'auto', height: '100%' }
  } else if (aspectRatio >= 0.95 && aspectRatio <= 1.1) {
    const containerSize = '86vmin' // 100vmin will make it fit within the viewport while maintaining aspect ratio, but had overflow issue so 84vmin (it just makes it a bit smaller)
    style = {
      ...style,
      width: containerSize,
    }
  } else if (aspectRatio >= 0.9 && aspectRatio <= 1.4) {
    const containerSize = '100vmin' // 100vmin will make it fit within the viewport while maintaining aspect ratio
    style = {
      ...style,
      width: containerSize,
    }
  } else if (aspectRatio > 1) {
    style = { ...style, width: '100%', height: 'auto' }
  }

  useEffect(() => {
    const element = screenshotRef.current

    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width: domWidth, height } = entry.contentRect
          const dynamicScaleFactor = width / domWidth
          setScaleFactor(dynamicScaleFactor)
          setDomResolution(
            `${domWidth * dynamicScaleFactor * quality}x${
              height * dynamicScaleFactor * quality
            }`
          )
          if (aspectRatio >= 0 && aspectRatio <= 1.75) {
            setShouldFloat(true)
          } else {
            setShouldFloat(false)
          }
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

  return (
    <>
      <section
        ref={parentRef}
        className="relative flex h-full flex-1 items-start justify-center overflow-hidden bg-[#161616] px-6 py-4 pt-5"
      >
        {/* <div className="flex h-14 w-full items-center border border-border">
          TODO: ADD UPPER SETTINGS
        </div> */}
        <motion.div
          layout
          onWheel={handleScroll}
          style={parentScaleStyle}
          className="relative flex h-full w-full flex-1 items-start justify-center overflow-hidden"
        >
          <motion.div
            layout
            className={
              'relative flex w-full items-center justify-center overflow-hidden '
            }
            ref={screenshotRef}
            id="canvas-container"
            style={style}
          >
            {images.length !== 0 && imageBackground && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                draggable={false}
                className={`h-full w-full object-cover`}
                src={imageBackground}
                alt="background image"
              />
            )}
            <TipTap />
            <ImageUpload />
          </motion.div>
        </motion.div>
        {/* <SelectoComponent /> */}

        <FloatingOptions />
      </section>

      {attribution.name !== null && (
        <div className="absolute bottom-2 right-4 rounded-md bg-sidebar/80 p-2 text-[0.85rem] text-dark/70 backdrop-blur-md">
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
