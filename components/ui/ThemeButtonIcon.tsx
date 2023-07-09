'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonStar, Sun } from 'lucide-react'
import { Button } from './Button'

export default function ThemeButtonIcon() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const themeChangeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {mounted && (
        <Button variant={'ghost'} onClick={themeChangeHandler}>
          {theme === 'dark' ? (
            <Sun
              aria-label="Toggle light theme"
              className="text-purple dark:text-dark"
              size={20}
              strokeWidth={2.2}
            />
          ) : (
            <MoonStar
              aria-label="Toggle dark theme"
              className="text-purple dark:text-dark"
              size={20}
              strokeWidth={2.2}
            />
          )}
        </Button>
      )}
    </>
  )
}
