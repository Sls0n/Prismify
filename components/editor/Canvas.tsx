'use client'

import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { useResizeCanvas } from '@/hooks/use-resize-canvas'
import { saveAs } from 'file-saver'
import { motion } from 'framer-motion'
import domtoimage from 'dom-to-image'
import { useImageQualityStore } from '@/hooks/use-image-quality'
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

  const snapshotCreator = () => {
    return new Promise<Blob>((resolve, reject) => {
      try {
        const scale = 1.561 * quality
        const element = screenshotRef.current
        if (!element) {
          reject(new Error('Element not found.'))
          return
        }
        domtoimage
          .toPng(element, {
            height: element.offsetHeight * scale,
            width: element.offsetWidth * scale,

            style: {
              transform: 'scale(' + scale + ')',
              transformOrigin: 'top left',
              width: element.offsetWidth + 'px',
              height: element.offsetHeight + 'px',
            },
          })
          .then((dataURL) => {
            const blob = dataURL as unknown as Blob
            resolve(blob)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  return (
    <>
      <section
        ref={parentRef}
        style={parentScaleStyle}
        onWheel={handleScroll}
        className="flex max-h-full max-w-full flex-1 justify-center overflow-hidden rounded-xl"
      >
        <motion.div
          className="relative flex h-auto items-center justify-center rounded-xl bg-gradient-to-r from-rose-100 to-teal-100"
          ref={screenshotRef}
          style={style}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}

          <div className="w-25 h-25 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform  object-cover ">
            <motion.img
              className="h-full w-full rounded-xl object-cover shadow-2xl"
              src={
                // random cat image
                'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg'
              }
              alt="placeholder"
            />
          </div>
        </motion.div>
      </section>
      <button
        className="absolute bottom-4 right-4 rounded border bg-purple-500 px-4 py-2 text-white"
        onClick={() => {
          snapshotCreator().then((blob) => {
            saveAs(blob, 'image.png')
          })
        }}
      >
        Save Image
      </button>
    </>
  )
}
