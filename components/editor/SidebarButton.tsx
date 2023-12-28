'use client'

import { Button } from '@/components/ui/Button'
import { useActiveIndexStore } from '@/store/use-active-index'

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
      className={`relative flex flex-col items-center gap-2 click-ignored`}
    >
      <Button
        className={`md:h-12 rounded-xl md:px-4 md:py-3 h-11 px-3 py-2`}
        variant={activeIndex === index ? 'stylish' : 'icon'}
        aria-label={`${text} options`}
      >
        {icon}
      </Button>
      {text && (
        <span
          className={`hidden md:inline max-w-[3.25rem] truncate text-xs ${
            activeIndex === index ? 'text-purple' : 'text-[#ababb1]'
          }`}
        >
          {text}
        </span>
      )}
    </li>
  )
}
