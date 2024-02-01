import { CacheEntry, cachified } from '@epic-web/cachified';
import ImgixClient from '@imgix/js-core';
import { formatISO, toDate } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { h, s } from 'hastscript';
import { LRUCache } from 'lru-cache';
import { toString } from 'mdast-util-to-string';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import calculateReadingTime, { ReadTimeResults } from 'reading-time';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import headings from 'rehype-autolink-headings';
import slug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { createApi } from 'unsplash-js';

type UnsplashImage = {
	description: string;
	url: string;
	attributionLink: string;
	width: number;
	height: number;
	user: {
		name: string;
		link: string;
	};
};

type ImgixImage = {
	url: string;
};

type Frontmatter = {
	title: string;
	date: string;
	summary: string;
	unsplash?: UnsplashImage;
	imgix?: ImgixImage;
	tags: string[];
	excerpt?: string;
};

export type Post = {
	slug: string;
	content: MDXRemoteSerializeResult;
	readingTime: ReadTimeResults;
} & Frontmatter;

const lru = new LRUCache<string, CacheEntry>({ max: 1000 });

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
});

const imgix = new ImgixClient({
	domain: 'osiuxws.imgix.net',
	secureURLToken: process.env.IMGIX_SECURE_TOKEN as string,
	useHTTPS: true,
});

const defaultImgixParams = {
	w: 500,
	h: 350,
	fit: 'crop',
	crop: 'faces,focalpoint,entropy',
};

const getUnsplashImage = async (id: string) => {
	return cachified<UnsplashImage | null>({
		key: `unsplash-${id}`,
		cache: lru,
		async getFreshValue() {
			const response = (await unsplash.photos.get({ photoId: id }))
				?.response;

			if (!response) {
				return null;
			}

			return {
				description: response.description || response.alt_description,
				url: response.urls.raw,
				attributionLink: response.links.html,
				width: response.width,
				height: response.height,
				user: {
					name: response.user.name,
					link: response.user.links.html,
				},
			} as UnsplashImage;
		},
	});
};

const getImgixImage = async (id: string) => {
	return cachified<ImgixImage>({
		key: `imgix-${id}`,
		cache: lru,
		async getFreshValue() {
			const [imagePath, params] = id.replace('imgix:', '').split('?');

			let imgParams = defaultImgixParams;
			if (params) {
				const searchParams = new URLSearchParams(params);
				const tmpParams: Record<string, string> = {};
				searchParams.forEach((v, k) => (tmpParams[k] = v));

				imgParams = { ...defaultImgixParams, ...tmpParams };
			}

			const url = imgix.buildURL(imagePath, imgParams);

			return {
				url,
			};
		},
	});
};

const getMDXFiles = (dir: string) => {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
};

const readMDXFile = async (filePath: string) => {
	let rawContent = fs.readFileSync(filePath, 'utf-8');

	const { data, content } = matter(rawContent, {
		excerpt: true,
	});

	const readingTime = calculateReadingTime(content);

	if (typeof data.date === 'string') {
		data.date = data.date;
	} else {
		data.date = formatISO(toDate(data.date));
	}

	data.unsplash = null;
	data.imgix = null;

	if (data.image && !data.image.startsWith('imgix:')) {
		data.unsplash = await getUnsplashImage(data.image);
	}

	if (data.image && data.image.startsWith('imgix:')) {
		data.imgix = await getImgixImage(data.image);
	}

	delete data.image;

	const mdxContent = await serialize(content, {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				slug,
				[
					headings,
					{
						behavior: 'after',
						group: h('div.heading-container'),
						properties: {
							ariaHidden: true,
							tabIndex: -1,
						},
						content: (node: Element) => {
							return [
								h(
									'span.visually-hidden',
									`Read the "${toString(
										node.children,
									)}" section`,
								),
								h(
									'span.icon.icon-link',
									{ ariaHidden: true },
									s(
										'svg',
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
		},
	});

	return { ...(data as Frontmatter), content: mdxContent, readingTime };
};

const getMDXData = async (dir: string): Promise<Post[]> => {
	let mdxFiles = getMDXFiles(dir);
	const postsPromises = mdxFiles.map(async (file) => {
		const data = await readMDXFile(path.join(dir, file));
		let slug = path.basename(file, path.extname(file));
		return {
			slug,
			...data,
		};
	});

	return Promise.all(postsPromises);
};

export const getBlogPosts = async () => {
	return getMDXData(path.join(process.cwd(), 'content/posts'));
};
