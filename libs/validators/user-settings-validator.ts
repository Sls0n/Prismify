import { z } from 'zod'

export const userSettingsSchema = z.object({
  name: z.string().min(1).max(50).optional().or(z.undefined()),
  image: z.string().url().optional().or(z.literal('')).or(z.undefined()),
})
