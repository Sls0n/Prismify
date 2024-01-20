'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { GradientText } from '@/components/ui/gradient-text'
import { toast } from '@/hooks/use-toast'
import {
  RegisterInput,
  RegisterSchema,
} from '@/libs/validators/register-form-validator'
import { useAuthModal } from '@/store/use-auth-modal'
import { cn } from '@/utils/button-utils'
import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'

type SignUpFormProps = {
  authenticated?: boolean
}

export default function SignUpForm({ authenticated }: SignUpFormProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { setShow } = useAuthModal()

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

  const signupFormFields = [
    { id: 'username', type: 'text', label: 'Username' },
    { id: 'email', type: 'email', label: 'Email address' },
    {
      id: 'password',
      type: showPassword ? 'text' : 'password',
      label: 'Password',
    },
  ]

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
    } catch (err) {
      if (err instanceof AxiosError) {
        const { status } = err.response || {}

        switch (status) {
          case 409:
            toast({
              title: 'User already exists',
              description: 'Please try with a different email.',
              variant: 'destructive',
            })
            break
          case 401:
            toast({
              title: 'Invalid credentials',
              description: 'Please try with a different email or password.',
              variant: 'destructive',
            })
            break
          default:
            toast({
              title: 'Something went wrong',
              description: 'Please try again later.',
              variant: 'destructive',
            })
            break
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (authenticated) return null

  return (
    <div className="flex items-center justify-center">
      <div className="w-full space-y-10">
        <h1 className="text-center text-4xl font-semibold text-dark sm:font-bold">
          Sign up on <GradientText variant="purple" className='font-bold'>Prismify</GradientText>
        </h1>
        <form onSubmit={handleSubmit(signupUser)} className="space-y-8">
          {signupFormFields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              register={register}
              error={errors[field.id as 'username' | 'email' | 'password']}
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
            Register
          </Button>

          <Button
            onClick={() => {
              setShow('signin')
            }}
            variant="noHoverGhost"
            className="mx-auto mt-3 w-full max-w-full text-center text-sm"
          >
           <span className='text-dark/80'>Already have an account?</span>
            <p className="ml-0.5 font-semibold text-purple hover:text-purple/90 hover:underline">
              Sign in
            </p>
          </Button>
        </form>
      </div>
    </div>
  )
}
