'use client'

import useTiptapEditor from '@/hooks/use-editor'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useImageOptions } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { Editor, EditorContent } from '@tiptap/react'
import { useRef, useState } from 'react'
import TiptapMoveable from './TiptapMoveable'
import { BubbleMenu } from '@tiptap/react'
import { useTiptap } from '@/store/use-tiptap'
import { convertHex } from '@/utils/helperFns'

type MenuBarProps = {
  editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <BubbleMenu
        className="bubble-menu"
        tippyOptions={{ duration: 100 }}
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

function TipTapEditor({ content = 'Double click to edit' }) {
  const { setShowTextControls, isEditable, setIsEditable } = useMoveable()
  const { setSelectedText, defaultStyle } = useImageOptions()

  const { editor } = useTiptapEditor()

  return (
    <>
      <div
        onDoubleClick={() => {
          editor?.chain().selectAll().focus()
          setIsEditable(true)
          setShowTextControls(false)
        }}
      >
        <MenuBar editor={editor} />
        <div
          className={`${
            isEditable
              ? 'pointer-events-auto cursor-text'
              : 'pointer-events-none'
          }`}
        >
          <EditorContent style={defaultStyle} editor={editor} />
        </div>
      </div>
    </>
  )
}

export default function TipTap() {
  const textRef = useRef<HTMLDivElement>(null)

  const { showTextControls, setShowTextControls, setIsEditable, isEditable } =
    useMoveable()
  const { texts, selectedText, setSelectedText } = useImageOptions()
  const { setShouldShow } = useTiptap()

  useOnClickOutside(textRef, () => {
    setIsEditable(false)
    useMoveable.setState({ showTextControls: false })
  })

  return (
    <>
      {texts.map((text) => (
        <div
          key={`text-${text.id}`}
          id={`text-${text.id}`}
          ref={text.id === selectedText ? textRef : null}
          className="text apply-font absolute z-[120] flex cursor-pointer items-center justify-center"
          style={{
            fontSize: `${text.style.textSize}rem`,
            fontFamily: `${text.style.fontFamily}`,
            color: `${text.style.textColor}`,
            fontWeight: `${text.style.fontWeight}`,
            textAlign: `${text.style.textAlign}`,
            letterSpacing: `${text.style.letterSpacing}em`,
            filter: `drop-shadow(${text.style.textShadow} ${convertHex(
              text.style.shadowColor,
              text.style.shadowOpacity
            )})`,
          }}
          onClick={() => {
            setShowTextControls(!showTextControls)
            setSelectedText(text.id)
          }}
        >
          <TipTapEditor />
        </div>
      ))}
      {showTextControls && !isEditable && (
        <TiptapMoveable id={`text-${selectedText}`} />
      )}
    </>
  )
}
