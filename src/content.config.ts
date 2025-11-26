import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/posts" }),
	schema: z.object({
		title: z.string(),
		date: z.date().or(z.string()),
		tags: z.array(z.string()),
		excerpt: z.optional(z.string()),
		image: z.optional(z.string()),
	}),
});

export const collections = {
	posts: postsCollection,
};
