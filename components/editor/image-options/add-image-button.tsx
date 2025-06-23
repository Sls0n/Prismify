import { ChangeEvent, useRef, useState } from 'react'
import { X, Plus, Upload } from 'lucide-react'
import { useImageOptions } from '@/store/use-image-options'
import { useColorExtractor } from '@/store/use-color-extractor'
import { calculateEqualCanvasSize } from '@/utils/helper-fns'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import Dropzone from 'react-dropzone'

type AddImageButtonProps = {}

export default function AddImageButton({}: AddImageButtonProps) {
  const { setImages, images, defaultStyle } = useImageOptions()
  const { imagesCheck, setImagesCheck } = useColorExtractor()
  const uploadRef = useRef<HTMLInputElement>(null)
  const { automaticResolution, setResolution } = useResizeCanvas()
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleImageUpload = (file: File) => {
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleImageUpload(acceptedFiles[0])
    }
    setIsDragging(false)
  }

  return (
    <div className="mb-4 mt-2 h-[8rem] w-full px-1 text-sm">
      <Dropzone
        multiple={false}
        onDrop={handleDrop}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        accept={{ 'image/*': [] }}
        noClick
      >
        {({ getRootProps, getInputProps, open }) => (
          <div
            {...getRootProps()}
            className={`relative flex h-full w-full flex-col rounded-xl border-2 p-1 transition-all duration-300 ${
              isDragging
                ? 'scale-[1.02] border-[#898aeb] bg-[#898aeb]/10'
                : 'border-[#898aeb]/20 hover:border-[#898aeb]/60'
            }`}
          >
            <div
              className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg"
              onClick={open}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  open()
                }
              }}
            >
              {isDragging ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#898aeb]/20 to-[#d8b9e3]/20">
                  <div className="flex flex-col items-center">
                    <Upload
                      className="mb-2 animate-bounce text-[#898aeb]" 
                      size={24}
                    />
                    <span className="text-sm font-medium text-[#898aeb]">
                      Drop here
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Plus
                    className="mb-2 cursor-pointer text-purple/60 transition-transform focus:ring-1 group-hover:scale-110 group-hover:text-purple/80"
                    size={26}
                  />
                  <span className="text-sm font-medium text-purple/60">
                    Click or drag image
                  </span>
                </div>
              )}
            </div>
            <input
              {...getInputProps()}
              id="upload"
              ref={uploadRef}
              name="upload"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="sr-only"
              tabIndex={-1}
            />
          </div>
        )}
      </Dropzone>
    </div>
  )
}
