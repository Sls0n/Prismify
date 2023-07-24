import { Metadata } from 'next'
import SignUp from '@/components/SignUp'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign up — Prismify',
  description: 'Create a Prismify account.',
}

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return (
    <>
      <div className="mt-16">
        <SignUp authenticated={!!session} />
      </div>
    </>
  )
}
