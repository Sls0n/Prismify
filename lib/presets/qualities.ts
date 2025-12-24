export interface Quality {
  quality: string
  value: number
}

export const qualities = [
  { quality: '0.5x Low', value: 0.5 },
  { quality: '1x Default', value: 1 },
  { quality: '2x QHD', value: 2 },
  { quality: '4x UHD', value: 4 },
]