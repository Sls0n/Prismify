/* eslint-disable @next/next/no-img-element */
'use client'

import { Upload } from 'lucide-react'
import React, { CSSProperties, ChangeEvent } from 'react'
import { useImageOptions } from '@/store/use-image-options'
import BrowserFrame from './BrowserFrame'

const ImageUpload = () => {
  const {
    isImageUploaded,
    setIsImageUploaded,
    image,
    setImage,
    imageSize,
    imageRoundness,
    imageShadow,
  } = useImageOptions()

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      setIsImageUploaded(true)
    }
  }

  const imageStyle: CSSProperties = {
    transform: `scale(${imageSize}) translate(0%, 0%)`,
    borderRadius: `${imageRoundness}rem`,
    boxShadow: `${imageShadow}`,
    border: `var(--borderSize) solid var(--borderColor)`,
    background: `var(--borderColor)`,
  }

  return (
    <>
      {!image && !isImageUploaded && (
        <>
          <div className="h-25 absolute-center w-4/5 lg:w-3/5">
            <div className="scale flex flex-col gap-4 rounded-xl border-[3px] border-border text-center shadow-md ">
              <div className="flex flex-col items-center justify-center rounded-lg bg-sidebar p-10">
                <Upload
                  className="mx-auto h-10 w-10 text-gray-400"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-base leading-6 text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="focus-within:ring-purple relative cursor-pointer rounded-md font-semibold text-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="sr-only"
                  />
                  <p className="hidden pl-1 sm:block">or drag and drop</p>
                </div>

                <p className="text-sm leading-5 text-gray-400/80">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {image && isImageUploaded && (
        <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div
            className="flex h-full w-full flex-col overflow-hidden"
            style={imageStyle}
          >
            <BrowserFrame />
            <img
              className={`h-full w-full flex-1`}
              src={image}
              alt="Uploaded image"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageUpload
