import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'The username must be 4 characters or more' })
    .max(16, { message: 'The username must be 16 characters or less' })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'The username must contain only letters, numbers and underscore (_)'
    ),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be atleast 6 characters' })
    .max(30, { message: 'Password must be 30 characters or less' }),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
