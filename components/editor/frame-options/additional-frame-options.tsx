import PopupColorPicker from '@/components/popup-color-picker'
import { Switch } from '@/components/ui/switch'
import { useFrameOptions } from '@/store/use-frame-options'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { Settings2 } from 'lucide-react'

export default function AdditionalFrameOptions() {
  const {
    setShowSearchBar,
    setShowStroke,
    macOsDarkColor,
    setMacOsDarkColor,
    setMacOsLightColor,
    macOsLightColor,
    setArcDarkMode,
    showStroke,
    arcDarkMode,
    hideButtons,
    setHideButtons,
    hasButtonColor,
    setHasButtonColor,
  } = useFrameOptions()
  const { selectedImage } = useSelectedLayers()
  const { images } = useImageOptions()

  const browserFrame = selectedImage ? images[selectedImage - 1]?.frame : 'None'

  if (browserFrame !== 'None')
    return (
      <div
        className={`${selectedImage ? '' : 'pointer-events-none opacity-40'} `}
      >
        <h3 className="mb-6 mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <Settings2 size={20} />
          <span>Additional options</span>
        </h3>

        {(browserFrame === 'MacOS Dark' || browserFrame === 'MacOS Light') && (
          <div className="mb-6 flex items-center justify-between gap-4 px-1">
            <h1 className="text-[0.85rem]">Show searchbar :</h1>
            <Switch
              defaultChecked={false}
              onCheckedChange={(checked) => {
                setShowSearchBar(checked)
              }}
            />
          </div>
        )}

        {(browserFrame === 'MacOS Dark' || browserFrame === 'MacOS Light') && (
          <div className="mb-6 flex items-center justify-between gap-4 px-1">
            <h1 className="text-[0.85rem]">Colorful buttons :</h1>
            <Switch
              defaultChecked={true}
              checked={hasButtonColor}
              onCheckedChange={(checked) => {
                setHasButtonColor(checked)
              }}
            />
          </div>
        )}

        {(browserFrame === 'MacOS Dark' || browserFrame === 'MacOS Light') && (
          <div className="mb-6 flex items-center justify-between gap-4 px-1">
            <h1 className="text-[0.85rem]">Hide buttons :</h1>
            <Switch
              defaultChecked={false}
              checked={hideButtons}
              onCheckedChange={(checked) => {
                setHideButtons(checked)
              }}
            />
          </div>
        )}

        {(browserFrame === 'MacOS Dark' || browserFrame === 'MacOS Light') && (
          <div className="mb-6 flex items-center justify-between gap-4 px-1">
            <h1 className="text-[0.85rem]">Frame color :</h1>
            <PopupColorPicker
              shouldShowDropdown={false}
              shouldShowAlpha={true}
              color={
                browserFrame === 'MacOS Dark' ? macOsDarkColor : macOsLightColor
              }
              onChange={(color) => {
                if (browserFrame === 'MacOS Dark') {
                  setMacOsDarkColor(color)
                } else {
                  setMacOsLightColor(color)
                }
              }}
            />
          </div>
        )}

        {browserFrame === 'Shadow' && (
          <div className="mb-6 flex items-center gap-4 px-1 md:max-w-full">
            <h1 className="text-[0.85rem]">Show outline :</h1>
            <Switch
              defaultChecked={true}
              checked={showStroke}
              onCheckedChange={(checked) => {
                setShowStroke(checked)
              }}
            />
          </div>
        )}

        {browserFrame === 'Arc' && (
          <div className="mb-6 flex items-center gap-4 px-1 md:max-w-full">
            <h1 className="text-[0.85rem]">Dark mode :</h1>
            <Switch
              defaultChecked={false}
              checked={arcDarkMode}
              onCheckedChange={(checked) => {
                setArcDarkMode(checked)
              }}
            />
          </div>
        )}
      </div>
    )
}
