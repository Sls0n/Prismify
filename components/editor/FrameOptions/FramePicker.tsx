import { Button } from '@/components/ui/Button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { ChevronDown } from 'lucide-react'
import { useFrameOptions } from '@/hooks/use-frame-options'

export default function FramePicker() {
  const { browserFrame, setFrameHeight, frameHeight, setBrowserFrame } =
    useFrameOptions()

  return (
    <>
      <Popover>
        <PopoverTrigger className="relative mt-8 flex h-14 max-w-[70%] items-center overflow-hidden rounded-lg border border-border bg-formDark">
          <div className="flex-center h-full basis-[25%]">
            <div className="flex-center h-1/2 w-1/2 rounded-md bg-white"></div>
          </div>
          <div className="flex h-full w-full flex-1 items-center justify-between px-4">
            <p className="text-[0.85rem] text-primary/70 dark:text-dark/70">
              {browserFrame === null ? 'None' : browserFrame}
            </p>
            <ChevronDown
              size={18}
              className="text-primary/70 dark:text-dark/80"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="grid w-[350px] grid-cols-3 gap-4 rounded-lg bg-formDark p-4"
        >
          {/* Inside popup  */}
          <Button
            variant="secondary"
            className={`flex-center relative h-20 w-24 cursor-pointer rounded-md `}
            onClick={() => setBrowserFrame('None')}
          >
            <div className="flex-center h-[75%] w-[95%] rounded-md bg-white text-xs text-[#333]">
              None
            </div>
          </Button>
          <Button
            variant="secondary"
            className={`flex-center relative h-20 w-24 cursor-pointer rounded-md `}
            onClick={() => setBrowserFrame('MacOS Dark')}
          >
            <div className="flex-center h-[75%] w-[95%] rounded-md bg-white text-xs text-[#333]">
              MacOS Dark
            </div>
          </Button>
        </PopoverContent>
      </Popover>

      <div className="mb-3 mt-8 flex max-w-[70%] flex-col gap-3 px-1">
        <h1 className="text-[0.85rem]">Frame size</h1>
        <Select
          defaultValue={frameHeight}
          onValueChange={(value) => setFrameHeight(value)}
        >
          <SelectTrigger className="w-[7rem]">
            <SelectValue placeholder="Medium" />
          </SelectTrigger>
          <SelectContent className="w-[7rem]">
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
