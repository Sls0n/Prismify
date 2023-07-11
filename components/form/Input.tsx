'use client'

type InputProps = {
  id: string
  type: string
  required: boolean
  placeholder?: string
}

export default function Input({ id, type, required, placeholder }: InputProps) {
  return (
    <input
      id={id}
      type={type}
      required={required}
      placeholder={placeholder}
      className="md:text-md h-11 w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#8e8ece] focus:ring-indigo-500 dark:border-gray-700 dark:bg-[transparent] dark:text-gray-100"
    />
  )
}
