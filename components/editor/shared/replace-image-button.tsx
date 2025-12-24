'use client'

import { useColorExtractor } from '@/store/use-color-extractor'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { ImagePlus } from 'lucide-react'
import { ChangeEvent } from 'react'

export default function ReplaceImageButton() {
  const { setImages, images } = useImageOptions()
  const { selectedImage } = useSelectedLayers()
  const { setImagesCheck, imagesCheck } = useColorExtractor()

  const onDrop = async (file: File | undefined) => {
    if (!file) return

    const analyze = (await import('rgbaster')).default
    const imageUrl = URL.createObjectURL(file)

    const result = await analyze(imageUrl, { scale: 0.3 })
    const extractedColors = result.slice(0, 12)

    if (selectedImage) {
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                image: imageUrl,
                extractedColors,
              }
            : image
        )
      )
    }

    setImagesCheck([...imagesCheck, imageUrl])
  }

  return (
    <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
      <label className="ml-6 cursor-pointer" htmlFor="file-replace">
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
