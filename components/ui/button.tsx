import { cn } from '@/utils/button-utils'
import Spinner from '@/components/spinner/spinner'
import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 focus:z-10',

  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-br from-[#898AEB]/80 via-[#898dd9]/80 to-[#8e8ece]/80 text-white h-10 px-5 py-3  font-medium',
        secondary: 'text-primary dark:text-dark h-10 px-4 py-2  font-medium',
        outline:
          'text-primary border border-border/80 dark:text-[#c2c3c9] h-10 px-4 py-2  bg-formDark font-normal',
        ghost:
          'text-primary dark:text-dark hover:bg-[#f5f7fa] dark:hover:bg-formDark h-10 px-4 py-2 rounded-none font-medium',
        noHoverGhost:
          'text-primary dark:text-dark h-10 px-4 py-2 rounded-none font-medium',
        stylish:
          ' bg-indigo-500/10 px-3 py-1 text-sm font-normal leading-6 text-purple border border-indigo-500/10', // ring-1 ring-inset ring-indigo-500/20
        destructive:
          ' px-3 py-1 text-sm font-medium leading-6 bg-red-500/10 text-red-500 ring-1 ring-red-500/10',
        icon: 'text-primary bg-[#E0E0EC] dark:bg-formDark border border-border dark:text-dark h-12 px-5 py-2.5 ',
        activeIcon:
          'text-white bg-gradient-to-br from-[#898AEB] via-[#898dd9]/90 to-[#7d75d0] h-12 px-5 py-2.5  font-medium border-0 border-border dark:text-[#F2F3F9] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        menuItem:
          'justify-between px-1.5 hover:bg-indigo-400/10 hover:text-foreground/80 rounded-sm cursor-default',
      },
      size: {
        'x-lg': 'h-13 py-[0.8rem] px-[1.1rem]',
        lg: 'h-11 py-3 px-4 text-md',
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 py-2',
        'x-sm': 'h-8 px-3 py-2',
      },
      // Only used for the link since we can only used disabled prop on a button
      linkDisabled: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      linkDisabled: false,
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant, isLoading, size, linkDisabled, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, linkDisabled }),
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
