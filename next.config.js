const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const pwa = require('next-pwa');

const nextConfig = {
    images: {
        domains: ['osiux.ws', 'www.osiux.ws'],
        disableStaticImages: true,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                module: false,
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
    ],
    nextConfig,
);
