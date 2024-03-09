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
import { useCallback, useEffect, useState } from 'react'
// import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/button-utils'
import { extensions } from '@/utils/tiptap-extensions'
import { useMutation } from '@tanstack/react-query'
import { Text } from '@/components/ui/text'
import { useTiptap } from '@/store/use-tiptap'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/text-area'

export default function BlogForm() {
  const [blogOutput, setBlogOutput] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [mainBlogImg, setMainBlogImg] = useState<string>('')

  const { mutate: publishBlog, isLoading: isPublishing } = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/api/article/post', {
        title,
        summary,
        category,
        slug,
        imageUrl: mainBlogImg,
        content: blogOutput,
      })

      return res
    },
    onSuccess: () => {
      toast({
        title: 'Blog published successfully',
      })
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          toast({
            title: err?.response?.data?.[0]?.message,
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          toast({
            title: 'You are not authorized to publish this blog',
            description: 'Please login to publish this blog',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 409) {
          toast({
            title: 'Blog with this slug already exists',
            description: 'Please modify the slug a bit.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 500) {
          toast({
            title: 'Something went wrong',
            description: 'Please try again later',
            variant: 'destructive',
          })
        }
      }
      console.log(err)
    },
  })

  const publishBlogHandler = () => {
    publishBlog()
  }

  const slugifyTitle = async (title: string) => {
    const slugify = (await import('slugify')).default
    setSlug(slugify(title, { lower: true, strict: true }))
  }

  return (
    <>
      <div className="mb-8 mt-8 space-y-6 rounded-lg border-[1.5px] border-border bg-[#151515] p-8">
        <div className="space-y-2">
          <Text className="text-dark/90" variant="bodyLarge" semibold>
            Title
          </Text>

          <Input
            placeholder="Write title for your blog..."
            className="h-16 border-transparent bg-[#151515] p-0 placeholder:text-dark/50 focus-visible:ring-0 focus-visible:ring-transparent md:text-xl "
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              slugifyTitle(e.target.value)
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Text className="text-dark/90" variant="bodyLarge" semibold>
            Summary
          </Text>

          <Textarea
            placeholder="Summary of the blog..."
            className="bg-transparent h-32 placeholder:text-dark/50 focus-visible:ring-transparent md:text-xl"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Text className="text-dark/90" variant="bodyLarge" semibold>
            Category (Comma separated)
          </Text>

          <Input
            placeholder="Eg: Design, Marketing"
            className="h-16 border-transparent bg-transparent p-0 placeholder:text-dark/50 focus-visible:ring-transparent md:text-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Text className="text-dark/90" variant="bodyLarge" semibold>
            Slug
          </Text>

          <Input
            placeholder="Eg: blog-title-slug"
            className="h-16 border-transparent bg-transparent p-0 placeholder:text-dark/50 focus-visible:ring-transparent md:text-xl"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Text className="text-dark/90" variant="bodyLarge" semibold>
            Image URL
          </Text>

          <Input
            placeholder="Eg: https://images.unsplash.com/photo/..."
            className="h-16 border-transparent bg-transparent p-0 placeholder:text-dark/50 focus-visible:ring-transparent md:text-xl"
            value={mainBlogImg}
            onChange={(e) => setMainBlogImg(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-8 mt-4 w-full space-y-6 rounded-lg border-[1.5px] border-border bg-[#151515] p-8">
        <div className="w-full ">
          <Text variant="bodyXLarge" className="pb-4 text-dark/90" semibold>
            Write your blog here
          </Text>

          <hr className="-mx-8 border-border pb-4" />

          {/* @ts-expect-error children missing error */}
          <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            parseOptions={{
              preserveWhitespace: true,
            }}
            editorProps={{
              attributes: {
                class:
                  'prose prose-md max-w-prose mx-auto prose-neutral mb-16 md:prose-lg prose-img:rounded-md focus:outline-none min-h-[30rem] dark:prose-invert',
              },
            }}
            onUpdate={(content) =>
              setBlogOutput( content?.editor?.getHTML())
            }
          />
        </div>
      </div>

      <Button
        isLoading={isPublishing}
        onClick={publishBlogHandler}
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
      <div className="z-50 flex flex-wrap gap-y-4 bg-[#151515] pb-5 pt-2 backdrop-blur-md">
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
