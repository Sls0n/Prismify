export const MIN_RESOLUTION = 100
export const MAX_RESOLUTION = 4000

export const qualities = [
  { quality: '0.5x', value: 0.5 },
  { quality: '1x', value: 1 },
  { quality: '2x', value: 2 },
  { quality: '4x', value: 4 },
]

export const resolutions = [
  {
    name: '1:1 (Pfp)',
    resolution: '1200x1200',
    icon: 'UserSquare2',
  },
  {
    name: '16:9 (Wide)',
    resolution: '1920x1080',
    icon: 'GalleryThumbnails',
  },
  {
    name: '9:16 (Story/Reels)',
    resolution: '1080x1920',
    icon: 'GalleryHorizontalEnd',
  },
  {
    name: '4:3 (Old TV)',
    resolution: '1200x900',
    icon: 'MonitorPlay',
  },
  {
    name: '3:4 (Portrait)',
    resolution: '900x1200',
    icon: 'Smartphone',
  },
  {
    name: '3:1 (Banner)',
    resolution: '3x1',
    icon: 'RectangleHorizontal',
    height: '400px',
  },
  {
    name: '21:9 (Cinematic)',
    resolution: '21x9',
    icon: 'RectangleHorizontal',
    height: '400px',
  },
]
