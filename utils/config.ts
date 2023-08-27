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
    name: 'bottom',
    fullName: 'Bottom',
    shadow: `0 25px 50px -12px var(--shadow)`,
    preview: `0 25px 50px -12px var(--shadow)`,
  },
  {
    name: 'subtle',
    fullName: 'Subtle',
    shadow: `0px 6px 20px var(--shadow)`,
    preview: `0px 6px 20px var(--shadow)`,
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
    gradient: 'linear-gradient(var(--gradient-angle), #DFE0E2, #E3E9F1 100%)',
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
    gradient: 'linear-gradient(120deg, #898aeb, #d8b9e3)',
  },
{
    type: 'Normal',
    gradient: 'conic-gradient(at bottom left,#fbcfe8, #4f46e5,#6ee7b7)',
  },
  {
    type: 'Mesh',
    background: 'rgb(249, 168, 212)',
    gradient:
      'radial-gradient(at 95% 85%, rgb(217, 249, 157) 0, transparent 0%), radial-gradient(at 49% 91%, rgb(255, 228, 230) 0, transparent 86%), radial-gradient(at 44% 80%, rgb(126, 34, 206) 0, transparent 25%), radial-gradient(at 62% 12%, rgb(99, 102, 241) 0, transparent 44%), radial-gradient(at 100% 100%, rgb(99, 102, 241) 0, transparent 100%), radial-gradient(at 42% 66%, rgb(253, 164, 175) 0, transparent 66%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(153, 189, 255)',
    gradient:
      'radial-gradient(at 9% 7%, rgb(115, 237, 210) 0px, transparent 50%), radial-gradient(at 41% 63%, rgb(250, 153, 235) 0px, transparent 50%), radial-gradient(at 40% 79%, rgb(242, 74, 183) 0px, transparent 50%), radial-gradient(at 80% 86%, rgb(250, 142, 232) 0px, transparent 50%), radial-gradient(at 28% 23%, rgb(211, 123, 224) 0px, transparent 50%), radial-gradient(at 82% 83%, rgb(219, 231, 116) 0px, transparent 50%), radial-gradient(at 64% 38%, rgb(146, 114, 233) 0px, transparent 50%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(249, 168, 212)',
    gradient:
      'radial-gradient(at 95% 85%, rgb(217, 249, 157) 0, transparent 100%), radial-gradient(at 49% 91%, rgb(255, 228, 230) 0, transparent 86%), radial-gradient(at 44% 80%, rgb(191, 219, 254) 0, transparent 21%), radial-gradient(at 62% 12%, rgb(254, 202, 202) 0, transparent 75%), radial-gradient(at 66% 75%, rgb(39, 39, 42) 0, transparent 38%), radial-gradient(at 42% 66%, rgb(253, 164, 175) 0, transparent 66%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(255, 153, 221)',
    gradient:
      'radial-gradient(at 14% 29%, rgb(240, 96, 214) 0px, transparent 50%), radial-gradient(at 74% 11%, rgb(238, 114, 172) 0px, transparent 50%), radial-gradient(at 8% 98%, rgb(232, 74, 93) 0px, transparent 50%), radial-gradient(at 48% 27%, rgb(185, 138, 239) 0px, transparent 50%), radial-gradient(at 16% 82%, rgb(248, 109, 230) 0px, transparent 50%), radial-gradient(at 10% 91%, rgb(177, 67, 84) 0px, transparent 50%), radial-gradient(at 5% 23%, rgb(152, 145, 227) 0px, transparent 50%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(255, 153, 167)',
    gradient:
      'radial-gradient(at 85% 2%, rgb(132, 85, 252) 0px, transparent 50%), radial-gradient(at 14% 1%, rgb(165, 93, 223) 0px, transparent 50%), radial-gradient(at 35% 19%, rgb(73, 177, 233) 0px, transparent 50%), radial-gradient(at 81% 33%, rgb(72, 231, 234) 0px, transparent 50%), radial-gradient(at 66% 14%, rgb(233, 198, 144) 0px, transparent 50%), radial-gradient(at 81% 91%, rgb(253, 240, 139) 0px, transparent 50%), radial-gradient(at 68% 71%, rgb(243, 104, 150) 0px, transparent 50%)',
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
  {
    background: '#99bdff',
  },
]
