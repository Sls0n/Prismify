'use client'

import CircularSlider, {
  CircularSliderProps,
} from '@fseehawer/react-circular-slider'
import { useBackgroundOptions } from '@/store/use-background-options'

const CircularSliderComp: React.FC<CircularSliderProps> = () => {
  const { gradientAngle, setGradientAngle } = useBackgroundOptions()

  return (
    <CircularSlider
      label=" "
      width={100}
      min={0}
      initialValue={gradientAngle}
      max={360}
      dataIndex={gradientAngle}
      appendToValue="°"
      labelColor="#898aeb"
      labelBottom={true}
      knobColor="#898aeb"
      knobSize={20}
      progressColorFrom="#8e8ece"
      progressColorTo="rgb(202, 194, 255)"
      progressSize={6}
      trackColor="rgb(99 102 241 / 0.1)"
      trackSize={9}
      valueFontSize="1rem"
      onChange={(value: number) => {
        if (typeof window === 'undefined') return
        document?.documentElement.style.setProperty(
          '--gradient-angle',
          `${value.toString()}deg`
        )
        setGradientAngle(value)
      }}
    >
      °
    </CircularSlider>
  )
}

export default CircularSliderComp
