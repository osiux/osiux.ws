import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { h, s } from 'hastscript';
import { toString } from 'mdast-util-to-string';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import headings from 'rehype-autolink-headings';
import slug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
	vite: { plugins: [tailwindcss()] },
	site: 'https://www.osiux.ws',
	prefetch: true,
	image: {
		domains: ['images.unsplash.com', '*.osiux.ws', 'live.staticflickr.com'],
	},
	integrations: [
		mdx({
			remarkPlugins: [remarkReadingTime],
			rehypePlugins: [
				slug,
				[
					headings,
					{
						behavior: 'after',
						group: h('div.relative'),
						properties: {
							ariaHidden: true,
							tabIndex: -1,
							class: 'absolute! mt-0! border-none! leading-none! -left-10! top-2!',
						},
						content: (node) => {
							return [
								h(
									'span.visually-hidden',
									`Read the "${toString(node.children)}" section`,
								),
								h(
									'span.icon.icon-link',
									{
										ariaHidden: true,
									},
									s(
										'svg',
										{
											'aria-hidden': true,
											focusable: false,
											height: 30,
											width: 30,
											version: '1.1',
											viewBox: '0 0 16 16',
											class: 'fill-gray-400 dark:fill-gray-500 hover:fill-gray-600 dark:hover:fill-gray-300 transition-colors',
										},
										[
											s('path', {
												'fill-rule': 'evenodd',
												d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
											}),
										],
									),
								),
							];
						},
					},
				],
				rehypeAccessibleEmojis,
			],
		}),
		icon({
			include: {
				'fa6-solid': [
					'sun',
					'moon',
					'bars',
					'xmark',
					'backward-step',
					'chevron-left',
					'chevron-right',
					'forward-step',
				],
				logos: [
					'github-icon',
					'linkedin-icon',
					'stackoverflow-icon',
					'twitter',
					'instagram-icon',
					'lastfm',
				],
			},
		}),
		sitemap(),
	],
});
