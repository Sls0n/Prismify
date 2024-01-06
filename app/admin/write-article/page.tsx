import BackButton from '@/components/ui/BackButton'
import BlogForm from './BlogForm'

export default function page() {
  return (
    <div className="mx-auto h-[100dvh] w-full max-w-prose pt-[72px] mt-6 lg:mt-8">
      <BackButton />
      <BlogForm />
    </div>
  )
}
