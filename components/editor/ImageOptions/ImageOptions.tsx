'use client'

import { Separator } from '@/components/ui/Separator'
import { GalleryVerticalEnd, Ruler } from 'lucide-react'

import ImagePreview from './ImagePreview'
import AppearenceSettings from './AppearenceSettings'
import ShadowSettings from './ShadowSettings'

export default function ImageOptions() {
  return (
    <>
      <ImagePreview />

      <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <Ruler size={20} />
        <span>Appearance</span>
      </h3>

      <AppearenceSettings />

      <Separator className="mt-10 h-[0.1rem] w-full" />

      <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <GalleryVerticalEnd size={20} className="rotate-90" />
        <span>Shadow</span>
      </h3>

      <ShadowSettings />
    </>
  )
}
