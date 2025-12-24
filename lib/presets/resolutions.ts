export interface Resolution {
  name: string
  resolutions?: Array<{
    preset: string
    resolution: string
  }>
  icon?: string
  color?: string
}

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
