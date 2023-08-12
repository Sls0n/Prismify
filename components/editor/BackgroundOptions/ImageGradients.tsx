'use client'

import { Key, useState } from 'react'
import { Skeleton } from '@/components/ui/Skeleton'
import { useBackgroundOptions } from '@/store/use-background-options'
import { toast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/Button'

export default function ImageGradients() {
  const { setImageBackground, imageBackground } = useBackgroundOptions()
  const [currentPage, setCurrentPage] = useState(1)

  const fetchUnsplashPictures = async (page: number) => {
    const response = await fetch(
      `https://api.unsplash.com/collections/5wgHcmn38m4/photos?page=${page}&per_page=55&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    )
    const data = await response.json()
    return data
  }

  const {
    isLoading,
    isError,
    data: unsplashData,
    error,
  } = useQuery({
    queryKey: ['unsplash-gradients', currentPage],
    queryFn: () => fetchUnsplashPictures(currentPage),
  })

  if (isLoading) {
    const skeletonLoaders = Array.from({ length: 30 }).map((_, index) => (
      <li
        className={`aspect-square h-12 w-12 rounded-md`}
        key={`skeleton-${index}`}
      >
        <Skeleton className="h-full w-full rounded-md" />
      </li>
    ))

    return (
      <>
        <h3 className="mt-8 flex items-center gap-2 text-xs font-medium uppercase text-dark/70">
          <span>Images:</span>
        </h3>
        <ul className="mt-4 grid max-w-[18rem] auto-rows-auto grid-cols-5 gap-4">
          {skeletonLoaders}
        </ul>
      </>
    )
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

      <ul className="mt-4 grid max-w-[18rem] auto-rows-auto grid-cols-5 gap-4">
        {unsplashData.map(
          (data: {
            id: Key | null | undefined
            urls: { small_s3: string | null | undefined; regular: any }
            alt_description: string | undefined
          }) => (
            <li className={`aspect-square h-12 w-12 rounded-md`} key={data.id}>
              <button
                className={`h-full w-full rounded-md ${
                  imageBackground === data.urls.regular &&
                  'outline-none ring-2 ring-ring ring-offset-2'
                }`}
                onClick={() => {
                  setImageBackground(`${data.urls.regular}`)
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
      <div className="flex max-w-[18rem] justify-end gap-2">
        <Button
          size="sm"
          variant={'stylish'}
          disabled={currentPage === 1}
          className="mt-4 text-sm"
          onClick={() => {
            setCurrentPage((prevPage) => prevPage - 1)
          }}
        >
          &larr; Back
        </Button>
        <Button
          size="sm"
          variant={'stylish'}
          disabled={currentPage === 3}
          className="mt-4 text-sm"
          onClick={() => {
            setCurrentPage((prevPage) => prevPage + 1)
          }}
        >
          Next &rarr;
        </Button>
      </div>
    </>
  )
}
