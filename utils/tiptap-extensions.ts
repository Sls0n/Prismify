import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Underline } from '@tiptap/extension-underline'
import { Link } from '@tiptap/extension-link'

export const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline.configure({
    HTMLAttributes: {
      class: 'my-custom-class',
    },
  }),
  Link.configure({
    // openOnClick: true,
    linkOnPaste: true,
    HTMLAttributes: {
      rel: 'scholarly',
    },
  }),
  Image,
]