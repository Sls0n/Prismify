import dynamic from 'next/dynamic'
import BackButton from '@/components/ui/back-button'
import Loader from '@/components/loader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Notifications',
  description: 'Send push notifications to users',
}

const Form = dynamic(() => import('./notification-form'), {
  loading: () => <Loader />,
})

export default function Page() {
  return (
    <section className="mx-auto mt-6 h-[100dvh] w-full max-w-prose pt-[72px] lg:mt-8">
      <BackButton />
      <Form />
    </section>
  )
}
