const withPlugins = require('next-compose-plugins');
const pwa = require('next-pwa');
const { withContentlayer  } = require('next-contentlayer');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		domains: ['osiux.ws', 'www.osiux.ws', 'images.unsplash.com'],
		disableStaticImages: true,
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				module: false,
				process: require.resolve('process/browser'),
			};
		}
		return config;
	},
	experimental: { esmExternals: true },
};

module.exports = withPlugins(
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
		withContentlayer,
	],
	nextConfig,
);
