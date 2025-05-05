import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useColorExtractor } from '@/store/use-color-extractor'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import {
  BringToFront,
  CropIcon,
  ImagePlus,
  SendToBack,
  Trash,
  Wand,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Loader from '../loader'

const DynamicCropComponent = dynamic(() =>
  import('react-image-crop').then((mod) => mod.ReactCrop)
)

export default function ContextMenuImage({
  children,
}: {
  children: React.ReactNode
}) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })
  const imgRef = useRef<HTMLImageElement>(null)
  const { setImages, images } = useImageOptions()
  const [isRemovingBackground, setIsRemovingBackground] = useState(false)
  const [isBgRemovalDialogOpen, setIsBgRemovalDialogOpen] = useState(false)
  const [isProcessingBackground, setIsProcessingBackground] = useState(false)
  const [bgRemovalError, setBgRemovalError] = useState<string | null>(null)
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
    null
  )
  const { selectedImage, setSelectedImage, setEnableCrop, enableCrop } =
    useSelectedLayers()
  const { showControls, setShowControls } = useMoveable()
  const workerRef = useRef<Worker | null>(null)

  const handleImageDelete = (id: number) => {
    if (images.length === 1) {
      setImages([])
      return
    }

    if (selectedImage) {
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                image: '',
              }
            : image
        )
      )
    }

    setSelectedImage(null)
  }

  const bringToFrontOrBack = (direction: 'front' | 'back') => {
    if (selectedImage) {
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                style: {
                  ...image.style,
                  zIndex:
                    direction === 'front'
                      ? image.style.zIndex + 1
                      : image.style.zIndex - 1,
                },
              }
            : image
        )
      )
    }
  }

  useEffect(() => {
    // Terminate existing worker if component re-renders or dependencies change
    workerRef.current?.terminate()

    if (isBgRemovalDialogOpen && selectedImage) {
      const currentImage = images[selectedImage - 1]
      if (!currentImage || !currentImage.image) return

      setProcessedImageUrl(null) // Reset image URL first
      setBgRemovalError(null) // Reset error
      setIsProcessingBackground(true)

      // Create and configure the worker
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
          console.error('Background removal worker error:', event.data.error)
          setBgRemovalError(event.data.error)
          // Keep dialog open to show error or close?
          // setIsBgRemovalDialogOpen(false);
        }
        setIsProcessingBackground(false)
      }

      workerRef.current.onerror = (error) => {
        console.error('Unhandled worker error:', error)
        setBgRemovalError('An unexpected worker error occurred.')
        setIsProcessingBackground(false)
        // setIsBgRemovalDialogOpen(false);
      }

      // Send image source to worker
      workerRef.current.postMessage({ src: currentImage.image })
    } else {
      // If dialog is closed, ensure worker is terminated
      workerRef.current?.terminate()
      workerRef.current = null
    }

    // Cleanup function to terminate worker on unmount or when dialog closes
    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
    // Rerun effect when dialog opens/closes or selected image changes
  }, [isBgRemovalDialogOpen, selectedImage, images]) // Added images dependency

  useHotkeys(['Delete', 'Backspace'], () => {
    if (selectedImage)
      if (showControls) {
        handleImageDelete(selectedImage)
        setShowControls(false)
        setSelectedImage(null)
      }
  })

  const cropImageNow = () => {
    const canvas = document.createElement('canvas')
    const image = imgRef.current
    if (!image) return
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx: any = canvas.getContext('2d')

    const pixelRatio = window.devicePixelRatio
    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    const base64Image = canvas.toDataURL('image/png')
    selectedImage &&
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                image: base64Image,
              }
            : image
        )
      )
  }

  return (
    <Dialog
      open={enableCrop}
      onOpenChange={(open) => {
        if (open === false) setEnableCrop(false)
        setEnableCrop(open)
      }}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem
            inset
            onClick={() => {
              bringToFrontOrBack('back')
            }}
            // disabled={
            //   !selectedImage || images[selectedImage - 1].style.zIndex === 2
            // }
          >
            Send back
            <ContextMenuShortcut>
              <BringToFront size={19} className="opacity-80" />
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            inset
            onClick={() => {
              bringToFrontOrBack('front')
            }}
          >
            Bring forward
            <ContextMenuShortcut>
              <SendToBack size={19} className="opacity-80" />
            </ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ReplaceImage />

          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <div
              onClick={() => setIsBgRemovalDialogOpen(true)}
              className="ml-6 cursor-pointer"
            >
              Remove background
            </div>
            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
              <Wand size={19} className="opacity-80" />
            </span>
          </div>

          <DialogTrigger asChild>
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <div className="ml-6 cursor-pointer">Crop</div>
              <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                <CropIcon size={19} className="opacity-80" />
              </span>
            </div>
          </DialogTrigger>

          {/* <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
            </ContextMenuSubContent>
          </ContextMenuSub> */}

          <ContextMenuSeparator />
          <ContextMenuItem
            inset
            onClick={() => {
              selectedImage && handleImageDelete(selectedImage)
            }}
            className="text-[#F46567]/70 focus:text-[#f46567]/80"
          >
            Delete
            <ContextMenuShortcut>
              <Trash size={19} className="text-[#F46567]/70 opacity-80" />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent className="flex h-fit max-h-[95vh]  w-1/2 flex-col gap-4">
        <DialogHeader className="mb-4">
          <DialogTitle>Crop image</DialogTitle>
        </DialogHeader>

        <div className="mb-4 h-full w-full flex-1 overflow-hidden overflow-y-auto">
          {selectedImage && (
            <DynamicCropComponent
              crop={crop}
              onChange={(c) => setCrop(c)}
              disabled={!enableCrop || !selectedImage}
              onComplete={(c) => {
                console.log(c)
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={images[selectedImage - 1].image}
                alt="Crop selected image"
                className="h-full w-full object-cover"
              />
            </DynamicCropComponent>
          )}
        </div>

        <DialogFooter className="mt-auto flex items-center gap-1.5">
          <Button
            variant="outline"
            onClick={() => {
              setEnableCrop(false)
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              setEnableCrop(false)
              cropImageNow()
            }}
            className="flex-center gap-1.5"
          >
            <span>Done</span>
            <CropIcon size={19} className="opacity-80" />
          </Button>
        </DialogFooter>
      </DialogContent>

      <Dialog
        open={isBgRemovalDialogOpen}
        onOpenChange={setIsBgRemovalDialogOpen}
      >
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
              // Apply checkered background only when done processing, successful, and image is ready
              backgroundImage:
                !isProcessingBackground && processedImageUrl && !bgRemovalError
                  ? 'linear-gradient(45deg, rgba(204,204,204,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(204,204,204,0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(204,204,204,0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(204,204,204,0.05) 75%)'
                  : 'none',
              backgroundSize:
                !isProcessingBackground && processedImageUrl && !bgRemovalError
                  ? '20px 20px'
                  : 'auto',
              backgroundPosition:
                !isProcessingBackground && processedImageUrl && !bgRemovalError
                  ? '0 0, 0 10px, 10px -10px, -10px 0px'
                  : 'initial',
              // Keep a fallback bg or use theme background
              backgroundColor:
                !isProcessingBackground && processedImageUrl && !bgRemovalError
                  ? 'hsl(var(--background))' // Use theme background
                  : 'hsl(var(--muted) / 0.1)', // Original dim background
            }}
          >
            {isProcessingBackground && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 ">
                <Loader />
              </div>
            )}
            {/* Display Error Message */}
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
                // Dim image slightly if there's an error overlay
                style={{ opacity: bgRemovalError ? 0.5 : 1 }}
              />
            )}
            {processedImageUrl && (
              <img
                src={processedImageUrl}
                alt="Image with background removed"
                className="h-full w-full object-cover" // Show processed image even if error occurred previously
              />
            )}
          </div>

          <DialogFooter className="mt-auto flex items-center gap-1.5">
            <Button
              variant="outline"
              onClick={() => {
                setIsBgRemovalDialogOpen(false)
                setProcessedImageUrl(null)
                setBgRemovalError(null)
                setIsProcessingBackground(false) // Ensure loading state is reset
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
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
                setIsBgRemovalDialogOpen(false)
                setProcessedImageUrl(null)
              }}
              disabled={
                isProcessingBackground || !processedImageUrl || !!bgRemovalError
              } // Disable if processing, no result, or error
              className="flex-center gap-1.5"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}

function ReplaceImage() {
  const { setImages, images } = useImageOptions()
  const { selectedImage, setSelectedImage } = useSelectedLayers()

  const { setImagesCheck, imagesCheck } = useColorExtractor()

  const onDrop = async (file: any) => {
    const analyze = (await import('rgbaster')).default
    if (file) {
      const imageUrl = URL.createObjectURL(file)

      const result = await analyze(imageUrl, {
        scale: 0.3,
      })
      const extractedColors = result.slice(0, 12)

      selectedImage &&
        setImages(
          images.map((image, index) =>
            index === selectedImage - 1
              ? {
                  ...image,
                  image: imageUrl,
                  colors: extractedColors,
                }
              : image
          )
        )

      setImagesCheck([...imagesCheck, imageUrl])
    }
  }
  return (
    <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
      <label className="ml-6" htmlFor="file-replace">
        Replace image
      </label>
      <input
        id="file-replace"
        name="file-replace"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onDrop(e.target.files?.[0])
        }}
        accept="image/*"
        className="sr-only"
      />
      <span className="ml-auto text-xs tracking-widest text-muted-foreground">
        <ImagePlus size={19} className="opacity-80" />
      </span>
    </div>
  )
}
