import { useFrameOptions } from '@/store/use-frame-options'

export default function BrowserFrame() {
  const { browserFrame, frameHeight, showSearchBar } = useFrameOptions()

  if (browserFrame === 'None') return

  if (browserFrame === 'MacOS Dark')
    return (
      <div
        className={`flex items-center gap-4 border-b border-[#333]/20 bg-[#454545]  ${
          frameHeight === 'small'
            ? 'basis-[24px] px-4'
            : frameHeight === 'medium'
            ? 'basis-[27px] px-5'
            : 'basis-[32px] px-6 '
        }`}
      >
        <div
          className={`flex basis-[5%]  ${
            frameHeight === 'small'
              ? 'gap-1 [&>*]:h-1.5 [&>*]:w-1.5'
              : 'gap-1.5 [&>*]:h-2 [&>*]:w-2'
          }`}
        >
          <div className="rounded-full bg-[#f7645ccc]" />
          <div className="rounded-full bg-[#fbc341d2]" />
          <div className="rounded-full bg-[#3cc84ac5]" />
        </div>
        {showSearchBar && (
          <div className="flex h-[50%] w-full flex-1 items-center rounded-[0.25rem] bg-[#575657] px-2" />
        )}
      </div>
    )

  if (browserFrame === 'MacOS Light')
    return (
      <div
        className={`flex items-center gap-4 border-b border-[#A7AAB4]/20 bg-[#fefefe] ${
          frameHeight === 'small'
            ? 'basis-[24px] px-4'
            : frameHeight === 'medium'
            ? 'basis-[27px] px-5'
            : 'basis-[32px] px-6 '
        }`}
      >
        <div
          className={`flex basis-[5%]  ${
            frameHeight === 'small'
              ? 'gap-1 [&>*]:h-1.5 [&>*]:w-1.5'
              : 'gap-1.5 [&>*]:h-2 [&>*]:w-2'
          }`}
        >
          <div className="rounded-full bg-[#f7645c]" />
          <div className="rounded-full bg-[#fbc341]" />
          <div className="rounded-full bg-[#3cc84a]" />
        </div>
        {showSearchBar && (
          <div className="flex h-[50%] w-full flex-1 items-center rounded-[0.25rem] bg-[#F7F6F7] px-2" />
        )}
      </div>
    )
}
