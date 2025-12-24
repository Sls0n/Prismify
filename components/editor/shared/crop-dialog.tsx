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
import { CropIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const DynamicCropComponent = dynamic(() =>
  import('react-image-crop').then((mod) => mod.ReactCrop)
)

export default function CropDialog() {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })
  const imgRef = useRef<HTMLImageElement>(null)
  const { setImages, images } = useImageOptions()
  const { selectedImage, setEnableCrop, enableCrop } = useSelectedLayers()

  const cropImageNow = () => {
    const canvas = document.createElement('canvas')
    const image = imgRef.current
    if (!image) return

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

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
    if (selectedImage) {
      setImages(
        images.map((img, index) =>
          index === selectedImage - 1
            ? { ...img, image: base64Image }
            : img
        )
      )
    }
  }

  return (
    <Dialog
      open={enableCrop}
      onOpenChange={(open) => {
        setEnableCrop(open)
      }}
    >
      <DialogContent className="flex h-fit max-h-[95vh] w-1/2 flex-col gap-4">
        <DialogHeader className="mb-4">
          <DialogTitle>Crop image</DialogTitle>
        </DialogHeader>

        <div className="mb-4 h-full w-full flex-1 overflow-hidden overflow-y-auto">
          {selectedImage && (
            <DynamicCropComponent
              crop={crop}
              onChange={(c) => setCrop(c)}
              disabled={!enableCrop || !selectedImage}
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
            onClick={() => setEnableCrop(false)}
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
    </Dialog>
  )
}
