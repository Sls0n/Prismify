import { ScrollArea } from '@/components/ui/scroll-area'
import BackgroundOptions from '@/components/editor/background-options'
import CanvasOptions from '@/components/editor/canvas-options'
import FrameOptions from '@/components/editor/frame-options'
import ImageOptions from '@/components/editor/image-options'
import PerspectiveOptions from '@/components/editor/perspective-options'
import PositionOptions from '@/components/editor/position-options'
import TextOptions from '@/components/editor/text-options'
import { useActiveIndexStore } from '@/store/use-active-index'

export default function MobileViewImageOptions() {
  const { activeIndex } = useActiveIndexStore()

  return (
    <ScrollArea className="mt-6 w-full md:hidden" type="auto">
      <div className="w-full max-w-[90%] md:hidden">
        {activeIndex === 0 && <CanvasOptions />}
        {activeIndex === 1 && <ImageOptions />}
        {activeIndex === 2 && <BackgroundOptions />}
        {activeIndex === 3 && <FrameOptions />}
        {activeIndex === 4 && <TextOptions />}
        {activeIndex === 5 && <PerspectiveOptions />}
        {activeIndex === 6 && <PositionOptions />}
      </div>
    </ScrollArea>
  )
}
