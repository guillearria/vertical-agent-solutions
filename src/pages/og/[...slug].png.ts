/**
 * Build-time branded Open Graph cards: /og/default.png, /og/<post-id>.png,
 * and /og/industries/<slug>.png. Rendered with satori (layout → SVG) and
 * rasterized with sharp; fonts are the committed local woffs.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { SITE_TITLE } from '../../consts';
import { industries, industryName } from '../../data/industries';

const DOMAIN = 'verticalagentsolutions.com';

// Resolved from the project root (where `astro build` runs) — a plain
// import.meta.url-relative URL would point inside dist/ after bundling.
const newsreader = await readFile(resolve('src/assets/fonts/newsreader-semibold.woff'));
const atkinson = await readFile(resolve('src/assets/fonts/atkinson-bold.woff'));

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#0F766E"/><path d="M34 46 L57 90 C68 66 78 52 96 38" fill="none" stroke="#FFFFFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const logoUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

interface Props {
	title: string;
	label?: string;
}

export async function getStaticPaths() {
	const posts = (await getCollection('blog')).filter((p) => !p.data.archived);
	return [
		{
			params: { slug: 'default' },
			props: { title: 'Practical guides to putting AI agents to work in your business' },
		},
		...posts.map((p) => ({
			params: { slug: p.id },
			props: { title: p.data.title, label: industryName(p.data.industry) },
		})),
		...Object.entries(industries)
			.filter(([slug]) => posts.some((p) => p.data.industry === slug))
			.map(([slug, industry]) => ({
				params: { slug: `industries/${slug}` },
				props: { title: `AI Agents for ${industry.name}`, label: 'Industry guides' },
			})),
	];
}

export const GET: APIRoute<Props> = async ({ props }) => {
	const { title, label } = props;
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '1200px',
					height: '630px',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#FBFAF8',
					borderTop: '6px solid #0F766E',
					padding: '56px 64px 48px',
					fontFamily: 'Atkinson',
				},
				children: [
					{
						type: 'div',
						props: {
							style: { display: 'flex', alignItems: 'center', gap: '16px' },
							children: [
								{ type: 'img', props: { src: logoUri, width: 44, height: 44 } },
								{
									type: 'div',
									props: {
										style: { fontSize: '28px', fontWeight: 700, color: '#1D1C1A' },
										children: SITE_TITLE,
									},
								},
							],
						},
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'block',
								lineClamp: 4,
								flexGrow: 1,
								marginTop: '48px',
								fontFamily: 'Newsreader',
								fontSize: title.length > 70 ? '56px' : '64px',
								fontWeight: 600,
								lineHeight: 1.2,
								letterSpacing: '-0.01em',
								color: '#1D1C1A',
							},
							children: title,
						},
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								fontSize: '24px',
							},
							children: [
								{
									type: 'div',
									props: {
										style: { color: '#0F766E', fontWeight: 700 },
										children: label ?? '',
									},
								},
								{ type: 'div', props: { style: { color: '#7B766E' }, children: DOMAIN } },
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Newsreader', data: newsreader, weight: 600, style: 'normal' },
				{ name: 'Atkinson', data: atkinson, weight: 700, style: 'normal' },
			],
		},
	);
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
