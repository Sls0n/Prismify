import { useFrameOptions } from '@/store/use-frame-options'

export default function BrowserFrame() {
  const { browserFrame, frameHeight, showSearchBar } = useFrameOptions()

  if (browserFrame === 'None') return

  if (browserFrame === 'MacOS Dark')
    return (
      <div
        className={`flex items-center gap-4 bg-[#454545] px-6 ${
          frameHeight === 'small'
            ? 'basis-[1.5rem]'
            : frameHeight === 'medium'
            ? 'basis-[1.7rem]'
            : 'basis-[2rem]'
        }`}
      >
        <div
          className={`flex basis-[5%] gap-1.5 ${
            frameHeight === 'small'
              ? '[&>*]:h-1.5 [&>*]:w-1.5'
              : '[&>*]:h-2 [&>*]:w-2'
          }`}
        >
          <div className="rounded-full bg-[#f7645ccc]" />
          <div className="rounded-full bg-[#fbc341d2]" />
          <div className="rounded-full bg-[#3cc84ac5]" />
        </div>
        {showSearchBar && <div className="flex h-[50%] w-full flex-1 items-center rounded-[0.25rem] bg-[#575657] px-2" />}
      </div>
    )

  if (browserFrame === 'MacOS Light')
    return (
      <div
        className={`flex items-center gap-4 bg-gradient-to-r from-[#E3E8E9] to-[#DFDEDF] to-90%  px-6 ${
          frameHeight === 'small'
            ? 'basis-[1.5rem]'
            : frameHeight === 'medium'
            ? 'basis-[1.7rem]'
            : 'basis-[2rem]'
        }`}
      >
        <div
          className={`flex basis-[5%] gap-1.5 ${
            frameHeight === 'small'
              ? '[&>*]:h-1.5 [&>*]:w-1.5'
              : '[&>*]:h-2 [&>*]:w-2'
          }`}
        >
          <div className="rounded-full bg-[#f7645c]" />
          <div className="rounded-full bg-[#fbc341]" />
          <div className="rounded-full bg-[#3cc84a]" />
        </div>
        {showSearchBar && <div className="flex h-[50%] w-full flex-1 items-center rounded-[0.25rem] bg-[#ececec] px-2" />}
      </div>
    )
}
