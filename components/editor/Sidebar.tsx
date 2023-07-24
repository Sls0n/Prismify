'use client'

import SidebarButton from './SidebarButton'
import { Button } from '@/components/ui/Button'
import {
  Brush,
  Image as Images,
  Layers,
  PaintBucket,
  Move3d,
  MoreHorizontal,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { useActiveIndexStore } from '@/hooks/use-active-index'
import BgOptions from './BgOptions'
import { Separator } from '@/components/ui/Separator'

const sidebarButtons = [
  {
    text: 'Canvas',
    icon: <PaintBucket size={20} />,
  },
  {
    text: 'Image',
    icon: <Images size={20} />,
  },
  {
    text: 'Position',
    icon: <Layers size={20} />,
  },
  {
    text: 'Annotations',
    icon: <Brush size={20} />,
  },
  {
    text: '3-D',
    icon: <Move3d size={20} />,
  },
]

export default function Sidebar() {
  const activeIndex = useActiveIndexStore((state) => state.activeIndex)

  return (
    <aside className="flex basis-[30%] rounded-xl border border-border dark:bg-sidebar">
      <ul className="relative flex basis-[23%] flex-col items-center gap-6 border-r border-border px-3 py-8">
        {sidebarButtons.map((button, index) => (
          <SidebarButton
            key={index}
            text={button.text}
            icon={button.icon}
            index={index}
          />
        ))}
        <li className="mt-auto flex flex-col items-center gap-2">
          <Button className="rounded-xl" variant="ghost" size="x-lg">
            <MoreHorizontal />
          </Button>
        </li>
      </ul>

      {/* Options */}
      {/* <ScrollArea className="h-full flex-1 border-r border-border px-4 py-10">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-[#161616] p-3">
          <Popover>
            <PopoverTrigger>
              <button className="inline-flex h-[9%] items-center justify-between gap-2 border-b border-border px-4 transition-colors hover:bg-accent">
                <div className="inline-flex items-center justify-between gap-4">
                  <h2 className="text-sm font-medium text-primary/70 dark:text-dark/80">
                    Background
                  </h2>
                  <div className="h-5 w-5 rounded-md bg-purple-400" />
                </div>
                <ChevronDown
                  size={18}
                  className="text-primary/70 dark:text-dark/80"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end">hi</PopoverContent>
          </Popover>
        </div>
      </ScrollArea> 
      */}
      <ScrollArea className="flex h-full w-full flex-1 flex-col rounded-xl ">
        <div className="flex w-full flex-col px-5 py-10">
          <h3 className="mb-[0.35rem] flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
            {sidebarButtons[activeIndex].icon}
            {sidebarButtons[activeIndex].text}
          </h3>
          {activeIndex === 0 && <BgOptions />}
        </div>
      </ScrollArea>
    </aside>
  )
}
