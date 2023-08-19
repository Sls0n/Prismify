import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useBackgroundOptions } from '@/store/use-background-options'
import GradientOptions from './GradientOptions'
import PatternOptions from './PatternOptions'
import CustomOptions from './CustomOptions'

export default function BackgroundOptions() {
  const { backgroundType } = useBackgroundOptions()

  return (
    <>
      <Tabs className="mt-4" defaultValue={backgroundType === 'solid' ? 'customTab' : backgroundType === 'pattern' ? 'patternsTab' : 'gradientsTab'}>
        <TabsList className="mb-3">
          <TabsTrigger value="gradientsTab">Gradients</TabsTrigger>
          <TabsTrigger value="patternsTab">Patterns</TabsTrigger>
          <TabsTrigger value="customTab">Custom</TabsTrigger>
        </TabsList>
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
