import { Rotate3d } from 'lucide-react'
import RotateOptions from './RotateOptions'

export default function PerspectiveOptions() {
  return (
    <div>
      <h3 className="mb-3 mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <Rotate3d size={20} />
        <span>Custom options</span>
      </h3>
      <RotateOptions />
    </div>
  )
}
