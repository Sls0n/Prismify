'use client'

import React, { CSSProperties } from 'react'
import { useResizeCanvas } from '@/hooks/use-resize-canvas'
import { motion } from 'framer-motion'

export default function Canvas() {
  const { resolution } = useResizeCanvas()

  const width: any = resolution.split('x')[0]
  const height: any = resolution.split('x')[1]

  // Calculate the scaling factor based on the resolution
  const scaleFactor = Math.sqrt(width * height) / 1000

  const aspectRatio = width / height

  // Apply the scaling factor to your style
  let style: CSSProperties = {
    aspectRatio,
    maxWidth: `${100 * scaleFactor}%`,
    maxHeight: `${100 * scaleFactor}%`,
  }

  if (aspectRatio < 1) {
    style = {
      ...style,
      width: 'auto',
      height: '100%',
    }
  } else if (aspectRatio > 1) {
    style = {
      ...style,
      width: '100%',
      height: 'auto',
    }
  } else {
    // For a 1:1 aspect ratio
    style = {
      ...style,
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    }
  }

  return (
    <section className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-4">
      <motion.div
        layout
        className="relative rounded-xl bg-gradient-to-r from-rose-100 to-teal-100"
        style={style}
      ></motion.div>
    </section>
  )
}
