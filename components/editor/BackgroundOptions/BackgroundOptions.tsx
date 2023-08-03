import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import GradientOptions from './Gradients'
import SolidOptions from './Solids'
import ImageOptions from './Images'

export default function BackgroundOptions() {
  return (
    <>
      <Tabs className="mt-4" defaultValue="gradient">
        <TabsList className="mb-3">
          <TabsTrigger value="gradient">Gradient</TabsTrigger>
          <TabsTrigger value="solid">Solid</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        <TabsContent value="gradient">
          <GradientOptions />
        </TabsContent>
        <TabsContent value="solid">
          <SolidOptions />
        </TabsContent>
        <TabsContent value="image">
          <ImageOptions />
        </TabsContent>
      </Tabs>
    </>
  )
}
