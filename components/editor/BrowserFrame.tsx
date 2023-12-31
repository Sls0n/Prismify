import { FrameTypes, useFrameOptions } from '@/store/use-frame-options'

export default function BrowserFrame({ frame }: { frame: FrameTypes }) {
  const {
    frameHeight,
    showSearchBar,
    macOsDarkColor,
    macOsLightColor,
    hideButtons,
    hasButtonColor,
  } = useFrameOptions()

  if (frame === 'None') return

  if (frame === 'MacOS Dark')
    return (
      <div
        style={{
          background: macOsDarkColor,
        }}
        className={`flex items-center gap-4 ${
          frameHeight === 'small'
            ? 'h-[2.6vw] px-[1.6vw]'
            : frameHeight === 'medium'
            ? 'h-[3vw] px-[1.8vw]'
            : 'h-[3.4vw] px-[2vw]'
        }`}
      >
        <div
          className={`mr-2 flex basis-[6%]  ${
            frameHeight === 'small'
              ? 'gap-[0.6vw] [&>*]:h-[0.7vw] [&>*]:w-[0.7vw]'
              : frameHeight === 'medium'
              ? 'gap-[0.65vw] [&>*]:h-[0.8vw] [&>*]:w-[0.8vw]'
              : 'gap-[0.7vw] [&>*]:h-[0.9vw] [&>*]:w-[0.9vw]'
          }`}
        >
          {!hideButtons && (
            <>
              {hasButtonColor ? (
                <>
                  <div className="rounded-full bg-[#f7645ccc]" />
                  <div className="rounded-full bg-[#fbc341d2]" />
                  <div className="rounded-full bg-[#3cc84ac5]" />
                </>
              ) : (
                <>
                  <div className="rounded-full bg-[#fff]/20" />
                  <div className="rounded-full bg-[#fff]/20" />
                  <div className="rounded-full bg-[#fff]/20" />
                </>
              )}
            </>
          )}
        </div>
        {showSearchBar && (
          <div className="flex h-[50%] w-full flex-1  items-center rounded-md bg-white px-2 opacity-5" />
        )}
      </div>
    )

  if (frame === 'MacOS Light')
    return (
      <div
        style={{
          background: macOsLightColor,
        }}
        className={`flex items-center gap-4 border-b border-[#00000010]  ${
          frameHeight === 'small'
            ? 'h-[2.6vw] px-[1.6vw]'
            : frameHeight === 'medium'
            ? 'h-[3vw] px-[1.8vw]'
            : 'h-[3.4vw] px-[2vw]'
        }`}
      >
        <div
          className={`mr-2 flex basis-[6%]  ${
            frameHeight === 'small'
              ? 'gap-[0.6vw] [&>*]:h-[0.7vw] [&>*]:w-[0.7vw]'
              : frameHeight === 'medium'
              ? 'gap-[0.65vw] [&>*]:h-[0.8vw] [&>*]:w-[0.8vw]'
              : 'gap-[0.7vw] [&>*]:h-[0.9vw] [&>*]:w-[0.9vw]'
          }`}
        >
          {!hideButtons && (
            <>
              {hasButtonColor ? (
                <>
                  <div className="rounded-full bg-[#f7645c]" />
                  <div className="rounded-full bg-[#fbc341]" />
                  <div className="rounded-full bg-[#3cc84a]" />
                </>
              ) : (
                <>
                  <div className="rounded-full bg-[#000]/20" />
                  <div className="rounded-full bg-[#000]/20" />
                  <div className="rounded-full bg-[#000]/20" />
                </>
              )}
            </>
          )}
        </div>
        {showSearchBar && (
          <div className="flex h-[50%] w-full flex-1 items-center rounded-md bg-[#000] px-2 opacity-5" />
        )}
      </div>
    )

  if (frame === 'Arc') return null
}
