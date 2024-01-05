'use client'

import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import {
  Bold,
  Code,
  Heading,
  ImagePlus,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Space,
  Strikethrough,
  Underline,
} from 'lucide-react'
import { useCallback, useState } from 'react'
// import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/utils/buttonUtils'
import { extensions } from '@/utils/tiptap-extensions'
// import { useEditorOutput } from '@/store/use-editor-output'
import { Text } from '@/components/ui/Text'

export default function BlogForm() {
  // const { jsonOutput } = useEditorOutput()
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [mainBlogImg, setMainBlogImg] = useState<string>('')

  return (
    <>
      <div className="mb-8 mt-8 space-y-6 border-border bg-[#151515] lg:rounded-lg lg:border-[1.5px] lg:p-8">
        <div className="space-y-2">
          <Text className="text-dark/90" variant="bodyLarge" semibold>
            Title
          </Text>

          <Input
            placeholder="Write title for your blog..."
            className="h-16 border-transparent bg-[#151515] p-0 placeholder:text-dark/50 focus-visible:ring-0 focus-visible:ring-transparent md:text-xl "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Text className="text-dark/90" variant="bodyLarge" semibold>
            Author (Optional)
          </Text>

          <Input
            placeholder="Author's name..."
            className="h-16 border-transparent bg-transparent p-0 placeholder:text-dark/50 focus-visible:ring-transparent md:text-xl"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={50}
          />
        </div>
      </div>

      <div className="mb-8 mt-4 w-full space-y-6 border-border bg-[#151515] lg:rounded-lg lg:border-[1.5px] lg:p-8">
        <div className="w-full ">
          <Text variant="bodyXLarge" className="pb-4 text-dark/90" semibold>
            Write your blog here
          </Text>

          <hr className="border-border pb-4 lg:-mx-8" />

          <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            editorProps={{
              attributes: {
                class:
                  'prose prose-md max-w-prose mx-auto prose-neutral mb-16 md:prose-lg prose-img:rounded-md focus:outline-none min-h-[30rem] dark:prose-invert',
              },
            }}
          >
            {/*  */}
          </EditorProvider>
        </div>
      </div>

      {/* <div className="mb-8 mt-4 w-full space-y-6 border-border bg-white lg:max-w-[60%] lg:rounded-lg lg:border-[1.5px] lg:p-8">
        <div className="space-y-4">
          <Text variant="bodyXLarge" bold>
            Main Image
          </Text>
          <FileUpload
            endpoint="blogImage"
            onChange={(imgUrl) => {
              if (imgUrl) setMainBlogImg(imgUrl)
            }}
            value={mainBlogImg}
          />
        </div>
      </div> */}

      <Button
        // isLoading={isPublishing}
        // onClick={publishBlogHandler}
        variant="default"
        className="mb-24 max-w-[10rem]"
      >
        <Text variant="bodyMedium" semibold>
          Publish blog
        </Text>
      </Button>
    </>
  )
}

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  // const { setJsonOutput, setHtmlOutput } = useEditorOutput()

  // useEffect(() => {
  //   setJsonOutput(editor?.getJSON() ?? {})
  //   setHtmlOutput(editor?.getHTML() ?? '')
  // }, [editor?.state, setHtmlOutput, setJsonOutput])

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href as string
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="sticky top-[4.5rem] z-50 bg-[#151515]">
      <div className="z-50 mx-auto flex max-w-prose flex-wrap gap-y-4 bg-[#151515] px-8 pb-5 pt-2 backdrop-blur-md">
        <Button
          variant="menuItem"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor?.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            editor?.isActive('heading', { level: 3 })
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : 'border border-transparent',
            'mr-2 px-2.5 text-foreground/80 '
          )}
        >
          <Heading className="h-5 w-5" />
        </Button>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          className={cn(
            editor?.isActive('bold')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : 'border border-transparent',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <Bold className="h-5 w-5" />
        </Button>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          className={cn(
            editor?.isActive('italic')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : 'border border-transparent',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <Italic className="h-5 w-5" />
        </Button>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          disabled={!editor?.can().chain().focus().toggleUnderline().run()}
          className={cn(
            editor?.isActive('underline')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : 'border border-transparent',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <Underline className="h-5 w-5" />
        </Button>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          className={cn(
            editor?.isActive('strike')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : 'border border-transparent',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <Strikethrough className="h-5 w-5" />
        </Button>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
          className={cn(
            editor?.isActive('codeBlock')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : 'border border-transparent',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <Code className="h-5 w-5" />
        </Button>

        <div className="my-auto ml-2 mr-4 h-[1.5rem] w-[1.5px] bg-[#fff]/10"></div>

        <Button
          className="mr-2 px-2.5 text-foreground/80"
          variant="menuItem"
          onClick={addImage}
        >
          <ImagePlus className="h-5 w-5" />
        </Button>

        <Button
          variant="menuItem"
          onClick={() => {
            editor?.isActive('link')
              ? editor?.chain().focus().unsetLink().run()
              : setLink()
          }}
          className={cn(
            editor?.isActive('link')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : '',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <Link className="h-5 w-5" />
        </Button>

        <div className="my-auto ml-2 mr-4 h-[1.5rem] w-[1.5px] bg-[#fff]/10"></div>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor?.can().chain().focus().toggleBulletList().run()}
          className={cn(
            editor?.isActive('bulletList')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : '',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <List className="h-5 w-5" />
        </Button>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
          className={cn(
            editor?.isActive('orderedList')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : '',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <ListOrdered className="h-5 w-5" />
        </Button>

        <div className="my-auto ml-2 mr-4 h-[1.5rem] w-[1.5px] bg-[#fff]/10"></div>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
          className={cn(
            editor?.isActive('blockquote')
              ? 'border border-indigo-400/10 bg-indigo-400/10'
              : '',
            'mr-2 px-2.5 text-foreground/80'
          )}
        >
          <Quote className="h-5 w-5" />
        </Button>

        <Button
          variant="menuItem"
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          className={cn('mr-2 px-2.5 text-foreground/80')}
        >
          <Space className="h-5 w-5" />
        </Button>
      </div>
      <hr className="-mx-8 border-border pb-10" />
    </div>
  )
}
