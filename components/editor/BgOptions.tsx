import { ChevronDown } from 'lucide-react'

export default function BgOptions() {
  return (
    <>
      <h1 className="mb-3 mt-4 px-1 text-[0.85rem]">Frame</h1>
      <button className="relative flex h-14 items-center overflow-hidden rounded-lg border border-border bg-sidebar">
        <div className="flex h-full basis-1/5 items-center bg-purple-400"></div>
        <div className="flex h-full w-full flex-1 items-center justify-between px-4">
          <p className="text-[0.85rem] text-primary/70 dark:text-dark/70">
            MacOS Dark
          </p>
          <ChevronDown
            size={18}
            className="text-primary/70 dark:text-dark/80"
          />
        </div>
      </button>
    </>
  )
}

