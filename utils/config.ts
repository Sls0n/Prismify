export const MIN_RESOLUTION = 100
export const MAX_RESOLUTION = 5000

export interface Quality {
  quality: string
  value: number
}

export interface Resolution {
  name: string
  resolutions?: Array<{
    preset: string
    resolution: string
  }>
  icon?: string
  color?: string
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
  { name: 'Fit' },
  {
    name: 'Facebook',
    resolutions: [
      {
        preset: 'News feed',
        resolution: '1200x1200',
      },
      {
        preset: 'Story',
        resolution: '1080x1920',
      },
      {
        preset: 'Event',
        resolution: '1920x1005',
      },
    ],
    icon: 'Facebook',
    color: '#1877F2',
  },
  {
    name: 'Youtube',
    resolutions: [
      {
        preset: 'Thumbnail',
        resolution: '1280x720',
      },
      {
        preset: 'Profile',
        resolution: '800x800',
      },
      {
        preset: 'Banner',
        resolution: '1546x423',
      },
    ],
    icon: 'Youtube',
    color: '#c4302b',
  },
  {
    name: 'Instagram',
    resolutions: [
      {
        preset: 'Feed',
        resolution: '1080x1080',
      },
      {
        preset: 'Portrait',
        resolution: '1080x1350',
      },
      {
        preset: 'Story/Reels',
        resolution: '1080x1920',
      },
    ],
    icon: 'Instagram',
    color: '#d62976',
  },
  {
    name: 'Twitter',
    resolutions: [
      {
        preset: 'Post',
        resolution: '2400x1350',
      },
      {
        preset: 'Header',
        resolution: '1500x500',
      },
    ],
    icon: 'Twitter',
    color: '#2E9DEA',
  },
  {
    name: 'LinkedIn',
    resolutions: [
      {
        preset: 'Post',
        resolution: '1200x1200',
      },
      {
        preset: 'Banner',
        resolution: '1584x396',
      },
    ],
    icon: 'LinkedIn',
    color: '#0077b5',
  },
  {
    name: 'Dribble',
    resolutions: [
      {
        preset: 'Shot',
        resolution: '1600x1200',
      },
      {
        preset: 'Shot 2k',
        resolution: '2800x2100',
      },
    ],
    icon: 'Dribble',
    color: '#D83A79',
  },
  {
    name: 'ProductHunt',
    resolutions: [
      {
        preset: 'Gallery',
        resolution: '1270x760',
      },
    ],
    icon: 'ProductHunt',
    color: '#D55124',
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
    name: 'spread',
    fullName: 'Spread',
    shadow: `0 25px 50px -12px var(--shadow)`,
    preview: `0 25px 50px -12px var(--shadow)`,
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
    name: 'glow',
    fullName: 'Glow',
    shadow: `0 25px 50px -12px #fff`,
    preview: `0 25px 25px -12px #ffffff50`,
  },
]

export const gradients: Gradient[] = [
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #E3E9F1, #E3E9F1 100%)',
  },
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
    type: 'Normal',
    gradient: 'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(to top, #f77062 0%, #fe5196 100%)',
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
