'use client'

import UnsplashGalleryPicker from '../shared/unsplash-gallery-picker'

export default function ImageGradientPicker() {
  return (
    <UnsplashGalleryPicker
      title="Images"
      collectionId="5wgHcmn38m4"
      backgroundType="gradient"
      queryKey="unsplash-gradients"
      maxPages={3}
      triggerDownload
    />
  )
}
