import SignIn from '@/components/SignIn'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in — Prismify',
  description: 'Sign in to Prismify with your account.',
}

export default function SignInPage() {
  return (
    <>
      <div className="mt-4">
        <SignIn />
      </div>
    </>
  )
}
