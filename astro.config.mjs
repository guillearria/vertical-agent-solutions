// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// The pages.dev host is canonical. The custom domain (verticalagentsolutions.com)
	// was dropped in July 2026 and never connected; nothing else carries it.
	site: 'https://vertical-agent-solutions.pages.dev',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			// Display face for headings; downloaded and self-hosted at build time.
			// If the build-time fetch ever flakes on Pages, vendor the woff2 files
			// into src/assets/fonts and switch to fontProviders.local().
			provider: fontProviders.google(),
			name: 'Newsreader',
			cssVariable: '--font-display',
			weights: [500, 600],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'Times New Roman', 'serif'],
		},
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
