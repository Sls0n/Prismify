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
import { Clipboard, Download } from 'lucide-react'
import { Button } from './ui/button'

interface ExportOptionsProps {
  isLoggedIn: boolean
}

export default function ExportOptions({ isLoggedIn }: ExportOptionsProps) {
  const { quality, setQuality, fileType, setFileType } = useImageQualityStore()
  const { images } = useImageOptions()
  const { scaleFactor } = useResizeCanvas()

  const checkDownloadPermission = () => {
    if (images.length === 0) {
      toast({
        title: 'Error!',
        description: 'Upload an image then try again',
        variant: 'destructive',
      })
      return false
    }
    return true
  }

  const getHtmlToImageConfig = (element: HTMLElement, scale: number) => {
    // Get device pixel ratio and reset it to 1 to avoid scaling issues
    const originalPixelRatio = window.devicePixelRatio
    Object.defineProperty(window, 'devicePixelRatio', {
      get: function () {
        return 1
      },
    })

    const config = {
      height: element.offsetHeight * scale,
      width: element.offsetWidth * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
      },
      pixelRatio: 1, // Force pixel ratio to 1
    }

    // Restore original device pixel ratio after config is created
    Object.defineProperty(window, 'devicePixelRatio', {
      get: function () {
        return originalPixelRatio
      },
    })

    return config
  }

  const handleExportError = (error: any) => {
    toast({
      title: 'Error!',
      description: error.message,
      variant: 'destructive',
    })
    return Promise.reject(error)
  }

  const createSnapshot = async () => {
    if (!checkDownloadPermission()) return

    const scale = scaleFactor * quality
    const element = document?.getElementById('canvas-container')
    if (!element) throw new Error('Canvas element not found')

    const config = getHtmlToImageConfig(element, scale)

    try {
      let result: Blob | string
      switch (fileType) {
        case 'JPG':
          result = await htmlToImage.toJpeg(element, config)
          break
        case 'PNG':
          result = (await htmlToImage.toBlob(element, config)) as Blob
          break
        case 'WEBP':
          const canvas = await htmlToImage.toCanvas(element, config)
          const webpUrl = canvas.toDataURL('image/webp')
          const a = document.createElement('a')
          a.href = webpUrl
          a.download = `prismify-render-${Date.now()}.webp`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          return
        case 'SVG':
          result = await htmlToImage.toSvg(element, config)
          break
        default:
          throw new Error('Unsupported file type')
      }

      localStorage.setItem('downloaded', 'true')
      return result as Blob
    } catch (error) {
      return handleExportError(error)
    }
  }

  const copyToClipboard = async () => {
    const isFirefox = navigator.userAgent.includes('Firefox')

    if (!checkDownloadPermission()) return

    if (isFirefox) {
      return toast({
        title: "Couldn't copy image",
        description: "Firefox doesn't support it",
        variant: 'destructive',
      })
    }

    try {
      const blob = await createSnapshot()
      if (!blob) return
      const clipboardItem = new ClipboardItem({
        'image/png': Promise.resolve(new Blob([blob], { type: 'image/png' })),
      })

      await navigator.clipboard.write([clipboardItem])
      toast({ title: 'Copied to clipboard. 🥳' })
    } catch (error: any) {
      toast({
        title: "Couldn't copy",
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleDownload = async () => {
    try {
      const blob = await createSnapshot()
      if (blob) {
        saveAs(blob, `prismify-render-${Date.now()}`)
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: error.message,
      })
    }
  }

  return (
    <>
      <Button
        className="w-fit text-[0.8rem] font-medium"
        variant="icon"
        size="sm"
        onClick={copyToClipboard}
      >
        <Clipboard size={18} className="mr-0 text-dark/80 lg:mr-2" />
        <p className="hidden text-dark/80 lg:block">Copy</p>
      </Button>

      <div
        tabIndex={0}
        className="z-50 flex h-fit overflow-hidden rounded-xl border border-[rgba(99,102,241,0.15)] focus:outline-none focus:ring-2 focus:ring-[#898aeb]"
        onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
      >
        <Button
          tabIndex={-1}
          onClick={handleDownload}
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
                  <span className={q.value === quality ? '' : 'text-dark/60'}>
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
              {fileType}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="mb-4 flex w-full min-w-[15rem] max-w-[15rem] flex-col gap-4 rounded-lg border border-border/60 dark:bg-[#151515]"
          >
            <p className="text-sm font-medium text-dark/90">Image formats</p>
            <div className="grid w-full grid-cols-2 gap-2.5">
              {(['PNG', 'JPG', 'WEBP', 'SVG'] as const).map((format) => (
                <Button
                  variant={format === fileType ? 'stylish' : 'outline'}
                  key={format}
                  onClick={() => setFileType(format)}
                  className="rounded-lg border border-border/80 text-[0.8rem] font-medium"
                >
                  .{format}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
