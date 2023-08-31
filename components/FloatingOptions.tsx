import { useResizeCanvas } from '@/store/use-resize-canvas'
import SaveOptions from './SaveOptions'

export default function FloatingOptions() {
  const { shouldFloat } = useResizeCanvas()
  return (
    <>
      {!shouldFloat && (
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transform">
          <div className="flex-center w-fit gap-3 rounded-xl border border-border bg-[#e9e9e9] px-6 py-3 shadow-sm dark:border-[#22262b]/50 dark:bg-sidebar">
            <SaveOptions />
          </div>
        </div>
      )}
    </>
  )
}
