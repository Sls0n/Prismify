import InfoIcon from './info.icon'

type IconType = {
  name: 'info'
  size?: number
  color?: string
  className?: string
  strokeWidth?: number
  variant?: 'default' | 'solid' | 'duotone'
}

export default function Icon({
  name,
  size,
  color,
  className,
  strokeWidth,
  variant,
}: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '24'}
      height={size || '24'}
      className={`inline-block ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth={strokeWidth || '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {
        {
          info: <InfoIcon variant={variant} />,
        }[name]
      }
    </svg>
  )
}
