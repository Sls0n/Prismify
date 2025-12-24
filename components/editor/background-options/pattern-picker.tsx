'use client'

import UnsplashGalleryPicker from '../shared/unsplash-gallery-picker'

export default function PatternPicker() {
  return (
    <UnsplashGalleryPicker
      title="Abstract"
      collectionId="W121KJsaTEs"
      backgroundType="pattern"
      queryKey="unsplash-patterns"
      maxPages={2}
    />
  )
}
