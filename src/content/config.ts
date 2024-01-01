import { defineCollection, z } from "astro:content"

const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    // meta
    isArchived: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
  }),
})

export const collections = { posts }
