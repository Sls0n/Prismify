'use client'

import { useRef } from 'react'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapMoveable from './TiptapMoveable'
import { useMoveable } from '@/store/use-moveable'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useImageOptions } from '@/store/use-image-options'

type MenuBarProps = {
  editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <>
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
    </>
  )
}

function TipTapEditor({ content = 'Double click to edit' }) {
  const { setShowTextControls, isEditable, setIsEditable } = useMoveable()
  const { setSelectedText, defaultStyle } = useImageOptions()

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
  })

  return (
    <>
      {/* <MenuBar editor={editor} /> */}
      <div
        onDoubleClick={() => {
          editor?.chain().selectAll().focus()
          setIsEditable(true)
          setShowTextControls(false)
        }}
      >
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
  useOnClickOutside(textRef, () => {
    setIsEditable(false)
    useMoveable.setState({ showTextControls: false })
  })

  console.log(texts)

  return (
    <>
      {texts.map((text) => (
        <div
          key={`text-${text.id}`}
          id={`text-${text.id}`}
          ref={text.id === selectedText ? textRef : null}
          className="absolute z-[120] flex cursor-pointer items-center justify-center apply-font"
          style={{
            fontSize: `${text.style.textSize}rem`,
            fontFamily: `${text.style.fontFamily}`,
            color: `${text.style.textColor}`,
            fontWeight: `${text.style.fontWeight}`,
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
