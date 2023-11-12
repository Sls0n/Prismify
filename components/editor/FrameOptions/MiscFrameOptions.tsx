import { Switch } from '@/components/ui/Switch'
import { useFrameOptions } from '@/store/use-frame-options'
import { useSelectedLayers } from '@/store/use-image-options'
import { Settings2 } from 'lucide-react'

export default function MiscFrameOptions() {
  const { browserFrame, setShowSearchBar } = useFrameOptions()
  const { selectedImage } = useSelectedLayers()

  if (browserFrame !== 'None' && browserFrame !== 'Arc')
    return (
      <div
        className={`${selectedImage ? '' : 'pointer-events-none opacity-40'}`}
      >
        <h3 className="mb-4 mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <Settings2 size={20} />
          <span>Additional options</span>
        </h3>

        <div className="flex items-center gap-4 px-1 md:max-w-[70%]">
          <h1 className="text-[0.85rem]">Show search bar :</h1>
          <Switch
            defaultChecked={false}
            onCheckedChange={(checked) => {
              setShowSearchBar(checked)
            }}
          />
        </div>
      </div>
    )
}
