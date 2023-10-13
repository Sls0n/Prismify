'use client'

import { useState } from 'react'

import { useImageOptions } from '@/store/use-image-options'
import FontPicker from 'font-picker-react'
import PopupColorPicker from '@/components/PopupColorPicker'
import { Button } from '@/components/ui/Button'
import {
  AlignCenter,
  AlignHorizontalJustifyCenter,
  AlignLeft,
  AlignRight,
  Minus,
  Plus,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { Slider } from '@/components/ui/Slider'
import { useMoveable } from '@/store/use-moveable'

export default function FontSettings() {
  const { setTexts, selectedText, texts } = useImageOptions()
  const [activeFontFamily, setActiveFontFamily] = useState(
    texts[selectedText - 1]?.style.fontFamily
  )
  const { setShowTextControls } = useMoveable()

  const handleColorChange = (color: string) => {
    setTexts(
      texts.map((text, index) =>
        index === selectedText - 1
          ? {
              ...text,
              style: {
                ...text.style,
                textColor: color,
              },
            }
          : text
      )
    )
  }

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    setTexts(
      texts.map((text, index) =>
        index === selectedText - 1
          ? {
              ...text,
              style: {
                ...text.style,
                textAlign: alignment,
              },
            }
          : text
      )
    )
  }

  const handleFontWeight = (weight: number) => {
    setTexts(
      texts.map((text, index) =>
        index === selectedText - 1
          ? {
              ...text,
              style: {
                ...text.style,
                fontWeight: weight,
              },
            }
          : text
      )
    )
  }

  return (
    <div className="relative h-full w-full">
      <div className="mb-3 mt-2 flex max-w-[70%] items-center px-1">
        <h1 className="text-[0.85rem]">Font family</h1>
      </div>
      <FontPicker
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY!}
        activeFontFamily={activeFontFamily}
        onChange={(font) => {
          setTexts(
            texts.map((text, index) =>
              index === selectedText - 1
                ? {
                    ...text,
                    style: {
                      ...text.style,
                      fontFamily: font.family,
                    },
                  }
                : text
            )
          )
          setActiveFontFamily(font.family)
        }}
      />

      <div className={`mt-8 flex flex-col gap-3 px-1`}>
        <h1 className="text-[0.85rem]">Font weight</h1>
        <span className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-l-md bg-formDark px-2 py-2 text-dark ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed"
            onClick={
              texts[selectedText - 1]?.style.fontWeight > 200
                ? () =>
                    handleFontWeight(
                      texts[selectedText - 1]?.style.fontWeight - 100
                    )
                : () => handleFontWeight(200)
            }
          >
            <span className="sr-only">Decrease font weight</span>
            <Minus className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-center border-b border-t border-border bg-secondary-foreground px-4 dark:bg-formDark ">
            <p className="text-[0.85rem] font-medium text-primary/80 dark:text-dark/80">
              {texts[selectedText - 1]?.style.fontWeight ?? 400}
            </p>
          </div>
          <button
            type="button"
            className="relative inline-flex items-center rounded-r-md bg-secondary-foreground px-2 py-2 ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed dark:bg-formDark dark:text-dark"
            onClick={
              texts[selectedText - 1]?.style.fontWeight < 800
                ? () =>
                    handleFontWeight(
                      texts[selectedText - 1]?.style.fontWeight + 100
                    )
                : () => handleFontWeight(800)
            }
          >
            <span className="sr-only">Increase font weight</span>
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </span>
      </div>

      <div className={`mt-8 flex flex-col gap-3 px-1`}>
        <h1 className="text-[0.85rem]">Font color</h1>
        <PopupColorPicker
          color={texts[selectedText - 1]?.style.textColor}
          onChange={handleColorChange}
        />
      </div>

      <div className={`max-w-[70%] mt-8 flex flex-col gap-3 px-1`}>
        <h1 className="text-[0.85rem]">Letter spacing</h1>
        <Slider
          defaultValue={[0]}
          max={0.1}
          min={-0.05}
          step={0.01}
          value={
            texts.length !== 0
              ? [+texts[selectedText - 1]?.style.letterSpacing]
              : [0]
          }
          onValueChange={(value: number[]) => {
            setShowTextControls(false)
            setTexts(
              texts.map((text, index) =>
                index === selectedText - 1
                  ? {
                      ...text,
                      style: {
                        ...text.style,
                        letterSpacing: value[0],
                      },
                    }
                  : text
              )
            )
          }}
          onValueCommit={() => setShowTextControls(true)}
        />
      </div>

      <div className={`mt-8 flex flex-col gap-3 px-1`}>
        <h1 className="text-[0.85rem]">Alignment</h1>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={'x-sm'}
                  className="h-9 w-9 rounded-lg p-0"
                  variant="icon"
                  onClick={() => handleAlignmentChange('left')}
                >
                  <AlignLeft size={19} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={'x-sm'}
                  className="h-9 w-9 rounded-lg p-0"
                  variant="icon"
                  onClick={() => handleAlignmentChange('center')}
                >
                  <AlignHorizontalJustifyCenter size={19} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Center</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={'x-sm'}
                  className="h-9 w-9 rounded-lg p-0"
                  variant="icon"
                  onClick={() => handleAlignmentChange('right')}
                >
                  <AlignRight size={19} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
