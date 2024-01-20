import { cn } from '@/utils/button-utils'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-border/40 bg-black/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-5 text-center md:grid-cols-3 md:text-start">
        <div>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'noHoverGhost' }),
              ' inline-flex gap-2 text-xl font-normal text-dark/80 focus:outline-none focus:ring-1 focus:ring-gray-600'
            )}
            aria-label="Prismify"
          >
            <p className="mr-3 text-dark/80 ">Prismify</p>
          </Link>
        </div>

        <ul className="text-center">
          <li className="relative inline-block pe-8 before:absolute before:end-3 before:top-1/2 before:-translate-y-1/2 before:content-['/'] last:pe-0 last-of-type:before:hidden">
            <Link
              prefetch={false}
              className="inline-flex gap-x-2 text-sm text-dark/70 hover:text-dark focus:outline-none focus:ring-1 focus:ring-[#898aeb]"
              href="/about"
            >
              About
            </Link>
          </li>
          <li className="relative inline-block pe-8 before:absolute before:end-3 before:top-1/2 before:-translate-y-1/2 before:content-['/'] last:pe-0 last-of-type:before:hidden">
            <Link
              prefetch={false}
              className="inline-flex gap-x-2 text-sm text-dark/70 hover:text-dark focus:outline-none focus:ring-1 focus:ring-[#898aeb]"
              href="/privacy-policy"
            >
              Privacy policy
            </Link>
          </li>
          <li className="relative inline-block pe-8 before:absolute before:end-3 before:top-1/2 before:-translate-y-1/2 before:content-['/'] last:pe-0 last-of-type:before:hidden">
            <Link
              prefetch={false}
              className="inline-flex gap-x-2 text-sm text-dark/70 hover:text-dark focus:outline-none focus:ring-1 focus:ring-[#898aeb]"
              href="/terms-of-use"
            >
              Terms of use
            </Link>
          </li>
        </ul>

        <div className="space-x-2 md:text-end">
          <a
            className="inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-dark/70 hover:bg-white/20 hover:text-dark focus:outline-none focus:ring-1 focus:ring-[#898aeb] disabled:pointer-events-none disabled:opacity-50"
            href="#"
          >
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
            </svg>
          </a>
          <a
            className="inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-dark/70 hover:bg-white/20 hover:text-dark focus:outline-none focus:ring-1 focus:ring-[#898aeb] disabled:pointer-events-none disabled:opacity-50"
            href="#"
          >
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </a>
          <a
            className="inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-dark/70 hover:bg-white/20 hover:text-dark focus:outline-none focus:ring-1 focus:ring-[#898aeb] disabled:pointer-events-none disabled:opacity-50"
            href="#"
          >
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <a
            className="inline-flex h-8 w-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-dark/70 hover:bg-white/20 hover:text-dark focus:outline-none focus:ring-1 focus:ring-[#898aeb] disabled:pointer-events-none disabled:opacity-50"
            href="#"
          >
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
