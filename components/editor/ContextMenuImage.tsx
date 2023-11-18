import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu'
import { useColorExtractor } from '@/store/use-color-extractor'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import {
  BringToFront,
  Check,
  CropIcon,
  ImagePlus,
  SendToBack,
  Trash,
} from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import analyze from 'rgbaster'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '@/components/ui/Button'

export default function ContextMenuImage({
  children,
}: {
  children: React.ReactNode
}) {
  const { setImages, images } = useImageOptions()
  const { selectedImage, setSelectedImage, setEnableCrop, enableCrop } =
    useSelectedLayers()
  const { showControls, setShowControls } = useMoveable()
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })

  const handleImageDelete = (id: number) => {
    // const newImages = images.filter((image) => image.id !== id)
    // setImages(newImages)

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

  useHotkeys('Delete', () => {
    if (selectedImage)
      if (showControls) {
        handleImageDelete(selectedImage)
        setShowControls(false)
        setSelectedImage(null)
      }
  })

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
          <ContextMenuItem inset disabled>
            Send back
            <ContextMenuShortcut>
              <BringToFront size={19} className="opacity-80" />
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Bring forward
            <ContextMenuShortcut>
              <SendToBack size={19} className="opacity-80" />
            </ContextMenuShortcut>
          </ContextMenuItem>

          <ReplaceImage />

          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <DialogTrigger asChild>
                <ContextMenuItem
                  onClick={() => {
                    setEnableCrop(true)
                  }}
                >
                  Crop
                  <ContextMenuShortcut>
                    <CropIcon size={19} className="opacity-80" />
                  </ContextMenuShortcut>
                </ContextMenuItem>
              </DialogTrigger>

              <ContextMenuItem>...</ContextMenuItem>
              <ContextMenuItem>...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>...</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>

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
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              disabled={!enableCrop || !selectedImage}
              onComplete={(c) => {
                console.log(c)
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[selectedImage - 1].image}
                alt="Crop selected image"
                className="h-full w-full object-cover"
              />
            </ReactCrop>
          )}
        </div>

        <DialogFooter className="mt-auto flex items-center gap-1.5">
          <Button
            variant="stylish"
            onClick={() => {
              setEnableCrop(false)
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              setEnableCrop(false)
            }}
            className="flex-center gap-1.5"
          >
            <span>Done</span>
            <CropIcon size={19} className="opacity-80" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ReplaceImage() {
  const { setImages, images } = useImageOptions()
  const { selectedImage, setSelectedImage } = useSelectedLayers()

  const { setImagesCheck, imagesCheck } = useColorExtractor()

  const onDrop = async (file: any) => {
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
