import { Button } from '@/components/ui/Button'
import { FrameTypes, useFrameOptions } from '@/store/use-frame-options'
import { useImageOptions } from '@/store/use-image-options'

export function FrameInsidePopupPreview() {
  const { setBrowserFrame } = useFrameOptions()
  const { setImages, images } = useImageOptions()

  const frameChangeHandler = (frame: FrameTypes) => {
    setBrowserFrame(frame)
    setImages(
      images.map((image) => ({
        ...image,
        style: {
          ...image.style,
          imageRoundness: frame === 'None' ? 0.4 : 0.7,
        },
      }))
    )
  }

  return (
    <>
      <Button
        variant="secondary"
        className={`flex-center relative h-[7rem] w-36 cursor-pointer flex-col gap-2 rounded-md bg-[#ffffff15] ring-1 ring-border`}
        onClick={() => {
          frameChangeHandler('None')
        }}
      >
        <div className="flex-center h-full w-full flex-col rounded-sm bg-primary shadow-xl" />
        <div className="text-xs font-medium text-dark">None</div>
      </Button>

      <Button
        variant="secondary"
        className={`flex-center h-[7rem] w-36 cursor-pointer flex-col gap-2 rounded-md bg-[#ffffff15] ring-1 ring-border`}
        onClick={() => {
          frameChangeHandler('MacOS Dark')
        }}
      >
        <div className="relative flex h-full w-full flex-col  justify-center overflow-hidden rounded-sm shadow-xl">
          <div className="flex w-full basis-[25%] bg-[#454545] shadow-sm">
            <div className={`flex-center basis-[50%] gap-1 `}>
              <div className="h-1.5 w-1.5 rounded-full bg-[#f7645ccc]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#fbc341d2]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#3cc84ac5]" />
            </div>
          </div>
          <div className="w-full flex-1 bg-primary" />
        </div>
        <div className="text-xs font-medium text-dark">MacOS Dark</div>
      </Button>

      <Button
        variant="secondary"
        className={`flex-center h-[7rem] w-36 cursor-pointer flex-col gap-2 rounded-md bg-[#ffffff15] ring-1 ring-border`}
        onClick={() => {
          frameChangeHandler('MacOS Light')
        }}
      >
        <div className="relative flex h-full w-full flex-col  justify-center overflow-hidden rounded-sm shadow-xl">
          <div className="flex w-full basis-[25%] bg-[#E9E8E9] shadow-sm">
            <div className={`flex-center basis-[50%] gap-1 `}>
              <div className="h-1.5 w-1.5 rounded-full bg-[#f7645c]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#fbc341]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#3cc84a]" />
            </div>
          </div>
          <div className="w-full flex-1 bg-primary" />
        </div>
        <div className="text-xs font-medium text-dark">MacOS Light</div>
      </Button>
    </>
  )
}

export function FramePopupPreview() {
  const { browserFrame } = useFrameOptions()

  if (browserFrame === 'None')
    return (
      <div
        className={`flex-center h-[4.5rem] w-24 cursor-pointer flex-col gap-2 rounded-md`}
      >
        <div className="relative flex h-full w-full flex-col  justify-center overflow-hidden rounded-sm shadow-xl">
          <div className="w-full flex-1 bg-primary" />
        </div>
      </div>
    )

  if (browserFrame === 'MacOS Dark')
    return (
      <div
        className={`flex-center h-[4.5rem] w-24 cursor-pointer flex-col gap-2 rounded-md`}
      >
        <div className="relative flex h-full w-full flex-col  justify-center overflow-hidden rounded-sm shadow-xl">
          <div className="flex w-full basis-[25%] bg-[#454545] shadow-sm">
            <div className={`flex-center basis-[50%] gap-1 `}>
              <div className="h-1.5 w-1.5 rounded-full bg-[#f7645ccc]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#fbc341d2]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#3cc84ac5]" />
            </div>
          </div>
          <div className="w-full flex-1 bg-primary" />
        </div>
      </div>
    )

  if (browserFrame === 'MacOS Light')
    return (
      <div
        className={`flex-center h-[4.5rem] w-24 cursor-pointer flex-col gap-2 rounded-md`}
      >
        <div className="relative flex h-full w-full flex-col  justify-center overflow-hidden rounded-sm shadow-xl">
          <div className="flex w-full basis-[25%] bg-[#E3E2E3] shadow-sm">
            <div className={`flex-center basis-[50%] gap-1 `}>
              <div className="h-1.5 w-1.5 rounded-full bg-[#f7645c]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#fbc341]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#3cc84a]" />
            </div>
          </div>
          <div className="w-full flex-1 bg-primary" />
        </div>
      </div>
    )
}
