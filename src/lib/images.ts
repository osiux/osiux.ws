import { type CacheEntry, cachified } from '@epic-web/cachified';
import ImgixClient from '@imgix/js-core';
import { LRUCache } from 'lru-cache';
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

const defaultImgixParams = {
	w: 500,
	h: 350,
	fit: 'crop',
	crop: 'faces,focalpoint,entropy',
};

const lru = new LRUCache<string, CacheEntry>({ max: 1000 });

const unsplash = createApi({
	accessKey: import.meta.env.UNSPLASH_ACCESS_KEY as string,
});

const imgix = new ImgixClient({
	domain: 'osiuxws.imgix.net',
	secureURLToken: import.meta.env.IMGIX_SECURE_TOKEN as string,
	useHTTPS: true,
});

const getUnsplashImage = async (id: string) => {
	return cachified<UnsplashImage | undefined>({
		key: `unsplash-${id}`,
		cache: lru,
		async getFreshValue() {
			const response = (await unsplash.photos.get({ photoId: id }))
				?.response;

			if (!response) {
				return undefined;
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

type FetchPostImageReturnValue =
	| ({
			type: 'imgix';
	  } & ImgixImage)
	| ({
			type: 'unsplash';
	  } & UnsplashImage)
	| undefined;

export const fetchPostImage = async (
	image: string | undefined = undefined,
): Promise<FetchPostImageReturnValue> => {
	if (!image) return undefined;

	if (image.startsWith('imgix:')) {
		return { type: 'imgix', ...(await getImgixImage(image)) };
	}

	const unsplashImage = await getUnsplashImage(image);

	if (!unsplashImage) {
		return undefined;
	}

	return { type: 'unsplash', ...unsplashImage };
};

export const getOgImageUrl = (title: string, description?: string) => {
	let cardUrl = `https://cards.microlink.io/?preset=simple&headline=${title}&caption=${description ?? ''}`;

	return `https://i.microlink.io/${encodeURIComponent(cardUrl)}`;
};
