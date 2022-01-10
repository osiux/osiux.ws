import { useQuery } from 'react-query';

export const PER_PAGE = 5;

type Webmention = {
	author: {
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

const useWebmentions = (slug: string, page: number, inView: boolean) =>
	useQuery<Webmention[], Error>(
		['webmentions', slug, page],
		async () => {
			const response = await fetch(
				// TODO: change when https://github.com/aaronpk/webmention.io/issues/100 is fixed
				`https://webmention.io/api/mentions.jf2?sort-by=published&wm-property[]=mention-of&page=${page}&per-page=${PER_PAGE}&target=https://www.osiux.ws/blog/${slug}`,
			);
			const json = await response.json();

			return json.children;
		},
		{
			keepPreviousData: true,
			enabled: inView,
		},
	);

const useWebMentionsCount = (slug: string, inView: boolean) =>
	useQuery<WebmentionCount, Error>(
		['webmentions', 'count', slug],
		async () => {
			const response = await fetch(
				`https://webmention.io/api/count.json?target=https://www.osiux.ws/blog/${slug}`,
			);
			const json = await response.json();

			return json;
		},
		{
			enabled: inView,
		},
	);

export { useWebmentions, useWebMentionsCount };
