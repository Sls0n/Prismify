'use client'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { DialogTrigger } from '@/components/ui/dialog'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import {
  BringToFront,
  CropIcon,
  SendToBack,
  Trash,
  Wand,
} from 'lucide-react'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import CropDialog from './shared/crop-dialog'
import BackgroundRemovalDialog from './shared/background-removal-dialog'
import ReplaceImageButton from './shared/replace-image-button'

export default function ContextMenuImage({
  children,
}: {
  children: React.ReactNode
}) {
  const { setImages, images, updateImageStyle } = useImageOptions()
  const { selectedImage, setSelectedImage } = useSelectedLayers()
  const { showControls, setShowControls } = useMoveable()
  const [isBgRemovalDialogOpen, setIsBgRemovalDialogOpen] = useState(false)

  const handleImageDelete = () => {
    if (!selectedImage) return

    if (images.length === 1) {
      setImages([])
    } else {
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? { ...image, image: '' }
            : image
        )
      )
    }
    setSelectedImage(null)
  }

  const bringToFrontOrBack = (direction: 'front' | 'back') => {
    if (!selectedImage) return

    const currentZIndex = images[selectedImage - 1]?.style.zIndex ?? 2
    const newZIndex = direction === 'front' ? currentZIndex + 1 : currentZIndex - 1
    updateImageStyle(selectedImage, { zIndex: newZIndex })
  }

  useHotkeys(['Delete', 'Backspace'], () => {
    if (selectedImage && showControls) {
      handleImageDelete()
      setShowControls(false)
    }
  })

  return (
    <>
      <CropDialog />
      <BackgroundRemovalDialog
        open={isBgRemovalDialogOpen}
        onOpenChange={setIsBgRemovalDialogOpen}
      />

      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={() => bringToFrontOrBack('back')}>
            Send back
            <ContextMenuShortcut>
              <BringToFront size={19} className="opacity-80" />
            </ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem inset onClick={() => bringToFrontOrBack('front')}>
            Bring forward
            <ContextMenuShortcut>
              <SendToBack size={19} className="opacity-80" />
            </ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ReplaceImageButton />

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

          <ContextMenuSeparator />

          <ContextMenuItem
            inset
            onClick={handleImageDelete}
            className="text-[#F46567]/70 focus:text-[#f46567]/80"
          >
            Delete
            <ContextMenuShortcut>
              <Trash size={19} className="text-[#F46567]/70 opacity-80" />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}
