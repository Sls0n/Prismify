import SignIn from '@/components/SignIn'
import { Metadata } from 'next'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign in — Prismify',
  description: 'Sign in to Prismify with your account.',
}

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return (
    <>
      <div className="mt-4">
        <SignIn authenticated={!!session} />
      </div>
    </>
  )
}
