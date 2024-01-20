import { cn } from '@/utils/button-utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { type HTMLAttributes, forwardRef } from 'react'

const textVariants = cva('font-medium whitespace-normal font-sans', {
  variants: {
    variant: {
      h1: 'text-[4rem] leading-[1.1] font-bold tracking-tight',
      h2: 'text-[2.5rem] leading-[1.4] font-bold tracking-tight',
      h3: 'text-[2rem] leading-tight font-bold tracking-[-0.02em]',
      h4: 'text-2xl leading-normal font-bold tracking-[-0.015em]',
      bodyXLarge: 'text-xl leading-[1.4] tracking-[-0.00625em]',
      bodyLarge: 'text-lg leading-[1.45] tracking-[-0.00563em]',
      bodyMedium: 'text-base leading-normal',
      bodySmall: 'text-sm leading-[1.4]',
      bodyXSmall: 'text-xs leading-[1.35]',
    },
  },
  defaultVariants: {
    variant: 'bodyXLarge',
  },
})

type TextElement = HTMLHeadingElement | HTMLParagraphElement

export interface TextProps
  extends HTMLAttributes<TextElement>,
    VariantProps<typeof textVariants> {
  bold?: boolean
  medium?: boolean
  semibold?: boolean
}

const Text = forwardRef<TextElement, TextProps>(
  ({ className, children, variant, medium, bold, semibold, ...props }, ref) => {
    const fontWeightClass = bold
      ? 'font-bold'
      : semibold
      ? 'font-semibold'
      : medium
      ? 'font-medium'
      : 'font-normal'

    switch (variant) {
      case 'h1':
        return (
          <h1
            className={cn(
              textVariants({ variant }),
              fontWeightClass,
              className
            )}
            ref={ref as React.Ref<HTMLHeadingElement>}
            {...props}
          >
            {children}
          </h1>
        )
      case 'h2':
        return (
          <h2
            className={cn(
              textVariants({ variant }),
              fontWeightClass,
              className
            )}
            ref={ref as React.Ref<HTMLHeadingElement>}
            {...props}
          >
            {children}
          </h2>
        )
      case 'h3':
        return (
          <h3
            className={cn(
              textVariants({ variant }),
              fontWeightClass,
              className
            )}
            ref={ref as React.Ref<HTMLHeadingElement>}
            {...props}
          >
            {children}
          </h3>
        )
      case 'h4':
        return (
          <h4
            className={cn(
              textVariants({ variant }),
              fontWeightClass,
              className
            )}
            ref={ref as React.Ref<HTMLHeadingElement>}
            {...props}
          >
            {children}
          </h4>
        )
      default:
        return (
          <p
            className={cn(
              textVariants({ variant }),
              fontWeightClass,
              className
            )}
            ref={ref as React.Ref<HTMLParagraphElement>}
            {...props}
          >
            {children}
          </p>
        )
    }
  }
)

Text.displayName = 'Text'

export { Text, textVariants }
