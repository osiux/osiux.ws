import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
	type: 'content',
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
