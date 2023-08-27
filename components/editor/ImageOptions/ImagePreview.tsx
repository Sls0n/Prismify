import { ChangeEvent, useRef } from 'react'
import { X, Plus } from 'lucide-react'
import { useImageOptions } from '@/store/use-image-options'

type ImagePreviewProps = {}

export default function ImagePreview({}: ImagePreviewProps) {
  const { setImages, images } = useImageOptions()

  const uploadRef = useRef<HTMLInputElement>(null)

  const handleImageDelete = () => {
    // setImage('')
    // TODO
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImages([...images, { image: imageUrl, id: images.length + 1 }])
    }
  }

  return (
    <>
      <div className="mb-3 mt-4 flex h-[4rem] gap-6 px-1 text-sm">
        <div className="relative flex h-full basis-[25%] flex-col rounded-xl  border-2 border-[#898aeb]/20 p-1 hover:border-[#898aeb]/60">
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
          </>
          {/* {images && (
            <>
              <img
                className="h-full w-full rounded-lg object-cover"
                src={images}
                alt="uploaded image"
              />
              <button
                onClick={handleImageDelete}
                className="absolute right-1 top-1 rounded-lg bg-sidebar p-[0.2rem] drop-shadow-sm"
                aria-label="delete image"
              >
                <X className="text-red-400" size={16} />
              </button>
            </>
          )} */}
        </div>
      </div>
    </>
  )
}
