export interface Quality {
  quality: string
  value: number
}

export interface Resolution {
  name: string
  resolution: string
  icon: string
}

export interface Shadow {
  name: string
  fullName: string
  shadow: string
  preview: string
}

export interface Gradient {
  type: 'Normal' | 'Mesh'
  gradient: string
  background?: string
}

export const qualities: Quality[] = [
  { quality: '0.5x', value: 0.5 },
  { quality: '1x', value: 1 },
  { quality: '2x', value: 2 },
  { quality: '4x', value: 4 },
]

export const resolutions: Resolution[] = [
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
    resolution: '1.45x1',
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

export const shadows: Shadow[] = [
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

export const gradients: Gradient[] = [
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(202, 194, 255), rgb(242, 231, 248) 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(165, 210, 202), rgb(248, 241, 241) 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(246, 244, 231), rgb(248, 201, 195) 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(134, 227, 206), rgb(208, 230, 165) 100%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(249, 168, 212)',
    gradient:
      'radial-gradient(at 95% 85%, rgb(217, 249, 157) 0, transparent 0%), radial-gradient(at 49% 91%, rgb(255, 228, 230) 0, transparent 86%), radial-gradient(at 44% 80%, rgb(126, 34, 206) 0, transparent 25%), radial-gradient(at 62% 12%, rgb(99, 102, 241) 0, transparent 44%), radial-gradient(at 100% 100%, rgb(99, 102, 241) 0, transparent 100%), radial-gradient(at 42% 66%, rgb(253, 164, 175) 0, transparent 66%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(153, 246, 228)',
    gradient:
      'radial-gradient(at 46% 16%, rgb(243, 244, 246) 0, transparent 50%), radial-gradient(at 1% 69%, rgb(204, 251, 241) 0, transparent 89%), radial-gradient(at 25% 49%, rgb(212, 212, 216) 0, transparent 81%), radial-gradient(at 43% 53%, rgb(209, 213, 219) 0, transparent 6%), radial-gradient(at 75% 4%, rgb(251, 113, 133) 0, transparent 45%), radial-gradient(at 44% 91%, rgb(107, 114, 128) 0, transparent 5%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(249, 168, 212)',
    gradient:
      'radial-gradient(at 95% 85%, rgb(217, 249, 157) 0, transparent 100%), radial-gradient(at 49% 91%, rgb(255, 228, 230) 0, transparent 86%), radial-gradient(at 44% 80%, rgb(191, 219, 254) 0, transparent 21%), radial-gradient(at 62% 12%, rgb(254, 202, 202) 0, transparent 75%), radial-gradient(at 66% 75%, rgb(39, 39, 42) 0, transparent 38%), radial-gradient(at 42% 66%, rgb(253, 164, 175) 0, transparent 66%)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(0deg, #131313, #151515 100%)',
  },
]

export const solidColors = [
  {
    background: 'transparent',
  },
  {
    background: '#cac2ff',
  },
  {
    background: '#f9a8d4',
  },
  {
    background: '#e8e2ba',
  },
  {
    background: '#d9f99d',
  },
  {
    background: '#90ee90',
  },
  {
    background: '#E3E9F1',
  },
]
