import { z } from 'zod'

export const subscriptionSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
})

export const notificationSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
})
