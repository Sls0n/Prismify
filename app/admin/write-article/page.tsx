import Loader from '@/components/Loader'
import BackButton from '@/components/ui/BackButton'
import dynamic from 'next/dynamic'

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
