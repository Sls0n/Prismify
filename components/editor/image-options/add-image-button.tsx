import { ChangeEvent, useRef } from 'react'
import { X, Plus } from 'lucide-react'
import { useImageOptions } from '@/store/use-image-options'
import { useColorExtractor } from '@/store/use-color-extractor'
import { calculateEqualCanvasSize } from '@/utils/helper-fns'
import { useResizeCanvas } from '@/store/use-resize-canvas'

type AddImageButtonProps = {}

export default function AddImageButton({}: AddImageButtonProps) {
  const { setImages, images, defaultStyle } = useImageOptions()
  const { imagesCheck, setImagesCheck } = useColorExtractor()
  const uploadRef = useRef<HTMLInputElement>(null)
  const { automaticResolution, setResolution } = useResizeCanvas()

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImages([
        ...images,
        {
          image: imageUrl,
          id: images.length + 1,
          style:
            images.length < 1
              ? defaultStyle
              : {
                  ...defaultStyle,
                  imageSize: '0.5',
                },
        },
      ])
      setImagesCheck([...imagesCheck, imageUrl])

      if (images.length > 0) return
      if (automaticResolution) {
        const padding = 200
        const img = new Image()
        img.src = imageUrl

        img.onload = () => {
          const { naturalWidth, naturalHeight } = img
          const newResolution = calculateEqualCanvasSize(
            naturalWidth,
            naturalHeight,
            padding
          )
          setResolution(newResolution.toString())
        }
      }
    }
  }

  return (
    <div className="mb-3 mt-4 hidden h-[4rem] gap-6 px-1 text-sm md:flex">
      <div className="relative flex h-full basis-[32%] flex-col rounded-xl border-2 border-[#898aeb]/20 p-1 hover:border-[#898aeb]/60 ">
        <label
          htmlFor="upload"
          className="group flex h-full w-full cursor-pointer items-center justify-center rounded-xl"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              uploadRef.current?.click()
            }
          }}
        >
          <Plus
            className="cursor-pointer text-purple/60 focus:ring-1 group-hover:text-purple/80"
            size={28}
          />
        </label>
        <input
          id="upload"
          ref={uploadRef}
          name="upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="sr-only "
          tabIndex={-1}
        />
      </div>
    </div>
  )
}
