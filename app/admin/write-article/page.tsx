import Loader from '@/components/Loader'
import BackButton from '@/components/ui/BackButton'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Write Article',
  description: 'Write an article for the blog.'
}

const BlogForm = dynamic(() => import('./BlogForm'), {
  loading: () => <Loader />,
})

export default function page() {
  return (
    <div className="mx-auto mt-6 h-[100dvh] w-full max-w-prose pt-[72px] lg:mt-8">
      <BackButton />
      <BlogForm />
    </div>
  )
}
