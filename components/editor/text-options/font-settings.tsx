'use client'

import PopupColorPicker from '@/components/popup-color-picker'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import {
  AlignHorizontalJustifyCenter,
  AlignLeft,
  AlignRight,
  GalleryVerticalEnd,
  Minus,
  Plus,
} from 'lucide-react'
import dynamic from 'next/dynamic'

const FontPicker = dynamic(
  () => import('font-picker-react').then((mod) => mod.default),
  {
    ssr: false,
  }
)

export default function FontSettings() {
  const { setTexts, texts } = useImageOptions()
  const { selectedText } = useSelectedLayers()
  const { setShowTextControls } = useMoveable()

  const handleColorChange = (color: string) => {
    selectedText &&
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

  const handleShadowColorChange = (color: string) => {
    selectedText &&
      setTexts(
        texts.map((text, index) =>
          index === selectedText - 1
            ? {
                ...text,
                style: {
                  ...text.style,
                  shadowColor: color,
                },
              }
            : text
        )
      )
  }

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    selectedText &&
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
    selectedText &&
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
      <div className="mb-3 mt-2 flex items-center px-1 md:max-w-full">
        <h1 className="text-[0.85rem]">Font family</h1>
      </div>
      {/* @ts-expect-error */}
      <FontPicker
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY!}
        activeFontFamily={
          selectedText ? texts[selectedText - 1]?.style.fontFamily : 'Inter'
        }
        variants={['200', '300', 'regular', '500', '600', '700', '800']}
        onChange={(font) => {
          selectedText &&
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
        }}
      />

      <div className={`mt-8 flex flex-col gap-3 px-1`}>
        <h1 className="text-[0.85rem]">Weight</h1>
        <span className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-l-md bg-formDark px-2 py-2 text-dark ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed"
            onClick={
              selectedText && texts[selectedText - 1]?.style.fontWeight > 200
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
          <div className="flex-center border-b border-t border-border bg-formDark px-4">
            <p className="text-[0.85rem] font-medium text-dark/80">
              {selectedText ? texts[selectedText - 1]?.style.fontWeight : 400}
            </p>
          </div>
          <button
            type="button"
            className="relative inline-flex items-center rounded-r-md bg-formDark px-2 py-2 text-dark ring-1 ring-inset ring-border focus:z-10 disabled:cursor-not-allowed"
            onClick={
              selectedText && texts[selectedText - 1]?.style.fontWeight < 800
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
        <h1 className="text-[0.85rem]">Color</h1>
        <PopupColorPicker
          color={
            selectedText ? texts[selectedText - 1]?.style.textColor : '#fff'
          }
          onChange={handleColorChange}
        />
      </div>

      <div className={`mt-8 flex flex-col gap-3 px-1 md:max-w-full`}>
        <h1 className="text-[0.85rem]">Letter spacing</h1>
        <Slider
          defaultValue={[0]}
          max={0.2}
          min={-0.05}
          step={0.001}
          value={
            texts.length !== 0 && selectedText
              ? [+texts[selectedText - 1]?.style.letterSpacing]
              : [0]
          }
          onValueChange={(value: number[]) => {
            setShowTextControls(false)
            selectedText &&
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
          onIncrement={() => {
            if (!selectedText) return
            if (
              Number(texts[selectedText - 1]?.style.letterSpacing) >= 0.2 ||
              texts.length === 0
            )
              return
            setTexts(
              texts.map((text, index) =>
                index === selectedText - 1
                  ? {
                      ...text,
                      style: {
                        ...text.style,
                        letterSpacing: Number(text.style.letterSpacing) + 0.001,
                      },
                    }
                  : text
              )
            )
          }}
          onDecrement={() => {
            if (!selectedText) return
            if (
              Number(texts[selectedText - 1]?.style.letterSpacing) <= -0.05 ||
              texts.length === 0
            )
              return
            setTexts(
              texts.map((text, index) =>
                index === selectedText - 1
                  ? {
                      ...text,
                      style: {
                        ...text.style,
                        letterSpacing: Number(text.style.letterSpacing) - 0.001,
                      },
                    }
                  : text
              )
            )
          }}
        />
      </div>

      <div className={`mt-8 flex flex-col gap-3 px-1`}>
        <h1 className="text-[0.85rem]">Alignment</h1>
        <div className="flex flex-wrap gap-4">
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

      <hr className="my-8" />

      <h3 className="flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <GalleryVerticalEnd className="rotate-90" size={20} />
        <span>Text shadow</span>
      </h3>

      <div className="mb-3 mt-8 flex items-center px-1">
        <h1 className="text-[0.85rem]">Opacity</h1>
        <p className="ml-2 rounded-md bg-formDark p-[0.4rem] text-[0.8rem] text-dark/70">
          {Math.round(
            Number(selectedText ? texts[selectedText - 1]?.style.shadowOpacity : 0.1) * 100
          )}
          %
        </p>
      </div>

      <div className="flex gap-4 text-[0.85rem] md:max-w-full">
        <Slider
          defaultValue={[0.1]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            selectedText &&
              setTexts(
                texts.map((text, index) =>
                  index === selectedText - 1
                    ? {
                        ...text,
                        style: {
                          ...text.style,
                          shadowOpacity: value[0],
                        },
                      }
                    : text
                )
              )
          }}
          value={
            texts.length !== 0 && selectedText
              ? [texts[selectedText - 1]?.style.shadowOpacity]
              : [0.1]
          }
          onIncrement={() => {
            if (!selectedText) return
            if (
              Number(texts[selectedText - 1]?.style.shadowOpacity) >= 1 ||
              texts.length === 0
            )
              return
            setTexts(
              texts.map((text, index) =>
                index === selectedText - 1
                  ? {
                      ...text,
                      style: {
                        ...text.style,
                        shadowOpacity: Number(text.style.shadowOpacity) + 0.01,
                      },
                    }
                  : text
              )
            )
          }}
          onDecrement={() => {
            if (!selectedText) return
            if (
              Number(texts[selectedText - 1]?.style.shadowOpacity) <= 0 ||
              texts.length === 0
            )
              return
            setTexts(
              texts.map((text, index) =>
                index === selectedText - 1
                  ? {
                      ...text,
                      style: {
                        ...text.style,
                        shadowOpacity: Number(text.style.shadowOpacity) - 0.01,
                      },
                    }
                  : text
              )
            )
          }}
        />
      </div>

      <div className="mb-3 mt-8 flex items-center px-1">
        <h1 className="text-[0.85rem]">Shadow color</h1>
      </div>

      <PopupColorPicker
        shouldShowAlpha={false}
        color={selectedText ? texts[selectedText - 1]?.style.shadowColor : '#333'}
        onChange={handleShadowColorChange}
      />
    </div>
  )
}
