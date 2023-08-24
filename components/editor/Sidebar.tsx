'use client'

import SidebarButton from './SidebarButton'
import { Button } from '@/components/ui/Button'
import {
  Image as Images,
  AppWindow,
  Trash,
  TextCursor,
  PanelTop,
  Locate,
  Palette,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { useActiveIndexStore } from '@/store/use-active-index'
import CanvasOptions from './CanvasOptions/CanvasOptions'
import ImageOptions from './ImageOptions/ImageOptions'
import BackgroundOptions from '@/components/editor/BackgroundOptions/BackgroundOptions'
import FrameOptions from './FrameOptions/FrameOptions'
import PositionOptions from './PositionOptions/PositionOptions'

export default function Sidebar() {
  const activeIndex = useActiveIndexStore((state) => state.activeIndex)

  const sidebarButtons = [
    {
      text: 'Canvas',
      icon: <AppWindow size={20} strokeWidth={activeIndex === 0 ? 2.25 : 2} />,
    },
    {
      text: 'Image',
      icon: <Images size={20} strokeWidth={activeIndex === 1 ? 2.25 : 2} />,
    },
    {
      text: 'Background',
      icon: <Palette size={20} strokeWidth={activeIndex === 2 ? 2.25 : 2} />,
    },
    {
      text: 'Frame',
      icon: <PanelTop size={20} strokeWidth={activeIndex === 3 ? 2.25 : 2} />,
    },
    {
      text: 'Text',
      icon: <TextCursor size={20} strokeWidth={activeIndex === 4 ? 2.25 : 2} />,
    },
    {
      text: 'Position',
      icon: <Locate size={20} strokeWidth={activeIndex === 5 ? 2.25 : 2} />,
    },
  ]

  return (
    <aside className="flex w-[4.5rem] overflow-x-hidden border-r border-border md:w-[6rem] lg:w-[30rem]">
      <ul className="relative flex basis-[100%] flex-col items-center gap-6 overflow-y-auto overflow-x-hidden border-border dark:border-[#22262b]/50 px-4 py-8 dark:bg-sidebar bg-secondaryLight lg:max-w-[23%] lg:basis-[23%] lg:border-r">
        {sidebarButtons.map((button, index) => (
          <SidebarButton
            key={index}
            text={button.text}
            icon={button.icon}
            index={index}
          />
        ))}
        {/* <li className="mt-auto flex flex-col items-center gap-2">
          <Button
            aria-label="Download options"
            className="h-12 rounded-xl px-4 py-3"
            variant="stylish"
          >
            <Download />
          </Button>
          <span className={`max-w-[3.25rem] truncate text-xs text-[#cfcfcf]`}>
            Download
          </span>
        </li> */}
      </ul>

      <div className="relative hidden h-full w-full flex-col overflow-hidden lg:flex">
        <ScrollArea type="hover">
          <div className="flex flex-col px-7">
            <div className="flex w-full flex-col py-10">
              <h3 className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase dark:text-dark/70 text-primary/70">
                {sidebarButtons[activeIndex].icon}
                {sidebarButtons[activeIndex].text}
                <Button
                  variant="destructive"
                  aria-label="delete current project"
                  className="ml-auto scale-75 rounded-md px-3 py-1"
                >
                  <Trash size={20} />
                </Button>
              </h3>
              {activeIndex === 0 && <CanvasOptions />}
              {activeIndex === 1 && <ImageOptions />}
              {activeIndex === 2 && <BackgroundOptions />}
              {activeIndex === 3 && <FrameOptions />}
              {activeIndex === 5 && <PositionOptions />}
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
