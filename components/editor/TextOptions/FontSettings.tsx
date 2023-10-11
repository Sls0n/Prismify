'use client'

import React, { useState } from 'react'

import { useImageOptions } from '@/store/use-image-options'
import FontPicker from 'font-picker-react'

export default function FontSettings() {
  const { setTexts, selectedText, texts } = useImageOptions()
  const [activeFontFamily, setActiveFontFamily] = useState(
    texts[selectedText - 1]?.style.fontFamily
  )

  console.log(selectedText)
  return (
    <div className="relative h-52 w-full">
      {/* <Button
        variant="ghost"
        className="flex h-[3.75rem] h-full w-full items-center overflow-hidden rounded-lg border border-border bg-formDark"
      >
        <div style={backgroundStyle} className="flex-center h-full basis-[20%]">
          <p
            className="apply-font text-2xl font-semibold text-dark/70 dark:text-primary/70"
            style={{
              fontFamily: texts[selectedText - 1]?.style.fontFamily,
            }}
          >
            Aa
          </p>
        </div>
        <div className="flex h-full w-full flex-1 items-center justify-between px-4">
          <div className="flex w-full flex-col items-start">
            <p className="text-[0.78rem] font-medium text-primary/50 dark:text-dark/50">
              Font family
            </p>
            <p className="text-[0.85rem] font-semibold text-primary/70 dark:text-dark/70">
              {texts[selectedText - 1]?.style.fontFamily || 'Eudoxus sans'}
            </p>
          </div>

          <ChevronDown
            size={18}
            className="text-primary/70 dark:text-dark/80"
          />
        </div>
      </Button> */}

      <FontPicker
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY!}
        activeFontFamily={activeFontFamily}
        onChange={(font) => {
          console.log(font.family)
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
    </div>
  )
}
