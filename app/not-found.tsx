/* eslint-disable react/no-unescaped-entities */
'use client'

import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/buttonUtils'
import { MoveLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="block bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-center text-4xl font-bold text-transparent sm:text-6xl ">
        Lost in the Pixels.
      </h1>
      <br />
      <p className="max-w-xl text-center text-lg font-medium text-foreground opacity-90 md:text-xl">
        <strong className='font-semibold'>Not found!</strong> Looks like you've wandered off the grid.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <a
          href="/"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'w-48 sm:w-fit px-4 text-[15.2px]'
          )}
        >
          <MoveLeft className="mr-2 h-5 w-5 text-foreground/80" />
          Get me out of here 😬
        </a>
      </div>
    </div>
  )
}
