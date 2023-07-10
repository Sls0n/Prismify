'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Input from './form/Input'
import { Button } from './ui/Button'
import { cn } from '@/utils/buttonUtils'
import Checkbox from '@/components/ui/Checkbox'

export default function SignUp() {
  const [data, setData] = useState({ email: '', password: '', username: '' })

  const router = useRouter()

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md space-y-10 p-6">
        <div>
          <h1 className="text-center text-4xl font-semibold text-gray-800 dark:text-dark sm:font-bold">
            Sign up on{' '}
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-transparent "
            >
              Prismify
            </button>
          </h1>
        </div>
        <form onSubmit={loginUser} className="space-y-8">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-dark/70"
            >
              Username
            </label>
            <div className="mt-2">
              <Input
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                id="username"
                name="username"
                type="username"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-dark/70"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-dark/70"
            >
              Password
            </label>
            <div className="mt-2">
              <Input
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
          </div>
          <div>
            <p className="mb-8 mt-4 flex gap-3 text-start text-sm text-primary">
              <Checkbox />
              <span className="dark:text-dark/80">
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="font-medium text-purple underline underline-offset-2  hover:text-purple/90"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-purple underline underline-offset-2 hover:text-purple/90"
                >
                  Privacy Policy
                </Link>
              </span>
            </p>

            <Button
              className={cn(
                'flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-medium'
              )}
              size={'lg'}
              onClick={() => {}}
            >
              Sign up
            </Button>
          </div>

          <p className="mt-2 text-center text-sm text-primary dark:text-dark/80">
            Already have an account?{' '}
            <a
              href="/sign-in"
              className="font-medium text-purple hover:text-purple/90 hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
