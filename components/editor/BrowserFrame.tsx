import { useFrameOptions } from '@/store/use-frame-options'

export default function BrowserFrame() {
  const { browserFrame, frameHeight, showSearchBar } = useFrameOptions()

  if (browserFrame === 'None') return

  if (browserFrame === 'MacOS Dark')
    return (
      <div
        className={`flex items-center gap-4 border-b border-[#3d3d3d] bg-[#454545]  ${
          frameHeight === 'small'
            ? 'h-[3vw] px-[1.6vw]'
            : frameHeight === 'medium'
            ? 'h-[3.4vw] px-[1.8vw]'
            : 'h-[3.8vw] px-[2vw]'
        }`}
      >
        <div
          className={`mr-2 flex basis-[6%]  ${
            frameHeight === 'small'
              ? 'gap-[0.6vw] [&>*]:h-[0.7vw] [&>*]:w-[0.7vw]'
              : 'gap-[0.7vw] [&>*]:h-[0.9vw] [&>*]:w-[0.9vw]'
          }`}
        >
          <div className="rounded-full bg-[#f7645ccc]" />
          <div className="rounded-full bg-[#fbc341d2]" />
          <div className="rounded-full bg-[#3cc84ac5]" />
        </div>
        {showSearchBar && (
          <div className="flex h-[50%] w-full flex-1 items-center rounded-md bg-[#575657] px-2" />
        )}
      </div>
    )

  if (browserFrame === 'MacOS Light')
    return (
      <div
        className={`flex items-center gap-4 border-b border-[#ECEDEF] bg-[#fefefe] ${
          frameHeight === 'small'
            ? 'h-[3vw] px-[1.6vw]'
            : frameHeight === 'medium'
            ? 'h-[3.4vw] px-[1.8vw]'
            : 'h-[3.8vw] px-[2vw]'
        }`}
      >
        <div
          className={`flex basis-[5%]  ${
            frameHeight === 'small'
              ? 'gap-[0.6vw] [&>*]:h-[0.7vw] [&>*]:w-[0.7vw]'
              : 'gap-[0.7vw] [&>*]:h-[0.9vw] [&>*]:w-[0.9vw]'
          }`}
        >
          <div className="rounded-full bg-[#f7645c]" />
          <div className="rounded-full bg-[#fbc341]" />
          <div className="rounded-full bg-[#3cc84a]" />
        </div>
        {showSearchBar && (
          <div className="flex h-[50%] w-full flex-1 items-center rounded-md bg-[#F7F6F7] px-2" />
        )}
      </div>
    )

  if (browserFrame === 'Arc') return null
}
