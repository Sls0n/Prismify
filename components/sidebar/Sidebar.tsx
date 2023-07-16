import { ChevronDown } from 'lucide-react'
import SidebarButtons from './SidebarButtons'
import SidebarHeading from './SidebarHeading'
import Editor from '@/components/editor/Editor'
import { Button } from '../ui/Button'

export default function Sidebar() {
  return (
    <aside id="sidebar" className="flex w-full gap-2 rounded-xl">
      <div className="flex w-[30%] flex-col rounded-xl border border-border bg-formDark ">
        <SidebarHeading />

        <SidebarButtons />

        {/* Background button */}
        <button className="sidebar-option">
          <div className="inline-flex items-center justify-between gap-4">
            <h2 className="text-sm font-medium text-primary/70 dark:text-dark/80">
              Background
            </h2>
            <div className="h-5 w-5 rounded-md bg-purple-400" />
          </div>
          <ChevronDown
            size={18}
            className="text-primary/70 dark:text-dark/80"
          />
        </button>

        {/*  */}
        <button className="sidebar-option">
          <div className="inline-flex items-center justify-between gap-4">
            <h2 className="text-sm font-medium text-primary/70 dark:text-dark/80">
              Frame
            </h2>
            <p className="rounded-md bg-dark/50 p-2 font-mono text-xs">
              MacOS Dark
            </p>
          </div>
          <ChevronDown
            size={18}
            className="text-primary/70 dark:text-dark/80"
          />
        </button>
      </div>
      <main className="justify-first flex flex-1 flex-col items-center  rounded-xl px-3">
        <div className="flex h-14 w-full items-center justify-end gap-4 rounded-xl border border-border py-2 px-3">
          <Button size={'x-sm'} variant="stylish">
            Save
          </Button>
          <Button size={'x-sm'} variant="stylish">
            Download
          </Button>
          <Button size={'x-sm'} variant="stylish">
            Publish
          </Button>
        </div>
        <Editor />
      </main>
    </aside>
  )
}
