// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// TODO: flip to https://verticalagentsolutions.com once the custom domain is
	// connected in Cloudflare Pages (also update SITE_URL in the Pages env and
	// DEFAULT_SITE in functions/api/telegram.ts).
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
