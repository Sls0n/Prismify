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
import { useImageOptions } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { BringToFront, Crop, ImagePlus, SendToBack, Trash } from 'lucide-react'
import React, { ChangeEvent } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import analyze from 'rgbaster'

export default function ContextMenuImage({
  children,
}: {
  children: React.ReactNode
}) {
  const { setImages, images, selectedImage, setSelectedImage } =
    useImageOptions()
  const { showControls, setShowControls } = useMoveable()

  const handleImageDelete = (id: number) => {
    // const newImages = images.filter((image) => image.id !== id)
    // setImages(newImages)

    if (images.length === 1) {
      setImages([])
      return
    }
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

  useHotkeys('Delete', () => {
    if (showControls) {
      handleImageDelete(selectedImage)
      setShowControls(false)
    }
  })

  return (
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
            <ContextMenuItem>
              Crop
              <ContextMenuShortcut>
                <Crop size={19} className="opacity-80" />
              </ContextMenuShortcut>
            </ContextMenuItem>
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
            handleImageDelete(selectedImage)
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
  )
}

function ReplaceImage() {
  const { setImages, images, selectedImage, setSelectedImage } =
    useImageOptions()
  const { setImagesCheck, imagesCheck } = useColorExtractor()

  const onDrop = async (file: any) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file)

      const result = await analyze(imageUrl, {
        scale: 0.3,
      })
      const extractedColors = result.slice(0, 12)

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
    <div className='data-[disabled]:opacity-50 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none'>
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
