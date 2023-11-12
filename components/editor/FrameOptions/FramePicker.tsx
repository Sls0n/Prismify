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
import { useFrameOptions } from '@/store/use-frame-options'
import { useSelectedLayers } from '@/store/use-image-options'
import { ChevronDown } from 'lucide-react'
import {
  FrameInsidePopupPreview,
  FramePopupPreview,
} from './FramePresetPreview'

export default function FramePicker() {
  const { browserFrame, setFrameHeight, frameHeight } = useFrameOptions()
  const { selectedImage } = useSelectedLayers()

  return (
    <>
      <div
        className={`mb-3 mt-4 flex items-center px-1 md:max-w-[70%] 
        ${selectedImage ? '' : 'pointer-events-none opacity-40'}
      `}
      >
        <h1 className="text-[0.85rem]">Frame:</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-primary/70 dark:text-dark/70">
          {browserFrame}
        </p>
      </div>
      <Popover>
        <PopoverTrigger
          className={`relative h-24 max-w-[100%] overflow-hidden rounded-lg border border-border bg-formDark px-4 py-2 md:max-w-[50%] md:px-0 md:py-0 ${
            selectedImage ? '' : 'pointer-events-none opacity-40'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-center basis-[80%]">
              <FramePopupPreview />
            </div>
            <div className="flex-1">
              <ChevronDown
                size={18}
                className="text-primary/70 dark:text-dark/80"
              />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="grid w-[350px] grid-cols-2 gap-4 rounded-lg bg-formDark p-4"
        >
          {/* Inside popup  */}
          <FrameInsidePopupPreview />
        </PopoverContent>
      </Popover>

      <div
        className={`mt-8 flex flex-col gap-3 px-1 md:max-w-[70%] ${
          selectedImage ? '' : 'pointer-events-none opacity-40'
        }`}
      >
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
