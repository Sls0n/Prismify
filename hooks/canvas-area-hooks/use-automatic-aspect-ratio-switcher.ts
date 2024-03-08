import { useColorExtractor } from '@/store/use-color-extractor'
import { useImageQualityStore } from '@/store/use-image-quality'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import React, { useEffect } from 'react'

/**
 * This hook encaspulates the logic used to automatically switch the aspect ratio of a screenshot
 * within a container. If the screenshot overflows the container, the aspect
 * ratio is adjusted to fit within the container.
 *
 * @param {Object} props - The properties for the hook.
 * @param {React.RefObject<HTMLDivElement>} props.containerRef - A ref to the container element.
 * @param {React.RefObject<HTMLDivElement>} props.screenshotRef - A ref to the screenshot element.
 */

export default function useAutomaticAspectRatioSwitcher({
  containerRef,
  screenshotRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>
  screenshotRef: React.RefObject<HTMLDivElement>
}) {
  const { resolution, setScrollScale } = useResizeCanvas()
  const { quality } = useImageQualityStore()
  const { imagesCheck } = useColorExtractor()

  useEffect(() => {
    const adjustAspectRatio = () => {
      const parentEl = containerRef.current
      const childEl = screenshotRef.current

      if (!parentEl || !childEl) return

      const isOverflowing =
        parentEl.clientWidth <= childEl.clientWidth ||
        parentEl.clientHeight <= childEl.clientHeight

      if (isOverflowing) {
        const isPortrait =
          childEl.classList.contains('w-auto') &&
          childEl.classList.contains('h-full')
        const isLandscape =
          childEl.classList.contains('w-full') &&
          childEl.classList.contains('h-auto')

        if (isPortrait) {
          childEl.classList.remove('w-auto', 'h-full')
          childEl.classList.add('w-full', 'h-auto')
        } else if (isLandscape) {
          childEl.classList.remove('w-full', 'h-auto')
          childEl.classList.add('w-auto', 'h-full')
        }
      }
    }

    adjustAspectRatio()

    const handleResize = () => {
      // If the screen width is less than 768px then set the scrollScale to 1
      if (window.innerWidth < 768) {
        setScrollScale(1)
      }
      adjustAspectRatio()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolution, quality, imagesCheck, setScrollScale])
}
