'use client'

import SidebarButton from './sidebar-buttons'
import { Button } from '@/components/ui/button'
import {
  Image as Images,
  AppWindow,
  TextCursor,
  PanelTop,
  Locate,
  Palette,
  Undo2,
  Redo2,
  Box,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useActiveIndexStore } from '@/store/use-active-index'
import CanvasOptions from './canvas-options'
import ImageOptions from './image-options'
import BackgroundOptions from '@/components/editor/background-options'
import FrameOptions from './frame-options'
import PositionOptions from './position-options'
import { useTemporalStore } from '@/store/use-image-options'
import TextOptions from './text-options'
import PerspectiveOptions from './perspective-options'
import { useHotkeys } from 'react-hotkeys-hook'
import { useMoveable } from '@/store/use-moveable'

export default function Sidebar() {
  const { setShowControls } = useMoveable()
  const { undo, redo } = useTemporalStore((state) => state)
  const { activeIndex } = useActiveIndexStore()

  const sidebarButtons = [
    {
      text: 'Canvas',
      icon: <AppWindow size={20} strokeWidth={activeIndex === 0 ? 2.25 : 2} />,
    },
    {
      text: 'Image',
      icon: <Images size={20} strokeWidth={activeIndex === 1 ? 2.25 : 2} />,
    },
    {
      text: 'Background',
      icon: <Palette size={20} strokeWidth={activeIndex === 2 ? 2.25 : 2} />,
    },
    {
      text: 'Frame',
      icon: <PanelTop size={20} strokeWidth={activeIndex === 3 ? 2.25 : 2} />,
    },
    {
      text: 'Text',
      icon: <TextCursor size={20} strokeWidth={activeIndex === 4 ? 2.25 : 2} />,
    },
    {
      text: '3D',
      icon: <Box size={20} strokeWidth={activeIndex === 5 ? 2.25 : 2} />,
    },
    {
      text: 'Position',
      icon: <Locate size={20} strokeWidth={activeIndex === 6 ? 2.25 : 2} />,
    },
  ]
  useHotkeys(
    'ctrl+z',
    () => {
      undo()
      setShowControls(false)
    },
    [undo]
  )
  useHotkeys(
    'ctrl+y',
    () => {
      redo()
      setShowControls(false)
    },
    [redo]
  )

  return (
    <aside className="flex w-[6rem] overflow-x-hidden border-r border-border/60 md:min-w-[25rem] md:max-w-[25rem]">
      <ul className="no-scrollbar relative flex basis-[100%] flex-col items-center gap-6 overflow-x-hidden px-4 py-8 border-[#22262b]/60 bg-[#131313] md:max-w-[28%] md:basis-[28%] md:border-r">
        {sidebarButtons.map((button, index) => (
          <SidebarButton
            key={index}
            text={button.text}
            icon={button.icon}
            index={index}
          />
        ))}
      </ul>
      <div className="relative hidden h-full w-full flex-col overflow-hidden bg-[#151515] md:flex">
        <SidebarImageSettings />
      </div>
    </aside>
  )
}

export function SidebarImageSettings() {
  const { activeIndex } = useActiveIndexStore()
  const sidebarButtons = [
    {
      text: 'Canvas',
      icon: <AppWindow size={20} strokeWidth={activeIndex === 0 ? 2.25 : 2} />,
    },
    {
      text: 'Image',
      icon: <Images size={20} strokeWidth={activeIndex === 1 ? 2.25 : 2} />,
    },
    {
      text: 'Background',
      icon: <Palette size={20} strokeWidth={activeIndex === 2 ? 2.25 : 2} />,
    },
    {
      text: 'Frame',
      icon: <PanelTop size={20} strokeWidth={activeIndex === 3 ? 2.25 : 2} />,
    },
    {
      text: 'Text',
      icon: <TextCursor size={20} strokeWidth={activeIndex === 4 ? 2.25 : 2} />,
    },
    {
      text: '3D',
      icon: <Box size={20} strokeWidth={activeIndex === 5 ? 2.25 : 2} />,
    },
    {
      text: 'Position',
      icon: <Locate size={20} strokeWidth={activeIndex === 6 ? 2.25 : 2} />,
    },
  ]
  const { undo, redo, futureStates, pastStates } = useTemporalStore(
    (state) => state
  )
  return (
    <ScrollArea type="scroll">
      <div className="flex flex-col px-[1.6rem]">
        <div className="flex w-full flex-col py-10">
          <h3 className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase text-dark/70">
            {sidebarButtons[activeIndex ?? 1].icon}
            <div className="">
              {sidebarButtons[activeIndex ?? 1].text}

              {/* <span className="ml-1 text-[#646464]">/ &nbsp;Layers</span> */}
            </div>
            <div className="ml-auto flex">
              <Button
                variant="outline"
                aria-label="undo"
                className="scale-75 rounded-md px-3 py-1"
                disabled={pastStates.length === 0}
                onClick={() => undo()}
              >
                <Undo2 size={20} />
              </Button>

              <Button
                variant="outline"
                aria-label="redo"
                className="scale-75 rounded-md px-3 py-1"
                disabled={futureStates.length === 0}
                onClick={() => redo()}
              >
                <Redo2 size={20} />
              </Button>
            </div>
          </h3>
          {activeIndex === 0 && <CanvasOptions />}
          {activeIndex === 1 && <ImageOptions />}
          {activeIndex === 2 && <BackgroundOptions />}
          {activeIndex === 3 && <FrameOptions />}
          {activeIndex === 4 && <TextOptions />}
          {activeIndex === 5 && <PerspectiveOptions />}
          {activeIndex === 6 && <PositionOptions />}
        </div>
      </div>
    </ScrollArea>
  )
}
