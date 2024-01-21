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
import { Settings2 } from 'lucide-react'
import { Key, useState } from 'react'

export default function PatternPicker() {
  const {
    setImageBackground,
    imageBackground,
    setAttribution,
    setHighResBackground,
    highResBackground,
    setBackgroundType,
  } = useBackgroundOptions()
  const [currentPage, setCurrentPage] = useState(1)

  const fetchUnsplashPatterns = async (page: number) => {
    const response = await fetch(
      `https://api.unsplash.com/collections/W121KJsaTEs/photos?page=${page}&per_page=30&q=100&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
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
    queryKey: ['unsplash-patterns', currentPage],
    queryFn: () => fetchUnsplashPatterns(currentPage),
  })

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
          <span>Wallpapers:</span>
        </h3>
        <ul className="mt-4 grid auto-rows-auto grid-cols-4 gap-4 md:max-w-[18rem] md:grid-cols-5">
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
        <span>Wallpapers:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Settings2 size={20} className="rotate-90" />
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col flex-wrap gap-3">
            <div className="flex gap-3">
              <h1 className="text-[0.85rem]">High resolution background</h1>
              <Switch
                checked={highResBackground}
                onCheckedChange={(checked) => {
                  setHighResBackground(checked)
                }}
              />
            </div>
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
                  setBackgroundType('pattern')
                  setImageBackground(
                    highResBackground
                      ? `${data.urls.full}`
                      : `${data.urls.regular}`
                  )
                  setAttribution({
                    name: data.user.first_name,
                    link: data.user.username,
                  })
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

      <div className="flex justify-end gap-2 md:max-w-[18rem]">
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
          disabled={currentPage === 2}
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
