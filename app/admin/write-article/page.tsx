import Loader from '@/components/loader'
import BackButton from '@/components/ui/back-button'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Write Article',
  description: 'Write an article for the blog.',
}

const BlogForm = dynamic(() => import('./blog-form'), {
  loading: () => <Loader />,
})

export default function page() {
  return (
    <section className="mx-auto mt-6 h-[100dvh] w-full max-w-prose pt-[72px] lg:mt-8">
      <BackButton />
      <BlogForm />
    </section>
  )
}
