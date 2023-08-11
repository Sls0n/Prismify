'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from './ui/Button'
import { cn } from '@/utils/buttonUtils'
import Checkbox from '@/components/ui/Checkbox'
import axios, { AxiosError } from 'axios'
import { RegisterInput } from '@/libs/validators/registerFormValidator'
import { RegisterSchema } from '@/libs/validators/registerFormValidator'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

type SignUpProps = {
  authenticated?: boolean
}

export default function SignUp({ authenticated }: SignUpProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const signupUser = async (data: RegisterInput) => {
    try {
      setLoading(true)
      await axios.post('/api/register', data)

      toast({
        title: 'Account successfully created',
        description: 'Wait while we sign you in...',
      })

      await signIn('credentials', {
        email: data.email,
        password: data.password,
      })

      router.push('/')
    } catch (err: any) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: 'User already exists',
            description: 'Please try with a different email.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          toast({
            title: 'Invalid credentials',
            description: 'Please try with a different email or password.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 500) {
          toast({
            title: 'Something went wrong',
            description: 'Please try again later.',
            variant: 'destructive',
          })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (authenticated) return null

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md space-y-10 p-6">
        <div>
          <h1 className="text-center text-4xl font-semibold text-gray-800 dark:text-dark sm:font-bold">
            Sign up on{' '}
            <span className="bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-transparent ">
              Prismify
            </span>
          </h1>
        </div>
        <form onSubmit={handleSubmit(signupUser)} className="space-y-8">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-slate-700 dark:text-dark/70"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                className="h-11 w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#8e8ece] focus:outline-none  focus:ring-1 focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-formDark dark:text-gray-100 md:text-sm"
                {...register('username')}
              />
            </div>
            {errors?.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
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
                {...register('email')}
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
                {...register('password')}
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
            <div className="mb-8 mt-4 flex gap-3 text-start text-sm text-primary">
              <Checkbox />
              <p className="-translate-x-1 dark:text-dark/80">
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
              </p>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className={cn(
                'flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-medium'
              )}
              size={'lg'}
            >
              Sign up
            </Button>
          </div>

          <p className="mt-2 text-center text-sm text-primary dark:text-dark/80">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-purple hover:text-purple/90 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
