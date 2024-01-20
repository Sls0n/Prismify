/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from './ui/button'
import { cn } from '@/utils/button-utils'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useAuthModal } from '@/store/use-auth-modal'

type SignInFormProps = {
  authenticated?: boolean
}

export default function SignInForm({ authenticated }: SignInFormProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)
  const { setShow } = useAuthModal()

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

  const signInWithProvider = (provider: 'google' | 'github') => {
    provider === 'google' ? setIsGoogleLoading(true) : setIsGithubLoading(true)
    signIn(provider, {
      callbackUrl: '/',
    })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
        toast({
          variant: 'destructive',
          title: 'Trouble signing in!',
          description: err.message ?? 'Something went wrong',
        })
      })
      .finally(() => {
        setIsGoogleLoading(false)
        setIsGithubLoading(false)
      })
  }

  if (authenticated) return null

  return (
    <div className="flex items-center justify-center">
      <div className="w-full space-y-10 ">
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
                className="h-11 w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 focus:border-[#8e8ece] focus:outline-none focus:ring-1  focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm"
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
                className="h-11 w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 focus:border-[#8e8ece] focus:outline-none  focus:ring-1 focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm"
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
                'flex w-full items-center justify-center rounded-md px-4 py-3 text-[0.9rem] font-semibold'
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
            <div className="relative flex justify-center rounded-md text-sm">
              <span className="bg-primary px-2 text-primary dark:bg-[#121212] dark:text-dark/80">
                Or continue with
              </span>
            </div>
          </div>

          {/* Provider buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="rounded-md bg-formDark px-4 py-2 shadow-sm"
              type="button"
              onClick={() => {
                signInWithProvider('google')
              }}
              disabled={isGoogleLoading}
            >
              <span className="sr-only">Sign in with Google</span>
              <img
                className="h-5 w-5"
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google logo"
                loading="lazy"
              />
            </Button>

            <Button
              variant="outline"
              className={`rounded-md bg-formDark px-4 py-2 shadow-sm `}
              type="button"
              onClick={() => {
                signInWithProvider('github')
              }}
              disabled={isGithubLoading}
            >
              <span className="sr-only">Sign in with Github</span>
              <img
                className={`h-5 w-5 `}
                src="https://img.icons8.com/fluency/48/000000/github.png"
                alt="Github logo"
                loading="lazy"
              />
            </Button>
          </div>

          <Button
            onClick={() => {
              setShow('signup')
            }}
            variant="noHoverGhost"
            className="mx-auto mt-3 w-full max-w-full text-center  text-sm text-gray-600 dark:text-dark/80"
          >
            Dont have an account?{' '}
            <p className="ml-0.5 font-semibold text-purple hover:text-purple/90 hover:underline">
              Sign up
            </p>
          </Button>
        </form>
      </div>
    </div>
  )
}
