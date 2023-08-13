'use client'

import React, { useEffect, useCallback } from 'react'
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
import { usePositionOptions } from '@/store/use-position-options'

export default function PositionOptions() {
  const { translateX, translateY, setTranslateX, setTranslateY } =
    usePositionOptions()

  const move = useCallback(
    (deltaX: number, deltaY: number) => {
      setTranslateX(translateX + deltaX)
      setTranslateY(translateY + deltaY)
    },
    [translateX, translateY, setTranslateX, setTranslateY]
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
    setTranslateX(0)
    setTranslateY(0)
  }

  return (
    <div>
      <div className="mb-4 mt-4 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Position:</h1>
      </div>

      <div className="relative grid h-40 max-w-[70%] border-spacing-8 grid-cols-3 overflow-hidden rounded-lg border border-border bg-formDark p-1 [&>*]:cursor-pointer [&>*]:border-dashed [&>*]:border-border [&>*]:transition-colors">
        <button
          className="flex-center :hover:bg-dark border-b-[2px] border-r-[2px]"
          onClick={() => move(-5, -5)}
        >
          <ArrowUpLeft size={21} />
        </button>
        <button
          className="flex-center border-b-[2px] border-r-[2px] hover:bg-dark"
          onClick={() => move(0, -5)}
        >
          <ArrowUp size={21} />
        </button>
        <button
          className="flex-center border-b-[2px] hover:bg-dark"
          onClick={() => move(5, -5)}
        >
          <ArrowUpRight size={21} />
        </button>
        <button
          className="flex-center border-b-[2px] border-r-[2px] hover:bg-dark"
          onClick={() => move(-5, 0)}
        >
          <ArrowLeft size={21} />
        </button>
        <button
          className="flex-center border-b-[2px] border-r-[2px] hover:bg-dark"
          onClick={centerImage}
        >
          <CircleDot size={21} />
        </button>
        <button
          className="flex-center border-b-[2px] hover:bg-dark"
          onClick={() => move(5, 0)}
        >
          <ArrowRight size={21} />
        </button>
        <button
          className="flex-center border-r-[2px] hover:bg-dark"
          onClick={() => move(-5, 5)}
        >
          <ArrowDownLeft size={21} />
        </button>
        <button
          className="flex-center border-r-[2px] hover:bg-dark"
          onClick={() => move(0, 5)}
        >
          <ArrowDown size={21} />
        </button>
        <button
          className="flex-center hover:bg-dark"
          onClick={() => move(5, 5)}
        >
          <ArrowDownRight size={21} />
        </button>
      </div>
    </div>
  )
}
