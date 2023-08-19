'use client'

import SizeOption from '../ImageOptions/SizeOption'
import PositionControl from './PositionControl'
import TranslateOption from './TranslateOption'

export default function PositionOptions() {
  return (
    <>
      <div className="mb-8">
        <div className="mb-4 mt-4 flex max-w-[70%] items-center px-1">
          <h1 className="text-[0.85rem]">Position:</h1>
        </div>

        <PositionControl />
      </div>

      <div className="mb-2">
        <TranslateOption />
      </div>

      <div className="mb-4">
        <SizeOption text='Scale'/>
      </div>
    </>
  )
}