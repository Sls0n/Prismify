export const qualities = [
  { quality: '0.5x', value: 0.5 },
  { quality: '1x', value: 1 },
  { quality: '2x', value: 2 },
  { quality: '4x', value: 4 },
]

export const resolutions = [
  {
    name: '1:1 (Pfp)',
    resolution: '1x1',
    icon: 'UserSquare2',
  },
  {
    name: '16:9 (Wide)',
    resolution: '16x9',
    icon: 'GalleryThumbnails',
  },
  {
    name: '9:16 (Story/Reels)',
    resolution: '9x16',
    icon: 'GalleryHorizontalEnd',
  },
  {
    name: '4:3 (Old TV)',
    resolution: '4x3',
    icon: 'MonitorPlay',
  },
  {
    name: '3:4 (Portrait)',
    resolution: '3x4',
    icon: 'Smartphone',
  },
  {
    name: '3:1 (Banner)',
    resolution: '3x1',
    icon: 'RectangleHorizontal',
  },
  {
    name: '21:9 (Cinematic)',
    resolution: '21x9',
    icon: 'RectangleHorizontal',
  },
  {
    name: '1.43:1 (IMAX)',
    resolution: '1.43x1',
    icon: 'RectangleHorizontal',
  },
  {
    name: '1.85:1 (Movie)',
    resolution: '1.85x1',
    icon: 'RectangleHorizontal',
  },
  {
    name: '3.6:1 (Super Ultrawide)',
    resolution: '3.6x1',
    icon: 'RectangleHorizontal',
  },
]

export const shadows = [
  {
    name: 'none',
    fullName: 'None',
    shadow: `0 0 0 0 var(--shadow)`,
    preview: `0 0 0 0 var(--shadow)`,
  },
  {
    name: 'sm',
    fullName: 'Small',
    shadow: `0 4px 6px -1px var(--shadow), 0 2px 4px -2px var(--shadow)`,
    preview: `0 4px 6px -1px var(--shadow), 0 2px 4px -2px var(--shadow)`,
  },
  {
    name: 'md',
    fullName: 'Medium',
    shadow: `0 10px 15px -3px var(--shadow), 0 4px 6px -4px var(--shadow)`,
    preview: `0 10px 15px -3px var(--shadow), 0 4px 6px -4px var(--shadow)`,
  },
  {
    name: 'lg',
    fullName: 'Large',
    shadow: `0 20px 25px -5px var(--shadow), 0 8px 10px -6px var(--shadow)`,
    preview: `0 20px 25px -5px var(--shadow), 0 8px 10px -6px var(--shadow)`,
  },
  {
    name: 'x-lg',
    fullName: 'Extra Large',
    shadow: `0 25px 50px -12px var(--shadow)`,
    preview: `0 25px 50px -12px var(--shadow)`,
  },
  {
    name: 'glow',
    fullName: 'Glow',
    shadow: `0 25px 50px -12px #fff`,
    preview: `0 25px 25px -12px #ffffff50`,
  },
]
