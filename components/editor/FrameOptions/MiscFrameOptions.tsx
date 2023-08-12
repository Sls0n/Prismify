import { Switch } from '@/components/ui/Switch'
import { Settings2 } from 'lucide-react'
import { useFrameOptions } from '@/store/use-frame-options'

export default function MiscFrameOptions() {
  const { browserFrame, setShowSearchBar } = useFrameOptions()

  if (browserFrame !== 'None')
    return (
      <>
        <h3 className="mb-4 mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <Settings2 size={20} />
          <span>Additional options</span>
        </h3>

        <div className="flex max-w-[70%] items-center gap-4 px-1">
          <h1 className="text-[0.85rem]">Show search bar :</h1>
          <Switch
            defaultChecked
            onCheckedChange={(checked) => {
              setShowSearchBar(checked)
            }}
          />
        </div>
      </>
    )
}
