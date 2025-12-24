export interface Shadow {
  name: string
  fullName: string
  shadow: string
  preview: string
}

export const shadows: Shadow[] = [
  {
    name: 'none',
    fullName: 'None',
    shadow: `0 0 0 0`,
    preview: `0 0 0 0`,
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
    name: 'bottom',
    fullName: 'Bottom',
    shadow: `0 25px 50px -12px`,
    preview: `0 25px 50px -12px #000000`,
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