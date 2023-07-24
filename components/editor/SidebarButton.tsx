'use client'

import { Button } from '@/components/ui/Button'
import { useActiveIndexStore } from '@/hooks/use-active-index'

export default function SidebarButton({
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
        className="rounded-xl h-12 px-4 py-3"
        variant={activeIndex === index ? 'activeIcon' : 'icon'}
      >
        {icon}
      </Button>
      {text && (
        <span className={`text-xs ${activeIndex === index && ''}`}>{text}</span>
      )}
    </li>
  )
}
