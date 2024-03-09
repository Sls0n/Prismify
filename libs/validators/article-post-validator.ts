import { z } from 'zod'
import sanitizeHtml from 'sanitize-html'

export const postSchema = z
  .object({
    title: z
      .string()
      .max(100, 'Title should be at most 100 characters')
      .min(10, 'Title must be at least 10 characters'),
    summary: z
      .string()
      .max(300, 'Summary should be at most 300 characters')
      .min(10, 'Summary must be at least 10 characters'),
    category: z
      .string()
      .max(200, 'Category must be at most 200 characters')
      .optional(),
    slug: z.string().max(200, 'Slug too long.').min(1, 'Please provide a slug'),
    content: z.string(),
    imageUrl: z.string().optional(),
  })
  .transform((data) => {
    return {
      ...data,
      content: sanitizeHtml(data.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          img: ['src', 'alt', 'width', 'height'],
        },
      }),
    }
  })
