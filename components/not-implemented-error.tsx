/* eslint-disable react/no-unescaped-entities */
'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/button-utils'
import { Construction, MoveLeft } from 'lucide-react'

export default function NotImplementedMsg() {
  return (
    <div className="flex flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <Construction className="mb-4 h-24 w-24 fill-[#898aeb]/30 text-purple/90" />

      <h1 className="block bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-center text-4xl font-bold text-transparent sm:text-6xl ">
        Under Construction.
      </h1>
      <br />
      <p className="max-w-xl text-center text-lg font-medium text-foreground opacity-90 md:text-xl">
        <strong className="font-semibold">Not implemented!</strong> This feature
        is still under construction.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <a
          href="/"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'w-48 px-4 text-[15.2px] sm:w-fit'
          )}
        >
          <MoveLeft className="mr-2 h-5 w-5 text-foreground/80" />
          Get me out of here then 😬
        </a>
      </div>
    </div>
  )
}
