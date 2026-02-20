import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    tech: defineCollection({
      type: 'page',
      source: 'tech/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        updated: z.string().optional(),
        version: z.string().optional(),
        series: z.string().optional(),
        seriesOrder: z.number().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    quant: defineCollection({
      type: 'page',
      source: 'quant/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        updated: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})

