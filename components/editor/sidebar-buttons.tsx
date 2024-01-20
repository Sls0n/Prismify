'use client'

import { Button } from '@/components/ui/button'
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
      className={`click-ignored relative flex flex-col items-center gap-2`}
    >
      <Button
        className={`h-11 rounded-xl px-3 py-2 md:h-12 md:px-4 md:py-3`}
        variant={activeIndex === index ? 'stylish' : 'icon'}
        aria-label={`${text} options`}
      >
        {icon}
      </Button>
      {text && (
        <span
          className={`hidden max-w-[3.25rem] truncate text-xs md:inline ${
            activeIndex === index ? 'text-purple' : 'text-[#ababb1]'
          }`}
        >
          {text}
        </span>
      )}
    </li>
  )
}
