import RoundnessOption from '../ImageOptions/RoundnessOption'
import FramePicker from './FramePicker'
import MiscFrameOptions from './MiscFrameOptions'
import { Separator } from '@/components/ui/Separator'

export default function FrameOptions() {
  return (
    <>
      <FramePicker />

      <RoundnessOption />

      <Separator className="mt-8 h-[0.1rem] w-full" />

      <MiscFrameOptions />
    </>
  )
}
