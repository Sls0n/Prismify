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
  Clipboard,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { useActiveIndexStore } from '@/hooks/use-active-index'
import CanvasOptions from './CanvasOptions'
import ImageOptions from './ImageOptions'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { qualities } from '@/utils/config'
import { useImageQualityStore } from '@/hooks/use-image-quality'

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
  const { setQuality, quality } = useImageQualityStore()

  return (
    <aside className="flex w-[30rem] border-r border-border">
      <ul className="flex max-w-[22%] basis-[22%] flex-col items-center gap-6 truncate border-r border-border/50 px-4 py-8 dark:bg-sidebar">
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
        </li>
      </ul>

      <div className="relative flex h-full w-full flex-col overflow-hidden ">
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
            </div>
          </div>
        </ScrollArea>

        {/* Main saving settings */}
      </div>
    </aside>
  )
}
