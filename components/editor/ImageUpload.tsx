/* eslint-disable @next/next/no-img-element */
'use client'

import { Upload } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'
import { Button } from '../ui/Button'
import { useImageUploaded } from '@/hooks/use-image-uploaded'

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { isImageUploaded, setIsImageUploaded } = useImageUploaded()

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setIsImageUploaded(true)
    }
  }

  return (
    <>
      {!selectedImage && (
        <>
          <div className="w-35 h-25 absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
            <div className="flex scale-110 flex-col gap-4 rounded-xl border-[3px] border-border bg-primary px-16 py-20 text-center shadow-md  dark:bg-sidebar">
              <div className="flex flex-col items-center justify-center rounded-lg border  border-[#23272c] bg-sidebar p-10">
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
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>

                <p className="text-sm leading-5 text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>

              <div className="relative mb-6 mt-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800/40" />
                </div>
                <div className="relative flex justify-center text-[0.75rem]">
                  <span className="bg-sidebar px-6 text-gray-500 dark:text-dark/80">
                    OR
                  </span>
                </div>
              </div>

              <form className="flex gap-3">
                <input
                  type="text"
                  id="text"
                  placeholder="Import from image address"
                  className="h-10 w-full overflow-hidden truncate rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900  placeholder:text-sm placeholder:text-dark/40 focus:border-[#8e8ece] focus:outline-none focus:ring-1 focus:ring-[#8e8ece] dark:border-[#22262b] dark:bg-dark dark:text-gray-100 md:text-sm"
                />
                <Button variant="stylish" className="rounded-lg">
                  Import
                </Button>
              </form>
            </div>
          </div>
        </>
      )}

      {selectedImage && isImageUploaded && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
          <img
            className="h-full w-full scale-125 rounded-2xl shadow-xl"
            src={selectedImage}
            alt="Uploaded image"
          />
        </div>
      )}
    </>
  )
}

export default ImageUpload
