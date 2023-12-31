'use client'

import { Focus, GalleryVerticalEnd } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import { useImageOptions } from '@/store/use-image-options'
import AppearenceSettings from './AppearenceSettings'
import ImagePreview from './ImagePreview'
import ShadowSettings from './ShadowSettings'

export default function ImageOptions() {
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
    </>
  )
}
