import { Button } from './ui/Button'
import { saveAs } from 'file-saver'
import { useImageQualityStore } from '@/store/use-image-quality'
import { useImageOptions } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { Clipboard, Download, Eye } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import * as htmlToImage from 'html-to-image'

export default function FloatingOptions() {
  const { quality } = useImageQualityStore()
  const { isImageUploaded } = useImageOptions()
  const { scaleFactor } = useResizeCanvas()
  const snapshotCreator = () => {
    return new Promise<Blob>((resolve, reject) => {
      try {
        if (!isImageUploaded) throw new Error('Upload image and try again')
        const scale = scaleFactor * quality
        const element = document.getElementById('canvas-container')
        if (!element) {
          reject(new Error('Element not found.'))
          toast({
            title: 'Error!',
            description: 'Canvas container not found.',
            variant: 'destructive',
          })
          return

          // {TODO : ANOTHER IF CHECK TO CHECK IF THERE's WATERMARK}
        }
        htmlToImage
          .toPng(element, {
            height: element.offsetHeight * scale,
            width: element.offsetWidth * scale,

            style: {
              transform: 'scale(' + scale + ')',
              transformOrigin: 'top left',
              width: element.offsetWidth + 'px',
              height: element.offsetHeight + 'px',
            },
          })
          .then((dataURL) => {
            const blob = dataURL as unknown as Blob
            resolve(blob)
          })
      } catch (e: any) {
        toast({
          title: 'Image not uploaded',
          description: e.message,
          variant: 'destructive',
        })
      }
    })
  }
  return (
    <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transform">
      <div className="flex-center w-fit gap-3 rounded-xl border border-[#22262b]/50 bg-sidebar px-6 py-3 shadow-sm">
        <Button
          className="text-[0.85rem] font-medium text-neutral-400"
          variant="outline"
          size="sm"
        >
          1x
        </Button>
        <Button
          className="hidden text-[0.85rem] font-medium text-neutral-400 xl:inline-flex"
          variant="outline"
          size="sm"
        >
          PNG
        </Button>
        <Button
          className="text-[0.85rem] font-medium text-neutral-400"
          variant="outline"
          size="sm"
        >
          <Eye size={18} className="mr-2" />
          <p>Preview</p>
        </Button>
        <Button
          className="w-fit text-[0.85rem] font-medium"
          variant="stylish"
          size="sm"
        >
          <Clipboard size={18} className="mr-2" />
          <p>
            Copy <span className="hidden lg:inline-block">to clipboard</span>
          </p>
        </Button>
        <Button
          onClick={() => {
            snapshotCreator().then((blob) => {
              saveAs(blob, 'prismify-render.png')
            })
          }}
          className="w-fit text-[0.85rem]"
          variant="activeIcon"
          size="sm"
        >
          <Download size={18} className="mr-2" />
          <p>
            Save <span className="hidden lg:inline-block">image</span>
          </p>
        </Button>
      </div>
    </div>
  )
}
