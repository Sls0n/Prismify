import { Type } from 'lucide-react'
import AddTextLayer from './add-text-layer'
import FontSettings from './font-settings'

export default function TextOptions() {
  return (
    <div className="flex w-full flex-col gap-8">
      <AddTextLayer />

      <h3 className="flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <Type size={20} />
        <span>Appearance</span>
      </h3>
      <FontSettings />
    </div>
  )
}
