const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const pwa = require('next-pwa');
const { createContentlayerPlugin } = require('next-contentlayer');

const withContentlayer = createContentlayerPlugin({
	// Additional Contentlayer config options
});

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
		optimizedImages,
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
