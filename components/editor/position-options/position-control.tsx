'use client'

import {
  CircleDot,
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
} from 'lucide-react'
import { useEffect, useCallback } from 'react'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'

export default function PositionControl() {
  const { images, setImages } = useImageOptions()
  const { selectedImage } = useSelectedLayers()

  const move = useCallback(
    (deltaX: number, deltaY: number) => {
      selectedImage &&
        setImages(
          images.map((image, index) =>
            index === selectedImage - 1
              ? {
                  ...image,
                  style: {
                    ...image.style,
                    translateX:
                      images[selectedImage - 1]?.style.translateX + deltaX,
                    translateY:
                      images[selectedImage - 1]?.style.translateY + deltaY,
                  },
                }
              : image
          )
        )
    },
    [images, setImages, selectedImage]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          move(0, -5)
          break
        case 'ArrowDown':
          move(0, 5)
          break
        case 'ArrowLeft':
          move(-5, 0)
          break
        case 'ArrowRight':
          move(5, 0)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [move])

  const centerImage = () => {
    selectedImage &&
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  translateX: 0,
                  translateY: 0,
                },
              }
            : image
        )
      )
  }

  return (
    <div
      className={`relative grid h-40 border-spacing-8 grid-cols-3 overflow-hidden rounded-lg border border-border bg-formDark p-1 md:max-w-full [&>*]:cursor-pointer [&>*]:border-dashed [&>*]:border-border [&>*]:transition-colors ${
        selectedImage ? '' : 'pointer-events-none opacity-40'
      }`}
    >
      <button
        className="flex-center :hover:bg-dark border-b-[2px] border-r-[2px]"
        aria-label="Translate up left"
        onClick={() => move(-5, -5)}
      >
        <ArrowUpLeft size={21} aria-hidden />
      </button>
      <button
        className="flex-center border-b-[2px] border-r-[2px] hover:bg-dark"
        aria-label="Translate up"
        onClick={() => move(0, -5)}
      >
        <ArrowUp size={21} aria-hidden />
      </button>
      <button
        className="flex-center border-b-[2px] hover:bg-dark"
        aria-label="Translate up right"
        onClick={() => move(5, -5)}
      >
        <ArrowUpRight size={21} aria-hidden />
      </button>
      <button
        className="flex-center border-b-[2px] border-r-[2px] hover:bg-dark"
        aria-label="Translate left"
        onClick={() => move(-5, 0)}
      >
        <ArrowLeft size={21} aria-hidden />
      </button>
      <button
        className="flex-center border-b-[2px] border-r-[2px] hover:bg-dark"
        aria-label="Center image"
        onClick={centerImage}
      >
        <CircleDot size={21} aria-hidden />
      </button>
      <button
        className="flex-center border-b-[2px] hover:bg-dark"
        aria-label="Translate right"
        onClick={() => move(5, 0)}
      >
        <ArrowRight size={21} aria-hidden />
      </button>
      <button
        className="flex-center border-r-[2px] hover:bg-dark"
        aria-label="Translate down left"
        onClick={() => move(-5, 5)}
      >
        <ArrowDownLeft size={21} aria-hidden />
      </button>
      <button
        className="flex-center border-r-[2px] hover:bg-dark"
        aria-label="Translate down"
        onClick={() => move(0, 5)}
      >
        <ArrowDown size={21} aria-hidden />
      </button>
      <button
        className="flex-center hover:bg-dark"
        aria-label="Translate down right"
        onClick={() => move(5, 5)}
      >
        <ArrowDownRight size={21} aria-hidden />
      </button>
    </div>
  )
}
