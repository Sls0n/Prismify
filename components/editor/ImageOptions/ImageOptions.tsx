'use client'

import { BoxSelect, Focus, GalleryVerticalEnd, Info } from 'lucide-react'

import ImagePreview from './ImagePreview'
import AppearenceSettings from './AppearenceSettings'
import ShadowSettings from './ShadowSettings'
import BorderSettings from './BorderSettings'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import Balancer from 'react-wrap-balancer'
import { useFrameOptions } from '@/store/use-frame-options'
import { useImageOptions } from '@/store/use-image-options'

export default function ImageOptions() {
  const { browserFrame } = useFrameOptions()
  const { accordionOpen, setAccordionOpen } = useImageOptions()

  return (
    <>
      <ImagePreview />
      <Accordion
        type="single"
        collapsible
        defaultValue={accordionOpen.appearanceOpen ? 'appearance' : ''}
        className="mt-4 w-full"
      >
        <AccordionItem value="appearance">
          <AccordionTrigger
            onClick={() =>
              setAccordionOpen({
                ...accordionOpen,
                appearanceOpen: !accordionOpen.appearanceOpen,
              })
            }
          >
            <h3 className="flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
              <Focus size={20} />
              <span>Appearance</span>
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <AppearenceSettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        defaultValue={accordionOpen.shadowOpen ? 'shadow' : ''}
        className="mt-2 w-full"
      >
        <AccordionItem value="shadow">
          <AccordionTrigger
            onClick={() =>
              setAccordionOpen({
                ...accordionOpen,
                shadowOpen: !accordionOpen.shadowOpen,
              })
            }
          >
            <h3 className="flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
              <GalleryVerticalEnd size={20} className="rotate-90" />
              <span>Shadow</span>
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <ShadowSettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        defaultValue={accordionOpen.borderOpen ? 'border' : ''}
        className="mt-2 w-full"
      >
        <AccordionItem value="border">
          <AccordionTrigger
            onClick={() =>
              setAccordionOpen({
                ...accordionOpen,
                borderOpen: !accordionOpen.borderOpen,
              })
            }
          >
            <h3 className="flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
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
          </AccordionTrigger>
          <AccordionContent>
            <BorderSettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
