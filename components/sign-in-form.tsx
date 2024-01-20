/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'
import { toast } from '@/hooks/use-toast'
import { useAuthModal } from '@/store/use-auth-modal'
import { cn } from '@/utils/button-utils'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormField } from './ui/form-field'
import {
  RegisterInput,
  RegisterSchema,
} from '@/libs/validators/register-form-validator'
import { zodResolver } from '@hookform/resolvers/zod'

type SignInFormProps = {
  authenticated?: boolean
}

type LoginInput = Omit<RegisterInput, 'username'>

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
  } = useForm<LoginInput>({
    resolver: zodResolver(RegisterSchema.pick({ email: true, password: true })),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signinFormFields = [
    { id: 'email', type: 'email', label: 'Email address' },
    {
      id: 'password',
      type: showPassword ? 'text' : 'password',
      label: 'Password',
    },
  ]

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
        <h1 className="text-center text-4xl font-semibold text-dark sm:font-bold">
          Sign in to{' '}
          <GradientText variant="purple" className="font-bold">
            Prismify
          </GradientText>
        </h1>
        <form onSubmit={handleSubmit(loginUser)} className="space-y-8">
          {signinFormFields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              register={register}
              error={errors[field.id as 'email' | 'password']}
              showPassword={field.id === 'password' ? showPassword : undefined}
              toggleShowPassword={
                field.id === 'password'
                  ? () => setShowPassword(!showPassword)
                  : undefined
              }
            />
          ))}

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

          {/* Continue with separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#22262b]" />
            </div>
            <div className="relative flex justify-center rounded-md text-sm">
              <span className="bg-[#121212] px-2 text-dark/80">
                Or continue with
              </span>
            </div>
          </div>

          {/* Provider buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <ProviderButton
              provider="google"
              isLoading={isGoogleLoading}
              onClick={() => signInWithProvider('google')}
            />
            <ProviderButton
              provider="github"
              isLoading={isGithubLoading}
              onClick={() => signInWithProvider('github')}
            />
          </div>

          {/* Sign in message */}
          <Button
            onClick={() => {
              setShow('signup')
            }}
            variant="noHoverGhost"
            className="mx-auto mt-3 w-full max-w-full text-center text-sm"
          >
            <span className='text-dark/80'>Dont have an account?</span>
            <p className="ml-0.5 font-semibold text-purple hover:text-purple/90 hover:underline">
              Sign up
            </p>
          </Button>
        </form>
      </div>
    </div>
  )
}

const ProviderButton = ({
  provider,
  isLoading,
  onClick,
}: {
  provider: 'google' | 'github'
  isLoading: boolean
  onClick: () => void
}) => {
  return (
    <Button
      variant="outline"
      className="rounded-md bg-formDark px-4 py-2 shadow-sm"
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="sr-only">Sign in with {provider}</span>
      <img
        className="h-5 w-5"
        src={
          provider === 'google'
            ? `https://img.icons8.com/color/48/000000/google-logo.png`
            : `https://img.icons8.com/fluency/48/000000/github.png`
        }
        alt={`${provider} logo`}
        loading="lazy"
      />
    </Button>
  )
}
