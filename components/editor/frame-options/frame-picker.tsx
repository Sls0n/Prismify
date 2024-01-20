import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FrameTypes, useFrameOptions } from '@/store/use-frame-options'
import { useImageOptions, useSelectedLayers } from '@/store/use-image-options'
import { useMoveable } from '@/store/use-moveable'
import { cn } from '@/utils/button-utils'

export default function FramePicker() {
  const { setFrameHeight, frameHeight } = useFrameOptions()
  const { selectedImage } = useSelectedLayers()
  const { setImages, images } = useImageOptions()
  const { setShowControls } = useMoveable()

  const frameChangeHandler = (frame: FrameTypes) => {
    selectedImage &&
      setImages(
        images.map((image, index) =>
          index === selectedImage - 1
            ? {
                ...image,
                frame,
                style: {
                  ...image.style,
                  imageRoundness:
                    frame === 'None' ? 0.4 : frame === 'Arc' ? 1.5 : 0.7,
                },
              }
            : image
        )
      )
    setShowControls(false)
  }

  return (
    <>
      <div
        className={`mb-3 mt-4 flex items-center px-1 md:max-w-full 
        ${selectedImage ? '' : 'pointer-events-none opacity-40'}
      `}
      >
        <h1 className="text-[0.85rem]">Browser frames:</h1>
      </div>

      <div className="mt-2 grid w-full grid-cols-3 flex-wrap gap-x-2.5 gap-y-6">
        <FrameContainer
          text="None"
          onClick={() => {
            frameChangeHandler('None')
          }}
        >
          <div className="flex h-full w-full flex-col justify-center overflow-hidden rounded-sm">
            <div className="w-full flex-1 bg-primary/80" />
          </div>
        </FrameContainer>

        <FrameContainer
          text="MacOS Dark"
          onClick={() => {
            frameChangeHandler('MacOS Dark')
          }}
        >
          <div className="flex h-full w-full flex-col justify-center overflow-hidden rounded-sm">
            <div className="flex w-full basis-[30%] bg-[#454545] shadow-sm">
              <div className={`flex-center basis-[50%] gap-0.5 `}>
                <div className="h-1 w-1 rounded-full bg-[#f7645ccc]" />
                <div className="h-1 w-1 rounded-full bg-[#fbc341d2]" />
                <div className="h-1 w-1 rounded-full bg-[#3cc84ac5]" />
              </div>
            </div>
            <div className="w-full flex-1 bg-primary/80" />
          </div>
        </FrameContainer>

        <FrameContainer
          text="MacOS Light"
          onClick={() => {
            frameChangeHandler('MacOS Light')
          }}
        >
          <div className="flex h-full w-full flex-col justify-center overflow-hidden rounded-sm">
            <div className="flex w-full basis-[30%] bg-[#E3E2E3] shadow-sm">
              <div className={`flex-center basis-[50%] gap-0.5 `}>
                <div className="h-1 w-1 rounded-full bg-[#f7645ccc]" />
                <div className="h-1 w-1 rounded-full bg-[#fbc341d2]" />
                <div className="h-1 w-1 rounded-full bg-[#3cc84ac5]" />
              </div>
            </div>
            <div className="w-full flex-1 bg-primary/80" />
          </div>
        </FrameContainer>

        <FrameContainer
          text="Arc"
          onClick={() => {
            frameChangeHandler('Arc')
          }}
        >
          <div className="flex-center h-[4.5rem] w-24 flex-col rounded-sm border border-[#fff]/20 bg-[#fff]/20 p-1 shadow-xl">
            <div className="h-full w-full rounded-[2px] bg-primary shadow-sm" />
          </div>
        </FrameContainer>

        <FrameContainer
          text="Shadow"
          onClick={() => {
            frameChangeHandler('Shadow')
          }}
          className="translate-y-2"
        >
          <div className="flex-center h-[4.5rem] w-24 flex-col rounded-sm">
            <div className="h-full w-full rounded-[2px] bg-primary/80" />
          </div>
        </FrameContainer>
      </div>

      {selectedImage &&
        images[selectedImage - 1]?.frame !== 'Shadow' &&
        images[selectedImage - 1]?.frame !== 'None' && (
          <div
            className={`mt-8 flex flex-col gap-3 px-1 md:max-w-full ${
              selectedImage ? '' : 'pointer-events-none opacity-40'
            }`}
          >
            <h1 className="text-[0.85rem]">Frame size</h1>
            <Select
              defaultValue={frameHeight}
              onValueChange={(value) => setFrameHeight(value)}
            >
              <SelectTrigger className="w-[7rem]">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent className="w-[7rem]">
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
    </>
  )
}

export function FrameContainer({
  children,
  text,
  onClick,
  className,
}: {
  children: React.ReactNode
  text: FrameTypes
  onClick?: () => void
  className?: string
}) {
  const { selectedImage } = useSelectedLayers()
  const { images } = useImageOptions()

  return (
    <div className={`${selectedImage ? '' : 'pointer-events-none opacity-40'}`}>
      <button
        onClick={onClick}
        className={`relative h-[3.55rem] w-[4.6rem] overflow-hidden whitespace-nowrap rounded-lg border border-border/80 bg-gray-300 ring-offset-background transition-colors focus:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
          selectedImage && images[selectedImage - 1]?.frame === text
            ? 'ring-2 ring-ring ring-offset-2'
            : ''
        }`}
      >
        <div
          className={cn(
            'absolute bottom-0 h-2/3 w-2/3 translate-x-1/2 translate-y-1 scale-150  overflow-hidden rounded-sm',
            className
          )}
          style={{
            boxShadow: `0px 10px 40px #000${
              text === 'Shadow' ? ',-4px -3.5px rgba(0,0,0,0.8)' : ''
            }`,
          }}
        >
          {children}
        </div>
      </button>

      <p className="mt-2 text-center text-[0.75rem] font-medium text-dark">
        {text.replace('MacOS', 'Mac')}
      </p>
    </div>
  )
}
