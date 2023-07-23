'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
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
  active,
  onClick,
}: {
  text?: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <li onClick={onClick} className={`flex flex-col items-center gap-2`}>
      <Button
        className="rounded-xl"
        variant={active ? 'activeIcon' : 'icon'}
        size="x-lg"
      >
        {icon}
      </Button>
      {text && <span className={`text-xs ${active && ''}`}>{text}</span>}
    </li>
  )
}

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <aside className="flex basis-[30%]">
      <ul className="flex basis-[24%] flex-col items-center gap-7  border-border dark:bg-[#151515] px-4 py-6">
        {sidebarButtons.map((button, index) => (
          <SidebarButtons
            key={index}
            text={button.text}
            icon={button.icon}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
        <li className="mt-auto flex flex-col items-center gap-2">
          <Button className="rounded-xl" variant="ghost" size="x-lg">
            <MoreHorizontal />
          </Button>
        </li>
      </ul>
      <div className="flex-1 border-r border-border px-4 py-6">Options</div>
    </aside>
  )
}
