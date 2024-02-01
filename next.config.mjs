import withTwin from './withTwin.mjs';
import withPlugins from 'next-compose-plugins';
import pwa from 'next-pwa';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'images.unsplash.com',
			},
			{
				hostname: '*.osiux.ws',
			}
		],
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
