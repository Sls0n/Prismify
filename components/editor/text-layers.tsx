'use client'

import useTiptapEditor from '@/hooks/use-editor'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { convertHexToRgba } from '@/utils/helper-fns'
import { BubbleMenu, Editor, EditorContent } from '@tiptap/react'
import { useRef } from 'react'
import ContextMenuText from './text-context-menu'

type MenuBarProps = {
  editor: Editor | null
}

const BubbleMenuComp = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <BubbleMenu
        className="bubble-menu"
        tippyOptions={{
          duration: 100,
          followCursor: true,
          placement: 'auto-end',
        }}
        editor={editor}
      >
        <button
          onClick={() => {
            const { selection } = editor.state

            if (selection.empty) {
              // When there's no text selection, apply formatting to the entire paragraph
              editor.chain().focus().selectAll().toggleBold().run()
            } else {
              // When text is selected, toggle formatting for the selected text
              editor.chain().focus().toggleBold().run()
            }
          }}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          bold
        </button>
        <button
          onClick={() => {
            const { selection } = editor.state

            if (selection.empty) {
              // When there's no text selection, apply formatting to the entire paragraph
              editor.chain().focus().selectAll().toggleItalic().run()
            } else {
              // When text is selected, toggle formatting for the selected text
              editor.chain().focus().toggleItalic().run()
            }
          }}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          italic
        </button>

        <input
          type="color"
          onInput={(event: any) => {
            editor.chain().focus().setColor(event.target.value).run()
          }}
          value={editor.getAttributes('textStyle').color}
          data-testid="setColor"
        />
      </BubbleMenu>
    </>
  )
}

function TipTapEditor() {
  const { setShowTextControls, isEditable, setIsEditable } = useMoveable()
  const { defaultStyle } = useImageOptions()

  const { editor } = useTiptapEditor()

  return (
    <div
      onDoubleClick={() => {
        editor?.chain().selectAll().focus()
        setIsEditable(true)
        setShowTextControls(false)
      }}
    >
      <BubbleMenuComp editor={editor} />
      <div
        className={`${
          isEditable ? 'pointer-events-auto cursor-text' : 'pointer-events-none'
        }`}
      >
        <EditorContent style={defaultStyle} editor={editor} />
      </div>
    </div>
  )
}

export default function TextLayers() {
  const textRef = useRef<HTMLDivElement>(null)

  const { setShowTextControls, setShowControls } = useMoveable()
  const { texts } = useImageOptions()
  const { selectedText, setSelectedText, setSelectedImage } =
    useSelectedLayers()

  return (
    <>
      {texts.map((text, index) => {
        return (
          <ContextMenuText key={text.id + index}>
            <div
              key={`text-${text.id}`}
              id={`text-${text.id}`}
              ref={text.id === selectedText ? textRef : null}
              className={`text apply-font absolute flex-1 cursor-pointer  ${
                text.content === '' ? 'pointer-events-none hidden' : 'image'
              }`}
              style={{
                fontSize: `${text.style.textSize}rem`,
                fontFamily: `${text.style.fontFamily}`,
                color: `${text.style.textColor}`,
                fontWeight: `${text.style.fontWeight}`,
                textAlign: `${text.style.textAlign}`,
                letterSpacing: `${text.style.letterSpacing}em`,
                filter: `drop-shadow(${
                  text.style.textShadow
                } ${convertHexToRgba(
                  text.style.shadowColor,
                  text.style.shadowOpacity
                )})`,
                lineHeight: '1',
                zIndex: `${text.style.zIndex}`,
              }}
              onContextMenu={() => {
                setShowTextControls(true)
                setSelectedText(text.id)
                setSelectedImage(null)
                setShowControls(false)
              }}
              onClick={() => {
                setShowTextControls(true)
                setSelectedText(text.id)
                setSelectedImage(null)
                setShowControls(false)
              }}
            >
              <TipTapEditor />
            </div>
          </ContextMenuText>
        )
      })}
    </>
  )
}
