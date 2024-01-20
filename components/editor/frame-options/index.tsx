import RoundnessOption from '../image-options/roundness-option'
import FramePicker from './frame-picker'
import AdditionalFrameOptions from './additional-frame-options'
import { Separator } from '@/components/ui/separator'

export default function FrameOptions() {
  return (
    <>
      <FramePicker />

      <RoundnessOption />

      <Separator className="mt-8 h-[0.1rem] w-full" />

      <AdditionalFrameOptions />
    </>
  )
}
