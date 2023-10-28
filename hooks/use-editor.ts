import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

export default function useTiptapEditor() {
  const editor = useEditor({
    extensions: [StarterKit, Color, TextStyle],
    content: 'Double click to edit',
  })

  return { editor }
}
