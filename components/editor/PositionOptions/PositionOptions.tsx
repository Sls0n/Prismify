'use client'

import SizeOption from '../ImageOptions/SizeOption'
import PositionControl from './PositionControl'
import TranslateOption from './TranslateOption'

export default function PositionOptions() {
  return (
    <>
      <div className="mb-8">
        <div className="mb-4 mt-4 flex items-center px-1 md:max-w-[70%]">
          <h1 className="text-[0.85rem]">Position:</h1>
        </div>

        <PositionControl />
      </div>

      <div className="mb-2">
        <SizeOption text="Scale" />
      </div>

      <div className="mb-4">
        <TranslateOption />
      </div>
    </>
  )
}
