import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { industryName } from '../data/industries';

export async function GET(context) {
	const posts = (await getCollection('blog')).filter((post) => !post.data.archived);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
			const industry = industryName(post.data.industry);
			return {
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/blog/${post.id}/`,
				...(industry ? { categories: [industry] } : {}),
			};
		}),
	});
}
