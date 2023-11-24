import { Clipboard, Download, Eye } from 'lucide-react'
import { Button } from './ui/Button'
import { saveAs } from 'file-saver'
import { useImageQualityStore } from '@/store/use-image-quality'
import { useImageOptions } from '@/store/use-image-options'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { toast } from '@/hooks/use-toast'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import * as htmlToImage from 'html-to-image'
import { qualities } from '@/utils/config'

export default function SaveOptions() {
  const { quality, setQuality, fileType, setFileType } = useImageQualityStore()
  const { images } = useImageOptions()
  const { scaleFactor } = useResizeCanvas()

  const snapshotCreator = () => {
    return new Promise<Blob>((resolve, reject) => {
      try {
        if (images.length === 0) {
          toast({
            title: 'Error!',
            description: 'Upload an image then try again',
            variant: 'destructive',
          })
          return
        }
        const scale = scaleFactor * quality
        const element =
          typeof window !== 'undefined' &&
          document?.getElementById('canvas-container')
        if (!element) {
          throw new Error('Element not found.')
        }

        if (fileType === 'JPG') {
          htmlToImage
            .toJpeg(element, {
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
            .catch((e: any) => {
              toast({
                title: 'Image not uploaded',
                description: e.message,
                variant: 'destructive',
              })
              reject(e)
            })
        } else if (fileType === 'PNG') {
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
              resolve(blob)
            })
            .catch((e: any) => {
              toast({
                title: 'Image not uploaded',
                description: e.message,
                variant: 'destructive',
              })
              reject(e)
            })
        } else if (fileType === 'WEBP') {
          htmlToImage
            .toCanvas(element, {
              height: element.offsetHeight * scale,
              width: element.offsetWidth * scale,

              style: {
                transform: 'scale(' + scale + ')',
                transformOrigin: 'top left',
                width: element.offsetWidth + 'px',
                height: element.offsetHeight + 'px',
              },
            })
            .then(function (canvas) {
              // Convert canvas to .webp format

              return canvas.toDataURL('image/webp')
            })
            .then(function (webpDataUrl) {
              // Save the .webp image
              const a = document.createElement('a')
              a.href = webpDataUrl
              a.download = `prismify-render-${Date.now()}.webp`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            })
            .catch(function (error) {
              console.error('Error:', error)
            })
        } else if (fileType === 'SVG') {
          htmlToImage
            .toSvg(element, {
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
            .catch((e: any) => {
              toast({
                title: 'Image not uploaded',
                description: e.message,
                variant: 'destructive',
              })
              reject(e)
            })
        } else {
          throw new Error('Invalid fileType') // Handle unsupported fileType
        }
      } catch (e: any) {
        toast({
          title: 'Error!',
          description: e.message,
          variant: 'destructive',
        })
        reject(e)
      }
    })
  }

  const snapShotCreatorForCopy = () => {
    return new Promise<Blob>((resolve, reject) => {
      try {
        if (images.length === 0) {
          toast({
            title: 'Error!',
            description: 'Upload an image then try again',
            variant: 'destructive',
          })
          return
        }
        const scale = scaleFactor * quality
        const element =
          typeof window !== 'undefined' &&
          document?.getElementById('canvas-container')
        if (!element) {
          throw new Error('Element not found.')
        }

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
            resolve(blob)
          })
          .catch((e: any) => {
            toast({
              title: 'Image not uploaded',
              description: e.message,
              variant: 'destructive',
            })
            reject(e)
          })
      } catch (e: any) {
        toast({
          title: 'Error!',
          description: e.message,
          variant: 'destructive',
        })
        reject(e)
      }
    })
  }

  const copyImageToClipBoardOtherBrowsers = () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator?.userAgent)
    const isNotFirefox = navigator.userAgent.indexOf('Firefox') < 0
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
            const blob = await snapShotCreatorForCopy()
            let data = [new ClipboardItem({ [type]: blob })]
            navigator.clipboard
              .write(data)
              .then(() => {
                toast({
                  title: 'Copied to clipboard. 🥳',
                  description: 'Command + V to paste/use it.',
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
      toast({
        title: "Couldn't copy image",
        description: "Firefox doesn't support it",
        variant: 'destructive',
      })
    }
  }
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="text-[0.85rem] font-medium"
            variant="icon"
            size="sm"
          >
            {quality}x
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mb-4 flex w-fit flex-wrap gap-2.5 p-4">
          {qualities.map((q) => (
            <Button
              variant={q.value === quality ? 'stylish' : 'outline'}
              key={q.quality}
              onClick={() => setQuality(q.value)}
            >
              {q.quality}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="text-[0.85rem] font-medium"
            variant="icon"
            size="sm"
          >
            {fileType}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mb-4 flex w-fit flex-wrap gap-2.5 p-4">
          {(
            ['PNG', 'JPG', 'WEBP', 'SVG'] as ('PNG' | 'JPG' | 'WEBP' | 'SVG')[]
          ).map((file) => (
            <Button
              variant={file === fileType ? 'stylish' : 'outline'}
              key={file}
              // disabled={file === 'SVG'}
              onClick={() => setFileType(file)}
            >
              {file}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      {/* <Button
        className="hidden text-[0.85rem] font-medium xl:inline-flex"
        variant="icon"
        size="sm"
      >
        <Eye size={18} className="mr-2" />
        <p>Preview</p>
      </Button> */}
      <Button
        className="w-fit text-[0.85rem] font-medium"
        variant="stylish"
        size="sm"
        onClick={copyImageToClipBoardOtherBrowsers}
      >
        <Clipboard size={18} className="mr-0 sm:mr-2" />
        <p className="hidden sm:block">
          Copy <span className="hidden lg:inline-block">as PNG</span>
        </p>
      </Button>
      <Button
        onClick={() => {
          snapshotCreator()
            .then((blob) => {
              saveAs(blob, `prismify-render-${Date.now()}`)
            })
            .catch((err) => {
              toast({
                variant: 'destructive',
                title: 'Error!',
                description: err.message,
              })
            })
        }}
        className="text-[0.85rem]"
        variant="default"
        size="sm"
      >
        <Download size={18} className="mr-0 sm:mr-2" />
        <p className="hidden sm:block">
          Save <span className="hidden lg:inline-block">image</span>
        </p>
      </Button>
    </>
  )
}
