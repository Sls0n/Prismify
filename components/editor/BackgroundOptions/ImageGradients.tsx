'use client'

import { Key, useState } from 'react'
import { Skeleton } from '@/components/ui/Skeleton'
import { useBackgroundOptions } from '@/store/use-background-options'
import { toast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/Button'
import { Settings2 } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Switch } from '@/components/ui/Switch'

export default function ImageGradients() {
  const {
    setImageBackground,
    imageBackground,
    setAttribution,
    setHighResBackground,
    highResBackground,
    setBackgroundType,
  } = useBackgroundOptions()
  const [currentPage, setCurrentPage] = useState(1)

  const fetchUnsplashPictures = async (page: number) => {
    const response = await fetch(
      `https://api.unsplash.com/collections/5wgHcmn38m4/photos?page=${page}&per_page=55&q=100&fit=clip&w=1500&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
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
        <span>Unsplash gradients:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Settings2 size={20} />
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-wrap gap-3">
            <h1 className="text-[0.85rem]">High resolution background</h1>
            <Switch
              checked={highResBackground}
              onCheckedChange={(checked) => {
                setHighResBackground(checked)
              }}
            />
          </PopoverContent>
        </Popover>
      </h3>

      <ul className="mt-4 w-full h-full flex flex-wrap gap-3">
        {unsplashData.map(
          (data: {
            user: any
            links: any
            id: Key | null | undefined
            urls: {
              regular: string | null
              small_s3: string | undefined
              full: string | undefined
            }
            alt_description: string | undefined
          }) => (
            <li className={`rounded-md w-[3.25rem] h-[3.25rem]`} key={data.id}>
              <button
                className={`h-full w-full rounded-md ${
                  imageBackground ===
                    (highResBackground
                      ? `${data.urls.full}`
                      : `${data.urls.regular}`) &&
                  'outline-none ring-2 ring-ring ring-offset-2'
                }`}
                onClick={() => {
                  setBackgroundType('gradient')
                  setImageBackground(
                    highResBackground
                      ? `${data.urls.full}`
                      : `${data.urls.regular}`
                  )
                  setAttribution({
                    name: data.user.first_name,
                    link: data.user.username,
                  })
                  // Just triggering a download (Unsplash guideline)
                  fetch(
                    `${data.links.download_location}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
                  )
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

      <div className="flex gap-2">
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
