import { ChevronDown, Clipboard, Download, Eye } from 'lucide-react'
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
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            className="text-[0.8rem] font-medium"
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
            className="text-[0.8rem] font-medium"
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
      </Popover> */}

      {/* <Button
        className="hidden text-[0.85rem] font-medium xl:inline-flex"
        variant="icon"
        size="sm"
      >
        <Eye size={18} className="mr-2" />
        <p>Preview</p>
      </Button> */}
      <Button
        className="w-fit text-[0.8rem] font-medium"
        variant="icon"
        size="sm"
        onClick={copyImageToClipBoardOtherBrowsers}
      >
        <Clipboard size={18} className="mr-0 text-dark/80 sm:mr-2" />
        <p className="hidden text-dark/80 sm:block">Copy</p>
      </Button>
      <div className="z-50 flex h-fit overflow-hidden rounded-xl border border-[rgba(99,102,241,0.15)]">
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
          className="rounded-none border-b-0 border-l-0 border-r-[1.5px] border-t-0 border-[rgba(99,102,241,0.15)] px-2 text-[0.8rem] font-medium"
          variant="stylish"
          size="sm"
        >
          <Download size={18} className="mr-0 sm:mr-2" />
          <p className="hidden font-medium sm:block">Save</p>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="rounded-none border-b-0 border-l-0 border-r-[1.5px] border-t-0 border-[rgba(99,102,241,0.15)] px-2.5 text-[0.8rem] font-medium"
              variant="stylish"
              size="sm"
            >
              {quality}x
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="mb-4 flex w-full min-w-[15rem] max-w-[15rem] flex-col gap-4 rounded-lg border border-border/60 dark:bg-[#151515]"
          >
            <p className="text-sm font-medium text-dark/90">Quality</p>
            <div className="grid w-full grid-cols-2 gap-2.5">
              {qualities.map((q) => (
                <Button
                  variant={q.value === quality ? 'stylish' : 'outline'}
                  key={q.quality}
                  onClick={() => setQuality(q.value)}
                  className="rounded-lg border border-border/80 text-[0.8rem] font-medium"
                >
                  {q.quality.split('x')[0]}x &mdash;{' '}
                  <span
                    className={`${q.value === quality ? '' : 'text-dark/60'}`}
                  >
                    {q.quality.split('x')[1]}
                  </span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="flex items-center justify-center rounded-none border-none px-2 text-[0.8rem] font-medium"
              variant="stylish"
              size="sm"
            >
              <ChevronDown size={18} className="mr-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="mb-4 flex w-full min-w-[15rem] max-w-[15rem] flex-col gap-4 rounded-lg border border-border/60 dark:bg-[#151515]"
          >
            <p className="text-sm font-medium text-dark/90">Image formats</p>
            <div className="grid w-full grid-cols-2 gap-2.5">
              {(
                ['PNG', 'JPG', 'WEBP', 'SVG'] as (
                  | 'PNG'
                  | 'JPG'
                  | 'WEBP'
                  | 'SVG'
                )[]
              ).map((file) => (
                <Button
                  variant={file === fileType ? 'stylish' : 'outline'}
                  key={file}
                  // disabled={file === 'SVG'}
                  onClick={() => setFileType(file)}
                  className="rounded-lg border border-border/80 text-[0.8rem] font-medium"
                >
                  .{file}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
