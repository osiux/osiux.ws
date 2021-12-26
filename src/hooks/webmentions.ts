import { useQuery } from 'react-query';

export const PER_PAGE = 10;

type Webmention = {
	type: 'entry';
	author: {
		type: 'card';
		name: string;
		url: string;
		photo: string;
	};
	url: string;
	published: string;
	content: {
		text: string;
		html: string;
	};
	'wm-id': number;
	'wm-received': string;
	'wm-source': string;
	'wm-target': string;
	'wm-property': 'in-reply-to' | 'like-of' | 'repost-of' | 'mention-of';
};

type WebmentionCount = {
	count: number;
	type: {
		like?: number;
		mention?: number;
		reply?: number;
		repost?: number;
	};
};

const useWebmentions = (slug: string, page: number) =>
	useQuery<Webmention, Error>(
		['webmentions', slug, page],
		async () => {
			const response = await fetch(
				`https://webmention.io/api/mentions.jf2?sort-by=published&wm-property[]=in-reply-to&wm-property[]=mention-of&page=${page}&per-page=${PER_PAGE}&target=https://www.osiux.ws/blog/${slug}/`,
			);
			const json = await response.json();

			return json.children;
		},
		{
			keepPreviousData: true,
			enabled: !!slug,
		},
	);

const useWebMentionsCount = (slug: string) =>
	useQuery<WebmentionCount, Error>(
		['webmentions', 'count', slug],
		async () => {
			const response = await fetch(
				`https://webmention.io/api/count.json?target=https://www.osiux.ws/blog/${slug}/`,
			);
			const json = await response.json();

			return json;
		},
		{
			enabled: !!slug,
		},
	);

export { useWebmentions, useWebMentionsCount };
