// Formatted color picker component which opens a popover with a color picker.

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { ChevronDown } from 'lucide-react'
import ColorPicker from '@/components/color-picker'

export default function PopupColorPicker({
  onChange,
  color,
  shouldShowAlpha = true,
  shouldShowDropdown = true,
}: {
  onChange: (color: string) => void
  color: string
  shouldShowAlpha?: boolean
  shouldShowDropdown?: boolean
}) {
  return (
    <Popover>
      <PopoverTrigger>
        {shouldShowDropdown ? (
          <div className="flex h-14 w-24 rounded-xl bg-formDark">
            <div className="ml-4 flex h-full basis-[70%] items-center">
              <div
                className="flex h-[55%] w-[70%] rounded-md bg-sidebar"
                style={{ background: `${color}` }}
              ></div>
            </div>
            <div className="mr-4 flex flex-1 items-center">
              <ChevronDown
                size={20}
                className="text-dark/80"
              />
            </div>
          </div>
        ) : (
          <div
            className="flex h-8 w-10 rounded-md border border-border "
            style={{ background: `${color}` }}
          ></div>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex-center w-fit flex-wrap gap-3"
      >
        <ColorPicker
          shouldShowAlpha={shouldShowAlpha}
          colorState={color}
          onChange={(color) => {
            onChange(color)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
