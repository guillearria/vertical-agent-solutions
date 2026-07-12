import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Industry hub slug (see src/data/industries.ts); optional so
			// pipeline-written posts without a tag still validate.
			industry: z.string().optional(),
			// Set by the maintenance flow to retire a post without deleting it.
			archived: z.boolean().optional(),
			// Provenance: web sources the writer verified claims against.
			sources: z.array(z.string()).optional(),
		}),
});

export const collections = { blog };
