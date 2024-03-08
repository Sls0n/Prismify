// This component is responsible for rendering the browser frame around the image layer.

'use client'

import { FrameTypes, useFrameOptions } from '@/store/use-frame-options'
import { cn } from '@/utils/button-utils'

const FrameButton = ({ color }: { color: string }) => (
  <div
    className={'rounded-full'}
    style={{
      backgroundColor: color,
    }}
  />
)

const FrameButtons = ({
  hasButtonColor,
  frame,
}: {
  hasButtonColor: boolean
  frame: FrameTypes
}) => {
  const { frameHeight } = useFrameOptions()
  let colors: string[] = []

  if (hasButtonColor && frame === 'MacOS Dark') {
    colors = ['#f7645c', '#fbc341', '#3cc84a']
  } else if (hasButtonColor && frame === 'MacOS Light') {
    colors = ['#f7645ccc', '#fbc341d2', '#3cc84ac5']
  } else if (!hasButtonColor && frame === 'MacOS Dark') {
    colors = ['#ffffff33', '#ffffff33', '#ffffff33']
  } else if (!hasButtonColor && frame === 'MacOS Light') {
    colors = ['#00000033', '#00000033', '#00000033']
  }

  return (
    <div
      className={`mr-2 flex basis-[6%] ${
        frameHeight === 'small'
          ? 'gap-[0.6vw] [&>*]:h-[0.7vw] [&>*]:w-[0.7vw]'
          : frameHeight === 'medium'
          ? 'gap-[0.65vw] [&>*]:h-[0.8vw] [&>*]:w-[0.8vw]'
          : 'gap-[0.7vw] [&>*]:h-[0.9vw] [&>*]:w-[0.9vw]'
      }`}
    >
      {colors.map((color, index) => (
        <FrameButton key={index} color={color} />
      ))}
    </div>
  )
}

const FrameSearchBar = ({ frame }: { frame: FrameTypes }) => (
  <div
    className={cn(
      'flex h-[50%] w-full flex-1 items-center rounded-md px-2 opacity-5',
      frame === 'MacOS Dark' ? 'bg-white' : 'bg-[#000]'
    )}
  />
)

const FrameContainer = ({
  frameHeight,
  children,
  style,
  additionalClasses = '',
}: {
  frameHeight: string
  children: React.ReactNode
  style: React.CSSProperties
  additionalClasses?: string
}) => {
  const heightClass =
    frameHeight === 'small'
      ? 'h-[2.6vw] px-[1.6vw]'
      : frameHeight === 'medium'
      ? 'h-[3vw] px-[1.8vw]'
      : 'h-[3.4vw] px-[2vw]'

  return (
    <div
      style={style}
      className={`flex items-center gap-4 ${heightClass} ${additionalClasses}`}
    >
      {children}
    </div>
  )
}

export default function BrowserFrame({ frame }: { frame: FrameTypes }) {
  const {
    frameHeight,
    showSearchBar,
    macOsDarkColor,
    macOsLightColor,
    hideButtons,
    hasButtonColor,
  } = useFrameOptions()

  const props = { frame }

  const frameComponents = {
    'MacOS Dark': (
      <FrameContainer
        style={{ background: macOsDarkColor }}
        frameHeight={frameHeight}
      >
        {!hideButtons && (
          <FrameButtons hasButtonColor={hasButtonColor} {...props} />
        )}
        {showSearchBar && <FrameSearchBar {...props} />}
      </FrameContainer>
    ),
    'MacOS Light': (
      <FrameContainer
        style={{ background: macOsLightColor }}
        frameHeight={frameHeight}
        additionalClasses="border-b border-[#00000010]"
      >
        {!hideButtons && (
          <FrameButtons hasButtonColor={hasButtonColor} {...props} />
        )}
        {showSearchBar && <FrameSearchBar {...props} />}
      </FrameContainer>
    ),
    None: null,
    Arc: null,
    Shadow: null,
  }

  return frameComponents[frame] || null
}
