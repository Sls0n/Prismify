import { cn } from '@/utils/buttonUtils'
import Loader from '@/components/loader/Loader'
import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',

  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-br from-[#898AEB] via-[#898dd9]/90 to-[#8e8ece] text-white h-10 px-5 py-3 rounded-full font-medium',
        none: 'rounded-none',
        secondary:
          'text-primary dark:text-dark h-10 px-4 py-2 rounded-3xl font-medium',
        outline:
          'text-primary border border-input dark:text-dark h-10 px-4 py-2 rounded-3xl font-medium',
        ghost:
          'text-primary dark:text-dark hover:bg-[#f5f7fa] dark:hover:bg-formDark h-10 px-4 py-2 rounded-3xl font-medium',
        stylish:
          'rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-purple ring-1 ring-inset ring-indigo-500/20',
        icon: 'text-primary bg-formDark border border-input dark:text-dark h-12 px-5 py-2.5 rounded-xl',
        activeIcon:
          'text-white bg-gradient-to-br from-[#898AEB] via-[#898dd9]/90 to-[#8e8ece] h-12 px-5 py-2.5 rounded-xl font-medium border border-input dark:text-white',
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
            <Loader />
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
