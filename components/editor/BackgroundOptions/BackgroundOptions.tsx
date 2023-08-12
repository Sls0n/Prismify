import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useBackgroundOptions } from '@/store/use-background-options'
import GradientOptions from './GradientOptions'
import PatternOptions from './PatternOptions'
import CustomOptions from './CustomOptions'

export default function BackgroundOptions() {
  const { isSolidColor } = useBackgroundOptions()

  return (
    <>
      <Tabs className="mt-4" defaultValue={isSolidColor ? 'custom' : 'gradients'}>
        <TabsList className="mb-3">
          <TabsTrigger value="gradients">Gradients</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        <TabsContent value="gradients">
          <GradientOptions />
        </TabsContent>
        <TabsContent value="patterns">
          <PatternOptions />
        </TabsContent>
        <TabsContent value="custom">
          <CustomOptions />
        </TabsContent>
      </Tabs>
    </>
  )
}
