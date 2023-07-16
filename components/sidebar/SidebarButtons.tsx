import { Button } from '../ui/Button'
import { Type, Plus, ImagePlus, LayoutTemplate, Brush } from 'lucide-react'

export default function SidebarButtons() {
  return (
    <div className="flex min-h-[10%] h-fit items-center justify-around gap-2 border-b border-t border-border flex-wrap p-2">
      <Button variant="outline" className="flex flex-col gap-2 rounded-lg">
        <LayoutTemplate className="h-5 w-5" />
        <span className="sr-only">Choose templates</span>
      </Button>
      <Button variant="outline" className="flex flex-col gap-2 rounded-lg">
        <ImagePlus className="h-5 w-5" />
        <span className="sr-only">Upload image</span>
      </Button>
      <Button variant="outline" className="flex flex-col gap-2 rounded-lg">
        <Type className="h-5 w-5" />
        <span className="sr-only">Add text</span>
      </Button>
      <Button variant="outline" className="flex flex-col gap-2 rounded-lg">
        <Brush className="h-5 w-5" />
        <span className="sr-only">Draw</span>
      </Button>
      <Button variant="outline" className="flex flex-col gap-2 rounded-lg">
        <Plus className="h-5 w-5" />
        <span className="sr-only">View More</span>
      </Button>
    </div>
  )
}
