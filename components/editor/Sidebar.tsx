'use client'

import SidebarButton from './SidebarButton'
import { Button } from '@/components/ui/Button'
import {
  Brush,
  Image as Images,
  Layers,
  AppWindow,
  Move3d,
  MoreHorizontal,
  Trash,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { useActiveIndexStore } from '@/hooks/use-active-index'
import CanvasOptions from './CanvasOptions'

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
    <aside className="flex w-[30rem] min-w-[30rem] rounded-xl border border-border">
      <ul className="relative flex basis-[23%] flex-col items-center gap-6 border-r border-border px-3 py-8 dark:bg-sidebar rounded-xl">
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

      <ScrollArea className="flex h-full w-full flex-1 flex-col rounded-xl ">
        <div className="flex w-full flex-col px-5 py-10">
          <h3 className="mb-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
            {sidebarButtons[activeIndex].icon}
            {sidebarButtons[activeIndex].text}
            <Button variant={'stylish'} className="ml-auto scale-75 rounded-md">
              <Trash size={20} />
            </Button>
          </h3>
          {activeIndex === 0 && <CanvasOptions />}
        </div>
      </ScrollArea>
    </aside>
  )
}
