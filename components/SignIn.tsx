/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from './ui/Button'
import { cn } from '@/utils/buttonUtils'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type SignInProps = {
  authenticated?: boolean
}

export default function SignIn({ authenticated }: SignInProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginUser = (data: { email: string; password: string }) => {
    setLoading(true)

    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((callback) => {
      setLoading(false)

      if (callback?.ok) {
        toast({
          title: 'Successfully logged in',
        })
        router.refresh()
      }

      if (callback?.error) {
        toast({
          variant: 'destructive',
          description: callback.error,
        })
      }
    })
  }

  if (authenticated) return null

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md space-y-10 p-6">
        <div>
          <h1 className="text-center text-4xl font-semibold text-gray-800 dark:text-dark sm:font-bold">
            Sign in to{' '}
            <span className="bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-transparent ">
              Prismify
            </span>
          </h1>
        </div>
        <form onSubmit={handleSubmit(loginUser)} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 dark:text-dark/70"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                className="h-11 w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#8e8ece] focus:outline-none  focus:ring-1 focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm"
                {...register('email', {
                  required: { value: true, message: 'Email is required' },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>
            {errors?.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 dark:text-dark/70"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="h-11 w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#8e8ece] focus:outline-none  focus:ring-1 focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm"
                {...register('password', {
                  required: { value: true, message: 'Password is required' },
                })}
              />
              <button
                aria-label="Show password"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center pr-3 text-sm text-gray-700 dark:text-dark/70"
              >
                {showPassword ? (
                  <>
                    <EyeOff
                      size={19}
                      className="text-gray-600 dark:text-dark/70"
                    />
                    <span className="sr-only">Hide password</span>
                  </>
                ) : (
                  <>
                    <Eye
                      size={19}
                      className="text-gray-600 dark:text-dark/70"
                    />
                    <span className="sr-only">Show password</span>
                  </>
                )}
              </button>
            </div>
            {errors?.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              isLoading={loading}
              className={cn(
                'flex w-full items-center justify-center rounded-md bg-gray-200 px-4 py-3 text-sm font-medium'
              )}
              size={'lg'}
            >
              Sign in
            </Button>
          </div>

          {/* Continue with separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-[#22262b]" />
            </div>
            <div className="relative rounded-md flex justify-center text-sm">
              <span className="bg-primary px-2 text-primary dark:bg-dark dark:text-dark/80">
                Or continue with
              </span>
            </div>
          </div>

          {/* Provider buttons */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:bg-formDark dark:ring-[#22262b]">
                <span className="sr-only">Sign in with Facebook</span>
                <img
                  className="h-5 w-5"
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook logo"
                />
              </button>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  signIn('google')
                }}
                className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:bg-formDark dark:ring-[#22262b]"
              >
                <span className="sr-only">Sign in with Google</span>
                <img
                  className="h-5 w-5"
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="github"
                />
              </button>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  signIn('github')
                }}
                className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:bg-formDark dark:ring-[#22262b]"
              >
                <span className="sr-only">Sign in with GitHub</span>
                <img
                  className="h-5 w-5"
                  src="https://img.icons8.com/fluency/48/000000/github.png"
                  alt="github"
                />
              </button>
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-dark/80">
            Dont have an account?{' '}
            <Link
              href="/sign-up"
              className="font-medium text-purple hover:text-purple/90 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
