'use client'

import { useBackgroundOptions } from '@/hooks/use-background-options'
import { toast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { Key } from 'react'

export default function ImageOptions() {
  const { setImageBackground, imageBackground } = useBackgroundOptions()

  const fetchUnsplashPictures = async () => {
    const response = await fetch(
      `https://api.unsplash.com/collections/4269961/photos?orientation=landscape&per_page=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    )
    const data = await response.json()
    console.log(data)
    return data
  }

  const {
    isLoading,
    isError,
    data: unsplashData,
    error,
  } = useQuery({
    queryKey: ['unsplash'],
    queryFn: fetchUnsplashPictures,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError && error instanceof Error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    })
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
        <span>Images:</span>
      </h3>

      <ul className="mt-4 grid max-w-[18rem] auto-rows-auto grid-cols-4 gap-4">
        {unsplashData.map(
          (data: {
            id: Key | null | undefined
            urls: { small_s3: string | null | undefined; full: any }
            alt_description: string | undefined
          }) => (
            <li className={`aspect-square h-16 w-16 rounded-md`} key={data.id}>
              <button
                className={`h-full w-full ${
                  imageBackground === data.urls.full &&
                  'outline-none ring-2 ring-ring ring-offset-2'
                }`}
                onClick={() => {
                  setImageBackground(`${data.urls.full}`)
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-full w-full rounded-md object-cover"
                  src={data.urls.small_s3!}
                  alt={data.alt_description}
                />
              </button>
            </li>
          )
        )}
      </ul>
    </>
  )
}
