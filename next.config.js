const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
    'ky',
    'hastscript',
    'hast-util-parse-selector',
    'rehype-slug',
    'hast-util-has-property',
    'hast-util-heading-rank',
    'hast-util-to-string',
    'rehype-autolink-headings',
    'rehype-highlight',
    'lowlight',
    'fault',
    'hast-util-to-text',
    'hast-util-is-element',
    'unist-util-find-after',
]);
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
                path: require.resolve('path-browserify'),
            };
        }
        return config;
    },
};

module.exports = withPlugins(
    [
        withTM,
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
