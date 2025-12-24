import { useSelectedLayers } from '@/store/use-image-options'
import ImageStyleSlider from '../shared/image-style-slider'

export default function RotateOptions() {
  const { selectedImage } = useSelectedLayers()

  return (
    <div className={`${selectedImage ? '' : 'pointer-events-none opacity-40'}`}>
      <div className="mt-8">
        <ImageStyleSlider
          label="3D Depth"
          property="perspective"
          min={0}
          max={6500}
          defaultValue={2000}
          incrementStep={500}
        />
      </div>

      <hr className="my-6" />

      <ImageStyleSlider
        label="Rotate X"
        property="rotateX"
        min={-180}
        max={180}
        defaultValue={0.0001}
      />

      <div className="mt-3">
        <ImageStyleSlider
          label="Rotate Y"
          property="rotateY"
          min={-180}
          max={180}
          defaultValue={0}
        />
      </div>

      <div className="mt-3">
        <ImageStyleSlider
          label="Rotate Z"
          property="rotateZ"
          min={-180}
          max={180}
          defaultValue={0}
        />
      </div>
    </div>
  )
}
