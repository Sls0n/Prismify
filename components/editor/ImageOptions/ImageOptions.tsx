'use client'

import { Separator } from '@/components/ui/Separator'
import { BoxSelect, GalleryVerticalEnd, Info, Ruler } from 'lucide-react'

import ImagePreview from './ImagePreview'
import AppearenceSettings from './AppearenceSettings'
import ShadowSettings from './ShadowSettings'
import BorderSettings from './BorderSettings'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import Balancer from 'react-wrap-balancer'
import { useFrameOptions } from '@/store/use-frame-options'

export default function ImageOptions() {
  const { browserFrame } = useFrameOptions()

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

      <Separator className="mt-10 h-[0.1rem] w-full" />

      <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <BoxSelect size={20} />
        <span>Border</span>
        {browserFrame !== 'None' && (
          <Popover>
            <PopoverTrigger className="ml-2">
              <Info className="text-red-400/60" size={18} />
            </PopoverTrigger>
            <PopoverContent
              className="ml-16 max-w-[14rem] text-center"
              align="center"
            >
              <p className="text-sm text-neutral-400 ">
                <Balancer>
                  You have to disable frame in order to add border.
                </Balancer>
              </p>
            </PopoverContent>
          </Popover>
        )}
      </h3>

      <BorderSettings />
    </>
  )
}
