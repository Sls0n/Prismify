'use client'

import React, { CSSProperties, useEffect, useRef } from 'react'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { motion } from 'framer-motion'
import { useImageQualityStore } from '@/store/use-image-quality'
import ImageUpload from './ImageUpload'

import { useImageOptions } from '@/store/use-image-options'
import { useBackgroundOptions } from '@/store/use-background-options'

export default function Canvas() {
  const { quality } = useImageQualityStore()
  const { isMeshGradient, isSolidColor, imageBackground, attribution } =
    useBackgroundOptions()
  const {
    resolution,
    setDomResolution,
    scrollScale,
    setScrollScale,
    canvasRoundness,
    setScaleFactor,
  } = useResizeCanvas()
  const { isImageUploaded } = useImageOptions()
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
        style={parentScaleStyle}
        onWheel={handleScroll}
        className="flex h-full flex-1 items-start justify-center overflow-hidden"
      >
        <motion.div
          className={
            'relative flex w-full items-center justify-center overflow-hidden '
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
        </motion.div>
      </section>

      {attribution.name !== null && (
        <div className="absolute bottom-2 right-4 text-[0.85rem] text-dark/70 bg-sidebar/80 backdrop-blur-md p-2 rounded-md">
          Background by{' '}
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
