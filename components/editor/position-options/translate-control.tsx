import { useSelectedLayers } from '@/store/use-image-options'
import ImageStyleSlider from '../shared/image-style-slider'

export default function TranslateOption() {
  const { selectedImage } = useSelectedLayers()

  return (
    <div className={`${selectedImage ? '' : 'pointer-events-none opacity-40'}`}>
      <div className="mt-2">
        <ImageStyleSlider
          label="Translate X"
          property="translateX"
          min={-1000}
          max={1000}
          step={0.001}
          defaultValue={0}
        />
      </div>

      <div className="mt-3">
        <ImageStyleSlider
          label="Translate Y"
          property="translateY"
          min={-500}
          max={500}
          step={0.001}
          defaultValue={0}
        />
      </div>
    </div>
  )
}
