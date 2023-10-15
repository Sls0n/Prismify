import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useBackgroundOptions } from '@/store/use-background-options'
import CustomOptions from './CustomOptions'
import GradientOptions from './GradientOptions'
import NoiseOptions from './NoiseOptions'
import PatternOptions from './PatternOptions'

export default function BackgroundOptions() {
  const { backgroundType } = useBackgroundOptions()

  return (
    <>
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
        <TabsList className="mb-3">
          <TabsTrigger value="gradientsTab">Gradients</TabsTrigger>
          <TabsTrigger value="patternsTab">Patterns</TabsTrigger>
          <TabsTrigger className='hidden sm:flex' value="customTab">Custom</TabsTrigger>
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
    </>
  )
}
