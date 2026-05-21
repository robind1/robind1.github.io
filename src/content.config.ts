import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    teaser: z.string(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
  }),
});

export const collections = { projects };
