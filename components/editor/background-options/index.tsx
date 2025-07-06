import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useBackgroundOptions } from '@/store/use-background-options'
import CustomGradientPicker from './custom-gradient-picker'
import NormalGradientPicker from './normal-gradient-picker'
import NoiseSlider from './noise-slider'
import PatternPicker from './pattern-picker'
import { useEffect } from 'react'

export default function BackgroundOptions() {
  const { backgroundType, setIsBackgroundClicked } = useBackgroundOptions()

  useEffect(() => {
    setIsBackgroundClicked(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tabs
      className="mt-4 !border-none !shadow-none !bg-transparent w-full"
      defaultValue={
        backgroundType === 'solid'
          ? 'customTab'
          : backgroundType === 'pattern'
          ? 'patternsTab'
          : 'gradientsTab'
      }
    >
      <TabsList className="mb-4 bg-transparent border-none border-b border-border [&>*]:px-[1rem] [&>*]:border-b-2 [&>*]:border-border/40 [&>*]:pb-2 [&>*]:rounded-none [&>*[data-state=active]]:border-foreground [&>*[data-state=active]]:bg-transparent *:w-fit">
        <TabsTrigger value="gradientsTab">Gradient</TabsTrigger>
        <TabsTrigger value="patternsTab">Abstract</TabsTrigger>
        <TabsTrigger className='hidden sm:flex' value="customTab">
          Pick
        </TabsTrigger>
      </TabsList>
      <NoiseSlider />
      <TabsContent value="gradientsTab">
        <NormalGradientPicker />
      </TabsContent>
      <TabsContent value="patternsTab">
        <PatternPicker />
      </TabsContent>
      <TabsContent value="customTab">
        <CustomGradientPicker />
      </TabsContent>
    </Tabs>
  )
}
