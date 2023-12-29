import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useBackgroundOptions } from '@/store/use-background-options'
import CustomOptions from './CustomOptions'
import GradientOptions from './GradientOptions'
import NoiseOptions from './NoiseOptions'
import PatternOptions from './PatternOptions'
import { useEffect } from 'react'

export default function BackgroundOptions() {
  const { backgroundType, setIsBackgroundClicked } = useBackgroundOptions()

  useEffect(() => {
    setIsBackgroundClicked(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tabs
      className="mt-4"
      defaultValue={
        backgroundType === 'solid'
          ? 'customTab'
          : backgroundType === 'pattern'
          ? 'patternsTab'
          : 'gradientsTab'
      }
    >
      <TabsList className="mb-4 bg-[#191919] [&>*]:px-[1rem]">
        <TabsTrigger value="gradientsTab">Gradient</TabsTrigger>
        <TabsTrigger value="patternsTab">Pattern</TabsTrigger>
        <TabsTrigger className="hidden sm:flex" value="customTab">
          Pick
        </TabsTrigger>
      </TabsList>
      <NoiseOptions />
      <TabsContent value="gradientsTab">
        <GradientOptions />
      </TabsContent>
      <TabsContent value="patternsTab">
        <PatternOptions />
      </TabsContent>
      <TabsContent value="customTab">
        <CustomOptions />
      </TabsContent>
    </Tabs>
  )
}
