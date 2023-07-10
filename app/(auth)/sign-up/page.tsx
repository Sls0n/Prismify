import SignUp from '@/components/SignUp'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up — Prismify',
  description: 'Create a Prismify account.',
}

export default function SignUpPage() {
  return (
    <>
      <div className="mt-4">
        <SignUp />
      </div>
    </>
  )
}
