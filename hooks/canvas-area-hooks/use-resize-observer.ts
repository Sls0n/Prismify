
import { useImageQualityStore } from '@/store/use-image-quality'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import React, { useEffect } from 'react'

/**
 * This hook encapsulates the logic for observing changes in the size of the screenshot element & automatically sets the DOM resolution and scale factor based on the size changes of a provided ref element.
 * 
 * @param ref - The ref object that represents the HTMLDivElement to observe for size changes.
 */

export default function useCanvasResizeObserver(
  ref: React.RefObject<HTMLDivElement>
) {
  const {
    setScaleFactor,
    resolution,
    setExactDomResolution,
    setDomResolution,
  } = useResizeCanvas()
  const { quality } = useImageQualityStore()
  const [width, height]: number[] = resolution.split('x').map(Number)

  useEffect(() => {
    const element = ref.current

    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width: domWidth, height: domHeight } = entry.contentRect
          const dynamicScaleFactor = width / domWidth
          setScaleFactor(dynamicScaleFactor)
          setExactDomResolution(`${domWidth}x${domHeight}`)
          setDomResolution(
            `${domWidth * dynamicScaleFactor * quality}x${
              domHeight * dynamicScaleFactor * quality
            }`
          )
        }
      })

      resizeObserver.observe(element)

      return () => {
        resizeObserver.unobserve(element)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolution, quality])
}
