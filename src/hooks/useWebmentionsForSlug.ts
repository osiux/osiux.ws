import { useQuery } from 'react-query';

type WebmentionsChildren = {
	type: 'entry';
	author: {
		type: 'card';
		name: string;
		url: string;
		photo: string;
	};
	url: string;
	published: string;
	'wm-received': string;
	'wm-id': number;
	content: {
		text: string;
		html: string;
	};
	'wm-property':
		| 'in-reply-to'
		| 'like-of'
		| 'repost-of'
		| 'bookmark-of'
		| 'mention-of'
		| 'rsvp';
};

type WebmentionsResponse = {
	type: 'feed';
	name: 'webmentions';
	children: WebmentionsChildren[];
};

const useWebmentionsForSlug = (slug: string) => {
	return useQuery<WebmentionsResponse, Error>(['webmentions', slug], async () => {
		const response = await fetch(
			`https://webmention.io/api/mentions.jf2?target=https://www.osiux.ws/blog/${slug}`,
		);
		const json = await response.json();

		return json;
	});
};

export default useWebmentionsForSlug;
