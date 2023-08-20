import { useState } from 'react'
import { Button } from './ui/Button'
import { saveAs } from 'file-saver'
import Loader from './loader/Loader'
import { useImageQualityStore } from '@/store/use-image-quality'
import { useImageOptions } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { Clipboard, Download, Eye } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import * as htmlToImage from 'html-to-image'

export default function FloatingOptions() {
  const [loading, setLoading] = useState(false)

  const { quality } = useImageQualityStore()
  const { isImageUploaded } = useImageOptions()
  const { scaleFactor } = useResizeCanvas()

  const snapshotCreator = () => {
    return new Promise<Blob>((resolve, reject) => {
      try {
        if (!isImageUploaded) {
          toast({
            title: 'Error!',
            description: 'Upload a image then try again',
            variant: 'destructive',
          })
          return
        }
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
        setLoading(true)

        htmlToImage
          .toBlob(element, {
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
            setTimeout(() => {
              resolve(blob)
            }, 1500)
          })
      } catch (e: any) {
        toast({
          title: 'Image not uploaded',
          description: e.message,
          variant: 'destructive',
        })
        reject(e)
      } finally {
        setLoading(false)
      }
    })
  }

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator?.userAgent)
  const isNotFirefox = navigator.userAgent.indexOf('Firefox') < 0

  const copyImageToClipBoardOtherBrowsers = () => {
    if (isSafari) {
      navigator.clipboard
        .write([
          new ClipboardItem({
            'image/png': new Promise(async (resolve, reject) => {
              try {
                const blob = await snapshotCreator()
                resolve(new Blob([blob], { type: 'image/png' }))
              } catch (err) {
                reject(err)
              }
            }),
          }),
        ])
        .then(() =>
          toast({
            title: 'Copied the image',
          })
        )
        .catch((err: any) =>
          toast({
            title: `Couldn't copy`,
            description: err.message,
            variant: 'destructive',
          })
        )
    }
    if (isNotFirefox) {
      navigator?.permissions
      // @ts-ignore
        ?.query({ name: 'clipboard-write' })
        .then(async (result) => {
          if (result.state === 'granted') {
            const type = 'image/png'
            const blob = await snapshotCreator()
            let data = [new ClipboardItem({ [type]: blob })]
            navigator.clipboard
              .write(data)
              .then(() => {
                toast({
                  title: 'Successfully copied 🥳'
                })
              })
              .catch((err) => {
                toast({
            title: `Couldn't copy`,
            description: err.message,
            variant: 'destructive',
          })
              })
          }
        })
    } else {
      alert('Firefox does not support this functionality')
    }
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
          className="hidden text-[0.85rem] font-medium text-neutral-400 sm:inline-flex"
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
          onClick={copyImageToClipBoardOtherBrowsers}
        >
          <Clipboard size={18} className="mr-2" />
          <p>
            Copy <span className="hidden lg:inline-block">to clipboard</span>
          </p>
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            snapshotCreator()
              .then((blob) => {
                saveAs(blob, 'prismify-render.png')
              })
              .catch((err) => {
                toast({
                  variant: 'destructive',
                  title: 'Error!',
                  description: err.message,
                })
              })
              .finally(() => {
                setLoading(false)
              })
          }}
          className="w-fit text-[0.85rem]"
          variant="activeIcon"
          size="sm"
        >
          {loading ? (
            <div className="mr-2 flex scale-75 items-center">
              <Loader />
            </div>
          ) : (
            <Download size={18} className="mr-2" />
          )}
          <p>
            Save <span className="hidden lg:inline-block">image</span>
          </p>
        </Button>
      </div>
    </div>
  )
}
