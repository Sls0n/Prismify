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

export const qualities = [
  { quality: '0.5x', value: 0.5 },
  { quality: '1x', value: 1 },
  { quality: '1.5x', value: 1.5 },
  { quality: '2x', value: 2 },
  { quality: '4x', value: 4 },
]

export const resolutions: Resolution[] = [
  { name: 'Fit' },
  { name: 'Equal padding' },
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
    shadow: `0 0 0 0`,
    preview: `0 0 0 0`,
  },
  {
    name: 'bottom',
    fullName: 'Bottom',
    shadow: `0 25px 50px -12px`,
    preview: `0 25px 50px -12px #000000`,
  },
  {
    name: 'sm',
    fullName: 'Small',
    shadow: `0px 6px 20px`,
    preview: `0px 6px 20px #00000080`,
  },
  {
    name: 'md',
    fullName: 'Medium',
    shadow: ``,
    preview: `0px 6px 20px #000000`,
  },
  {
    name: 'lg',
    fullName: 'Large',
    shadow: `0px 10px 60px 0px`,
    preview: `0px 6px 30px 0px #000000`,
  },
  {
    name: 'x-lg',
    fullName: 'X-Large',
    shadow: `0px 19px 60px 10px`,
    preview: `0px 10px 60px 0px #000000`,
  },
]

export const gradients: Gradient[] = [
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #DFE0E2, #E3E9F1 100%)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #c7dae1, #fafbff 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(119, 136, 153), rgb(211, 211, 211) 100%)',
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
    gradient: 'linear-gradient(var(--gradient-angle), #a3a8f2, #fafbff 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(177, 173, 219) 11.2%, rgb(245, 226, 226) 91.1%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), #e0c3fc 0%, #8ec5fc 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(255, 182, 148), rgb(171, 199, 242) 50%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(218, 185, 252) 11.2%, rgb(125, 89, 252) 91.1%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), #A9C9FF 0%, #FFBBEC 100%)',
  },

  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #86e3ce, #d0e6a5 100%)',
  },

  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #898aeb, #d8b9e3)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #82d9c5, #ccaae2 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(71, 140, 118), rgb(138, 206, 144) 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), #7F7FD5, #86A8E7, #91EAE4)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), #dbeafe, #93c5fd, #3b82f6)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(26, 98, 138), rgb(255, 254, 255) 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), #f9a8d4, #d8b4fe, #818cf8)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #4e54c8, #8f94fb)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #a8c0ff, #3f2b96)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #c4b5fd, #a78bfa)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #ee9ca7, #ffdde1)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(244, 63, 94), rgb(248, 113, 113), rgb(239, 68, 68))',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(251, 113, 133), rgb(253, 186, 116))',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), #f0abfc, #f5f5f4, #fef08a)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #d2d0f5, #f8a9da 100%)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #4675c0, #8fc8eb 100%)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #49bcf6, #49deb2 100%)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle),#4CA1AF,#C4E0E5)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #ff7d58, #ffebff 100%)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle),#EECDA3,#EF629F)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(221, 153, 51), rgb(248, 233, 190) 100%)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(245, 126, 217), rgb(255, 236, 162) 100%)',
  },
  {
    type: 'Normal',
    gradient: 'linear-gradient(var(--gradient-angle), #19335a, #8fc8ea 100%)',
  },
  {
    type: 'Mesh',
    gradient: 'conic-gradient(at bottom left,#fbcfe8, #4f46e5,#6ee7b7)',
  },
  {
    type: 'Normal',
    gradient:
      'linear-gradient(var(--gradient-angle), rgb(142, 211, 217) 15%, rgb(238, 67, 244) 50%, rgb(76, 83, 167) 85%)',
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
  {
    type: 'Mesh',
    background: 'rgb(255, 153, 167)',
    gradient:
      'radial-gradient(at 41% 73%, rgb(29, 78, 216) 0px, transparent 84%), radial-gradient(at 13% 1%, rgb(252, 231, 243) 0px, transparent 94%), radial-gradient(at 83% 27%, rgb(220, 38, 38) 0px, transparent 90%), radial-gradient(at 42% 72%, rgb(185, 28, 28) 0px, transparent 63%), radial-gradient(at 41% 98%, rgb(251, 191, 36) 0px, transparent 83%), radial-gradient(at 21% 8%, rgb(8, 145, 178) 0px, transparent 77%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(244, 114, 182)',
    gradient:
      'radial-gradient(at 46% 10%, rgb(254, 249, 195) 0px, transparent 79%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(7, 89, 133)',
    gradient:
      'radial-gradient(at 49% 17%, rgb(134, 239, 172) 0px, transparent 87%), radial-gradient(at 0% 75%, rgb(110, 231, 183) 0px, transparent 100%)',
  },
  {
    type: 'Mesh',
    background: 'rgb(217, 70, 239)',
    gradient:
      'radial-gradient(at 5% 66%, rgb(254, 226, 226) 0px, transparent 89%), radial-gradient(at 63% 98%, rgb(207, 250, 254) 0px, transparent 41%), radial-gradient(at 42% 55%, rgb(126, 34, 206) 0px, transparent 76%), radial-gradient(at 72% 46%, rgb(234, 179, 8) 0px, transparent 86%), radial-gradient(at 35% 23%, rgb(162, 28, 175) 0px, transparent 35%), radial-gradient(at 39% 61%, rgb(15, 118, 110) 0px, transparent 23%)',
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
    background: '#99bdff',
  },
  {
    background: '#E3E9F1',
  },
  {
    background: '#D8D9DD',
  },
]
