'use client'

import { Focus, GalleryVerticalEnd } from 'lucide-react'
import SizeOption from './scale-options'
import RoundnessOption from './roundness-option'
import InsetOption from './inset-option'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useImageOptions } from '@/store/use-image-options'
import AddImageButton from './add-image-button'
import ShadowSettings from './shadow-settings'

export default function ImageOptions() {
  const { accordionOpen, setAccordionOpen } = useImageOptions()

  return (
    <>
      <AddImageButton />
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
            <SizeOption />
            <InsetOption />
            <RoundnessOption />
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
