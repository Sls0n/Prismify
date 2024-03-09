/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'
import { toast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'
import { ArrowRight } from 'lucide-react'

type SignInFormProps = {
  authenticated?: boolean
}

export default function SignInForm({ authenticated }: SignInFormProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)

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
      <div className="w-full space-y-4">
        <h1 className="text-center text-4xl font-semibold text-dark sm:font-bold">
          Sign in to{' '}
          <GradientText variant="purple" className="font-bold">
            Prismify
          </GradientText>
        </h1>
        {/* Continue with separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#22262b]" />
          </div>
          <div className="relative flex justify-center rounded-md text-sm">
            <span className="bg-[#121212] px-2 text-dark/60">
              Click on a provider to sign in
            </span>
          </div>
        </div>

        {/* Provider buttons */}
        <div className="flex flex-col gap-y-5 pt-8">
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
      className="group flex items-center gap-5 rounded-md border-[#222]/50 bg-[#181818] px-4 shadow-sm transition-all
      duration-300 ease-in-out hover:border-[#212121] hover:bg-[#191919] hover:shadow-md
      "
      size={'lg'}
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
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
      <span className="text-[0.9rem] text-dark">
        Continue with {provider === 'google' ? 'Google' : 'GitHub'}
      </span>
      <ArrowRight size={16} className="text-dark/50" />
    </Button>
  )
}
