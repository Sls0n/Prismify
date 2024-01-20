import { cn } from '@/utils/button-utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { type HTMLAttributes, forwardRef } from 'react'

const gradientTextVariants = cva('font-medium whitespace-normal font-sans', {
  variants: {
    variant: {
      purple:
        'bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-transparent',
    },
  },
  defaultVariants: {
    variant: 'purple',
  },
})

type TextElement = HTMLHeadingElement | HTMLParagraphElement

export interface TextProps
  extends HTMLAttributes<TextElement>,
    VariantProps<typeof gradientTextVariants> {}

const GradientText = forwardRef<TextElement, TextProps>(
  ({ className, children, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(gradientTextVariants({ variant }), className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)

GradientText.displayName = 'GradientText'

export { GradientText, gradientTextVariants }
