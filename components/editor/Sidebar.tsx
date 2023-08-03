'use client'

import SidebarButton from './SidebarButton'
import { Button } from '@/components/ui/Button'
import {
  Image as Images,
  AppWindow,
  Trash,
  TextCursor,
  PanelTop,
  AlignHorizontalDistributeCenter,
  Download,
  Palette,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { useActiveIndexStore } from '@/hooks/use-active-index'
import CanvasOptions from './CanvasOptions/CanvasOptions'
import ImageOptions from './ImageOptions/ImageOptions'
import BackgroundOptions from '@/components/editor/BackgroundOptions/BackgroundOptions'

const sidebarButtons = [
  {
    text: 'Canvas',
    icon: <AppWindow size={20} />,
  },
  {
    text: 'Image',
    icon: <Images size={20} />,
  },
  {
    text: 'Background',
    icon: <Palette size={20} />,
  },
  {
    text: 'Frame',
    icon: <PanelTop size={20} />,
  },
  {
    text: 'Text',
    icon: <TextCursor size={20} />,
  },
  {
    text: 'Position',
    icon: <AlignHorizontalDistributeCenter size={20} />,
  },
]

export default function Sidebar() {
  const activeIndex = useActiveIndexStore((state) => state.activeIndex)

  return (
    <aside className="flex w-[30rem] border-r border-border">
      <ul className="relative flex max-w-[23%] basis-[20%] flex-col items-center gap-6 overflow-y-auto border-r border-border/50 px-4 py-8 dark:bg-sidebar lg:basis-[23%]">
        {sidebarButtons.map((button, index) => (
          <SidebarButton
            key={index}
            text={button.text}
            icon={button.icon}
            index={index}
          />
        ))}
        <li className="mt-auto flex flex-col items-center gap-2">
          <Button className="h-12 rounded-xl px-4 py-3" variant="activeIcon">
            <Download />
          </Button>
          <span className={`max-w-[3.25rem] truncate text-xs text-[#cfcfcf]`}>
            Download
          </span>
        </li>
      </ul>

      <div className="relative flex h-full w-full flex-col overflow-hidden">
        <ScrollArea type="hover">
          <div className="flex flex-col px-7">
            <div className="flex w-full flex-col py-10">
              <h3 className="mb-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
                {sidebarButtons[activeIndex].icon}
                {sidebarButtons[activeIndex].text}
                <Button
                  variant={'destructive'}
                  className="ml-auto scale-75 rounded-md px-3 py-1"
                >
                  <Trash size={20} />
                </Button>
              </h3>
              {activeIndex === 0 && <CanvasOptions />}
              {activeIndex === 1 && <ImageOptions />}
              {activeIndex === 2 && <BackgroundOptions />}
            </div>
          </div>
        </ScrollArea>

        {/* Main saving settings */}
      </div>
    </aside>
  )
}
