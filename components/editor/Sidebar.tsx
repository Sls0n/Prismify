'use client'

import { Button } from '@/components/ui/Button'
import { useActiveIndexStore } from '@/hooks/use-active-index'
import {
  Brush,
  Image as Images,
  Layers,
  LayoutPanelTop,
  MoreHorizontal,
  Move3d,
} from 'lucide-react'

const sidebarButtons = [
  {
    text: 'Templates',
    icon: <LayoutPanelTop />,
  },
  {
    text: 'Image',
    icon: <Images />,
  },
  {
    text: 'Position',
    icon: <Layers />,
  },
  {
    text: 'Annotations',
    icon: <Brush />,
  },
  {
    text: '3-D',
    icon: <Move3d />,
  },
]

export function SidebarButtons({
  icon,
  text,
  index,
}: {
  text?: string
  icon: React.ReactNode
  index: number
}) {
  const activeIndex = useActiveIndexStore((state) => state.activeIndex)
  const setActiveIndex = useActiveIndexStore((state) => state.setActiveIndex)

  return (
    <li
      onClick={() => setActiveIndex(index)}
      className={`relative flex flex-col items-center gap-2 `}
    >
      <Button
        className="rounded-xl"
        variant={activeIndex === index ? 'activeIcon' : 'icon'}
        size="x-lg"
      >
        {icon}
      </Button>
      {text && (
        <span className={`text-xs ${activeIndex === index && ''}`}>{text}</span>
      )}
    </li>
  )
}

export default function Sidebar() {
  const activeIndex = useActiveIndexStore((state) => state.activeIndex)

  return (
    <aside className="flex basis-[30%]">
      <ul className="relative flex basis-[24%] flex-col items-center gap-7  border-border px-4 py-8 dark:bg-[#151515] ">
        {sidebarButtons.map((button, index) => (
          <SidebarButtons
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
      <div className="flex-1 border-r border-border py-12">
        <h2 className="px-8 text-base font-medium text-gray-500">
          {sidebarButtons[activeIndex].text}
        </h2>

        {/* TODO:  render different options according to activeIndex here */}
      </div>
    </aside>
  )
}
