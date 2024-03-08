'use client'

/* eslint-disable react/no-unescaped-entities */
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/button-utils'
import { MailWarning, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center px-4 pt-40 text-center sm:px-6 lg:px-8">
      <h1 className="block bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-center text-4xl font-bold text-transparent sm:text-6xl ">
        Something went amiss.
      </h1>
      <br />
      <p className="max-w-xl text-center text-lg font-medium text-foreground opacity-90 md:text-xl">
        <strong className="font-semibold">Sorry!</strong>{' '}
        {error.message ? error.message : 'Looks like prismify needs glasses :('}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <Button onClick={reset} className="w-48 text-base sm:w-fit" variant="stylish">
          <RotateCcw className="mr-2 h-5 w-5 text-foreground/80" />
          Pray & Retry
        </Button>
        <Link
          href="mailto:silson0072@gmail.com"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'w-48 px-4 text-base sm:w-fit'
          )}
        >
          <MailWarning className="mr-2 h-5 w-5 text-foreground/80" />
          Report
        </Link>
      </div>
    </div>
  )
}
