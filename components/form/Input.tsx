'use client'

type InputProps = {
  id: string
  name: string
  type: string
  required: boolean
  value: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  id,
  name,
  type,
  required,
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="h-11 w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#8e8ece] focus:ring-indigo-500 dark:border-gray-700 dark:bg-[transparent] dark:text-gray-100 md:text-md"
    />
  )
}
