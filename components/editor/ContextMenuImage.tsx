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
import { BringToFront, Crop, SendToBack, Trash } from 'lucide-react'
import React from 'react'

export default function ContextMenuImage({
  children,
}: {
  children: React.ReactNode
}) {
  const { setImages, images, selectedImage } = useImageOptions()

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
