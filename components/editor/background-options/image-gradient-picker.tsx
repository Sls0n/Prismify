'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Settings2 } from 'lucide-react'
import { Key, useEffect, useState } from 'react'

export default function ImageGradientPicker() {
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
    refetch,
    data: unsplashData,
    error,
  } = useQuery({
    queryKey: ['unsplash-gradients'],
    queryFn: () => fetchUnsplashPictures(currentPage),
  })

  useEffect(
    () => {
      refetch()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]
  )

  if (isLoading) {
    const skeletonLoaders = Array.from({ length: 30 }).map((_, index) => (
      <li
        className={`h-[2.56rem] w-[2.56rem] rounded-md`}
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

      <ul className="mt-4 flex grid-cols-5 flex-wrap gap-x-2.5 gap-y-3 md:grid">
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
            <li className={`h-[2.56rem] w-[2.56rem] rounded-md`} key={data.id}>
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

      <div className="flex justify-end mt-6 gap-2">
        <Button
          size="sm"
          variant={'stylish'}
          disabled={currentPage === 1}
          className="text-sm flex-center h-9 px-2.5"
          onClick={() => {
            setCurrentPage((prevPage) => prevPage - 1)
          }}
        >
          <ChevronLeft size={16} className="mr-1 translate-y-[1px]" />
          <p>Back</p>
        </Button>
        <Button
          variant={'stylish'}
          disabled={currentPage === 3}
          className="text-sm flex-center h-9 px-2.5"
          onClick={() => {
            setCurrentPage((prevPage) => prevPage + 1)
          }}
        >
          <p>Next</p> 
          <ChevronRight size={16} className="ml-1 translate-y-[1px]" />
        </Button>
      </div>
    </>
  )
}
