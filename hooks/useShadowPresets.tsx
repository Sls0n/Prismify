'use client'

import { useImageOptions } from '@/hooks/use-image-options'

export const useCreateShadows = () => {
  const { shadowColor } = useImageOptions()

  return [
    {
      name: 'none',
      fullName: 'None',
      shadow: `0 0 0 0 ${shadowColor}`,
    },
    {
      name: 'sm',
      fullName: 'Small',
      shadow: `0 4px 6px -1px ${shadowColor}26, 0 2px 4px -2px ${shadowColor}26`,
    },
    {
      name: 'md',
      fullName: 'Medium',
      shadow: `0 10px 15px -3px ${shadowColor}30, 0 4px 6px -4px ${shadowColor}30`,
    },
    {
      name: 'lg',
      fullName: 'Large',
      shadow: `0 20px 25px -5px ${shadowColor}33, 0 8px 10px -6px ${shadowColor}33`,
    },
    {
      name: 'x-lg',
      fullName: 'Extra Large',
      shadow: `0 25px 50px -12px ${shadowColor}4d`,
    },
    {
      name: 'glow',
      fullName: 'Glow',
      shadow: `0 25px 50px -12px #ffffff4d`,
    },
  ]
}
