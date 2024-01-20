import { FieldError } from 'react-hook-form'

import { Eye, EyeOff } from 'lucide-react'

export type FormFieldProps = {
  id: string
  type: string
  label: string
  register: any
  error: FieldError | undefined
  showPassword?: boolean
  toggleShowPassword?: () => void
}

export const FormField = ({
  id,
  type,
  label,
  register,
  error,
  showPassword,
  toggleShowPassword,
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-dark/70"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          type={type}
          id={id}
          className="h-11 w-full rounded-md bg-formDark border border-[#22262b] px-4 py-3 text-sm text-gray-100 focus:border-[#8e8ece] focus:outline-none focus:ring-1 focus:ring-[#8e8ece] md:text-sm"
          {...register(id)}
        />
        {id === 'password' && toggleShowPassword && (
          <button
            aria-label="Show password"
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-2 flex items-center pr-3 text-sm text-dark/70"
          >
            {showPassword ? (
              <>
                <EyeOff size={19} className="text-dark/70" />
                <span className="sr-only">Hide password</span>
              </>
            ) : (
              <>
                <Eye size={19} className="text-dark/70" />
                <span className="sr-only">Show password</span>
              </>
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  )
}