import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // Every page needs a description: it feeds the meta description and the category cards.
        description: z.string(),
        // Some guides carry a longer summary of what they cover; nothing renders it.
        summary: z.string().optional(),
      }),
    }),
  }),
};
