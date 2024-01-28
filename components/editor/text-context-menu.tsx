import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { BringToFront, SendToBack, Trash } from 'lucide-react'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function ContextMenuText({
  children,
}: {
  children: React.ReactNode
}) {
  const { setTexts, texts } = useImageOptions()
  const { selectedText, setSelectedText } = useSelectedLayers()
  const { showTextControls, setShowTextControls } = useMoveable()

  const handleTextDelete = (id: number) => {
    if (texts.length === 1) {
      setTexts([])
      return
    }
    selectedText &&
    setTexts(
      texts.map((text, index) =>
        index === selectedText - 1
          ? {
              ...text,
              content: '',
              text: '',
            }
          : text
      )
    )
  }

  const bringToFrontOrBack = (direction: 'front' | 'back') => {
    if (selectedText) {
      setTexts(
        texts.map((text, index) =>
          index === selectedText - 1
            ? {
                ...text,
                style: {
                  ...text.style,
                  zIndex:
                    direction === 'front'
                      ? text.style.zIndex + 1
                      : text.style.zIndex - 1,
                },
              }
            : text
        )
      )
    }
  }

  useHotkeys('Delete', () => {
    if (showTextControls && selectedText) {
      handleTextDelete(selectedText)
      setShowTextControls(false)
    }
  })

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          inset
          onClick={() => {
            bringToFrontOrBack('back')
          }}
          // disabled={!selectedText || texts[selectedText - 1].style.zIndex === 2}
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
          // disabled={
          // TODO:
          //   // !selectedText ||
          //   // texts[selectedText - 1].style.zIndex === texts.length
          //   // do disbaled by adding length of both images and texts and check
          // }
        >
          Bring forward
          <ContextMenuShortcut>
            <SendToBack size={19} className="opacity-80" />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />
        <ContextMenuItem
          inset
          onClick={() => {
            if (selectedText) {
              handleTextDelete(selectedText)
              setShowTextControls(false)
            }
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
