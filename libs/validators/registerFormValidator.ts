import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'The username must be 4 characters or more' })
    .max(10, { message: 'The username must be 10 characters or less' })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'The username must contain only letters, numbers and underscore (_)'
    ),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      'Your password must contain at least one uppercase letter and one number.'
    ),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
