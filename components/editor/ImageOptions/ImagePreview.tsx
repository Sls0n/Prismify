import { ChangeEvent, useRef } from 'react'
import { X, Upload } from 'lucide-react'
import { useImageOptions } from '@/hooks/use-image-options'

type ImagePreviewProps = {}

export default function ImagePreview({}: ImagePreviewProps) {
  const { isImageUploaded, image, setImage, setIsImageUploaded } =
    useImageOptions()

  const uploadRef = useRef<HTMLInputElement>(null)

  const handleImageDelete = () => {
    setImage('')
    setIsImageUploaded(false)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      setIsImageUploaded(true)
    }
  }

  return (
    <div className="mb-3 mt-4 flex h-[5rem] gap-6 px-1 text-sm">
      <div className="relative flex h-full basis-[35%] flex-col rounded-xl  border-2 border-[#898aeb]/20 p-1 hover:border-[#898aeb]/60">
        {!isImageUploaded && (
          <>
            <label
              htmlFor="upload"
              className="flex-center group h-full w-full cursor-pointer rounded-xl"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  uploadRef.current?.click()
                }
              }}
            >
              <Upload
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
          </>
        )}
        {isImageUploaded && image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full rounded-lg object-cover"
              src={image}
              alt="uploaded image"
            />
            <button
              onClick={handleImageDelete}
              className="absolute right-1 top-1"
            >
              <X
                className=" text-red-500 ring-1 ring-inset ring-red-500/10"
                size={18}
                aria-label="delete image"
              />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
