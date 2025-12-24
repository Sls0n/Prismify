'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { Wand } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Loader from '@/components/loader'

interface BackgroundRemovalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BackgroundRemovalDialog({
  open,
  onOpenChange,
}: BackgroundRemovalDialogProps) {
  const { setImages, images } = useImageOptions()
  const { selectedImage } = useSelectedLayers()
  const [isProcessingBackground, setIsProcessingBackground] = useState(false)
  const [bgRemovalError, setBgRemovalError] = useState<string | null>(null)
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
  const workerRef = useRef<Worker | null>(null)

  useEffect(() => {
    workerRef.current?.terminate()

    if (open && selectedImage) {
      const currentImage = images[selectedImage - 1]
      if (!currentImage || !currentImage.image) return

      setProcessedImageUrl(null)
      setBgRemovalError(null)
      setIsProcessingBackground(true)

      workerRef.current = new Worker(
        new URL('@/workers/background-removal.worker.ts', import.meta.url)
      )

      workerRef.current.onmessage = (
        event: MessageEvent<
          { type: 'success'; url: string } | { type: 'error'; error: string }
        >
      ) => {
        if (event.data.type === 'success') {
          setProcessedImageUrl(event.data.url)
          setBgRemovalError(null)
        } else if (event.data.type === 'error') {
          setBgRemovalError(event.data.error)
        }
        setIsProcessingBackground(false)
      }

      workerRef.current.onerror = () => {
        setBgRemovalError('An unexpected worker error occurred.')
        setIsProcessingBackground(false)
      }

      workerRef.current.postMessage({ src: currentImage.image })
    } else {
      workerRef.current?.terminate()
      workerRef.current = null
    }

    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
  }, [open, selectedImage, images])

  const handleClose = () => {
    onOpenChange(false)
    setProcessedImageUrl(null)
    setBgRemovalError(null)
    setIsProcessingBackground(false)
  }

  const handleApply = () => {
    if (selectedImage && processedImageUrl) {
      setImages(
        images.map((img, index) =>
          index === selectedImage - 1
            ? {
                ...img,
                image: processedImageUrl,
                style: {
                  ...img.style,
                  shadowName: 'None',
                  imageShadow: '0 0 0 0',
                },
              }
            : img
        )
      )
    }
    onOpenChange(false)
    setProcessedImageUrl(null)
  }

  const showCheckeredBackground =
    !isProcessingBackground && processedImageUrl && !bgRemovalError

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-fit max-h-[95vh] w-1/2 flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="mb-4 flex items-center gap-1.5">
            <Wand size={19} className="opacity-80" />
            <span>Remove Background</span>
          </DialogTitle>
        </DialogHeader>

        <div
          className="relative mb-4 flex h-full w-full flex-1 items-center justify-center overflow-hidden overflow-y-auto"
          style={{
            backgroundImage: showCheckeredBackground
              ? 'linear-gradient(45deg, rgba(204,204,204,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(204,204,204,0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(204,204,204,0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(204,204,204,0.05) 75%)'
              : 'none',
            backgroundSize: showCheckeredBackground ? '20px 20px' : 'auto',
            backgroundPosition: showCheckeredBackground
              ? '0 0, 0 10px, 10px -10px, -10px 0px'
              : 'initial',
            backgroundColor: showCheckeredBackground
              ? 'hsl(var(--background))'
              : 'hsl(var(--muted) / 0.1)',
          }}
        >
          {isProcessingBackground && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60">
              <Loader />
            </div>
          )}

          {!isProcessingBackground && bgRemovalError && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-destructive/60 p-4 text-center">
              <p className="font-semibold text-white">
                Error Removing Background
              </p>
              <p className="mt-1 text-xs text-white/80">{bgRemovalError}</p>
            </div>
          )}

          {selectedImage && !processedImageUrl && (
            <img
              src={images[selectedImage - 1]?.image}
              alt="Original image"
              className="h-full w-full object-cover"
              style={{ opacity: bgRemovalError ? 0.5 : 1 }}
            />
          )}

          {processedImageUrl && (
            <img
              src={processedImageUrl}
              alt="Image with background removed"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <DialogFooter className="mt-auto flex items-center gap-1.5">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleApply}
            disabled={isProcessingBackground || !processedImageUrl || !!bgRemovalError}
            className="flex-center gap-1.5"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
