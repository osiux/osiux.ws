import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import { toString } from 'mdast-util-to-string';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import { h, s } from 'hastscript';
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	image: {
		domains: ['images.unsplash.com', '*.osiux.ws', 'live.staticflickr.com'],
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
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
							class: '!absolute !mt-0 !border-none !leading-none !-left-10 !top-2',
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
										'svg.dark:fill-current.dark:text-gray-100',
										{
											'aria-hidden': true,
											focusable: false,
											height: 30,
											width: 30,
											version: '1.1',
											viewBox: '0 0 16 16',
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
	],
});
