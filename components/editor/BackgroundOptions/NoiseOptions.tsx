import { Slider } from '@/components/ui/Slider'
import { useBackgroundOptions } from '@/store/use-background-options'
import { Grip } from 'lucide-react'

export default function NoiseOptions() {
  const { noise, setNoise } = useBackgroundOptions()

  return (
    <div>
      <div className="mb-3 mt-4 flex max-w-[70%] items-center px-1">
        <h3 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <Grip size={18} />
          <span>Noise</span>
        </h3>
      </div>

      <div className="mb-3 flex max-w-[70%] gap-4 text-[0.85rem]">
        <Slider
          defaultValue={[0]}
          max={0.5}
          min={0}
          step={0.01}
          value={[noise]}
          onValueChange={(value: number[]) => {
            setNoise(value[0])
          }}
        />
      </div>
    </div>
  )
}
