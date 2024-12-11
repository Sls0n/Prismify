'use client'

import BackgroundOptions from '@/components/editor/background-options'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useActiveIndexStore } from '@/store/use-active-index'
import {
  AppWindow,
  Box,
  Image as Images,
  Locate,
  Palette,
  PanelTop,
  TextCursor,
} from 'lucide-react'
import React, { useMemo } from 'react'
import CanvasOptions from './canvas-options'
import FrameOptions from './frame-options'
import ImageOptions from './image-options'
import PerspectiveOptions from './perspective-options'
import PositionOptions from './position-options'
import SidebarButton from './sidebar-buttons'
import TextOptions from './text-options'
import { UndoRedoButtons, useUndoRedoHotkeys } from './undo-redo-buttons'

type SidebarSection =
  | 'canvas'
  | 'image'
  | 'background'
  | 'frame'
  | 'text'
  | '3d'
  | 'position'

interface SidebarButton {
  id: SidebarSection
  text: string
  icon: React.ElementType
  component: React.ComponentType
}

function useSidebarButtons() {
  return useMemo<SidebarButton[]>(
    () => [
      {
        id: 'canvas',
        text: 'Canvas',
        icon: AppWindow,
        component: CanvasOptions,
      },
      { id: 'image', text: 'Image', icon: Images, component: ImageOptions },
      {
        id: 'background',
        text: 'Background',
        icon: Palette,
        component: BackgroundOptions,
      },
      { id: 'frame', text: 'Frame', icon: PanelTop, component: FrameOptions },
      { id: 'text', text: 'Text', icon: TextCursor, component: TextOptions },
      { id: '3d', text: '3D', icon: Box, component: PerspectiveOptions },
      {
        id: 'position',
        text: 'Position',
        icon: Locate,
        component: PositionOptions,
      },
    ],
    []
  )
}

export default function Sidebar() {
  const sidebarButtons = useSidebarButtons()
  const { activeIndex } = useActiveIndexStore()
  const activeSection = sidebarButtons[activeIndex]?.id ?? 'image'
  useUndoRedoHotkeys()

  return (
    <aside className="flex w-[6rem] overflow-x-hidden border-r border-border/60 md:min-w-[25rem] md:max-w-[25rem]">
      <ul className="no-scrollbar relative flex basis-[100%] flex-col items-center gap-6 overflow-x-hidden border-[#22262b]/60 bg-[#131313] px-4 py-8 md:max-w-[28%] md:basis-[28%] md:border-r">
        {sidebarButtons.map((button, index) => (
          <SidebarButton
            key={button.id}
            text={button.text}
            icon={
              <button.icon
                size={20}
                strokeWidth={button.id === activeSection ? 2.25 : 2}
              />
            }
            index={index}
          />
        ))}
      </ul>
      <div className="relative hidden h-full w-full flex-col overflow-hidden bg-[#151515] md:flex">
        <SidebarImageSettings sidebarButtons={sidebarButtons} />
      </div>
    </aside>
  )
}

interface SidebarImageSettingsProps {
  sidebarButtons: SidebarButton[]
}

export function SidebarImageSettings({
  sidebarButtons,
}: SidebarImageSettingsProps) {
  const { activeIndex } = useActiveIndexStore()
  const activeButton = sidebarButtons[activeIndex] ?? sidebarButtons[1] // Default to image if no active index
  const ActiveComponent = activeButton?.component

  return (
    <ScrollArea type="scroll">
      <div className="flex flex-col px-[1.6rem]">
        <div className="flex w-full flex-col py-10">
          <h3 className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase text-dark/70">
            {React.createElement(activeButton.icon, { size: 20 })}
            <div>{activeButton.text}</div>
            <UndoRedoButtons />
          </h3>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </ScrollArea>
  )
}
