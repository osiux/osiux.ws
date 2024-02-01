import withPlugins from 'next-compose-plugins';
import pwa from 'next-pwa';

import withTwin from './withTwin.mjs';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		domains: ['osiux.ws', 'www.osiux.ws', 'images.unsplash.com'],
		disableStaticImages: true,
	},
	webpack: (config, { isServer }) => {
		// if (!isServer) {
		// 	config.resolve.fallback = {
		// 		fs: false,
		// 		module: false,
		// 		process: process,
		// 	};
		// }
		return config;
	},
	experimental: { esmExternals: true },
};

export default withPlugins(
	[
		[
			pwa,
			{
				pwa: {
					dest: 'public',
					disable: process.env.NODE_ENV === 'development',
					register: true,
					skipWaiting: false,
				},
			},
		],
		withTwin,
	],
	nextConfig,
);
