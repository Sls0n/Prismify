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
      className="text-md h-11 w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  )
}
