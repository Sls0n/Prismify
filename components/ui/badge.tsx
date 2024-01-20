import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/button-utils'
const badgeVariants = cva(
  'w-fit inline-flex items-center rounded-md ring-1 ring-inset px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm',
  {
    variants: {
      variant: {
        default: 'text-purple bg-indigo-500/10 ring-indigo-500/20',
        success: 'bg-[#27ae60]/10 text-[#27AE60] ring-[#27ae60]/20',
        destructive: 'bg-[#F06565]/10 text-[#F06565] ring-[#ff7373]/20',
        help: 'bg-[#FFB154]/10 text-[#FFB154] ring-[#FFB154]/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
