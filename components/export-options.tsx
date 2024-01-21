'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/hooks/use-toast'
import { useImageOptions } from '@/store/use-image-options'
import { useImageQualityStore } from '@/store/use-image-quality'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import { qualities } from '@/utils/presets/qualities'
import { saveAs } from 'file-saver'
import * as htmlToImage from 'html-to-image'
import { ChevronDown, Clipboard, Download, Info } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ExportOptions({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { quality, setQuality, fileType, setFileType } = useImageQualityStore()
  const { images } = useImageOptions()
  const { scaleFactor } = useResizeCanvas()

  const allowDownload = () => {
    if (images.length === 0) {
      toast({
        title: 'Error!',
        description: 'Upload an image then try again',
        variant: 'destructive',
      })
      return false
    }

    if (!isLoggedIn) {
      const downloaded = localStorage.getItem('downloaded')

      // allow one free download if not loggedin then ask to login for the next download
      if (downloaded === 'false' || !downloaded) {
        setIsModalOpen(true)
        return true
      }

      toast({
        title: 'You need to be logged in to download images',
        variant: 'destructive',
      })
      return false
    }

    return true
  }

  const snapshotCreator = () => {
    return new Promise<Blob>((resolve, reject) => {
      try {
        if (!allowDownload()) return

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
              localStorage.setItem('downloaded', 'true')
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
              localStorage.setItem('downloaded', 'true')
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
              localStorage.setItem('downloaded', 'true')
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
              localStorage.setItem('downloaded', 'true')
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
        if (!allowDownload()) return

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
            localStorage.setItem('downloaded', 'true')
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
      <Button
        className="w-fit text-[0.8rem] font-medium"
        variant="icon"
        size="sm"
        onClick={copyImageToClipBoardOtherBrowsers}
      >
        <Clipboard size={18} className="mr-0 text-dark/80 lg:mr-2" />
        <p className="hidden text-dark/80 lg:block">Copy</p>
      </Button>
      <div
        tabIndex={0}
        className="z-50 flex h-fit overflow-hidden rounded-xl border border-[rgba(99,102,241,0.15)] focus:outline-none focus:ring-2 focus:ring-[#898aeb]"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
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
          }
        }}
      >
        <Button
          tabIndex={-1}
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
          <Download size={18} className="mr-0 lg:mr-2" />
          <p className="hidden font-medium lg:block">Save</p>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              tabIndex={-1}
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
              tabIndex={-1}
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
      <Dialog open={isModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-2 flex items-center gap-2 text-dark">
              <Info className="h-5 w-5 opacity-70" />
              Important
            </DialogTitle>
            <DialogDescription>
              <p className="mb-2 text-base font-normal text-dark/60 ">
                Next time, you need an{' '}
                <span className="font-medium text-dark/70">account</span> to
                download images. Dont worry because you still can download as
                many images as you want for free. Just make sure to login before
                you start creating something.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start ">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              type="submit"
            >
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
