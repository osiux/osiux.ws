const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['ky']);
const optimizedImages = require('next-optimized-images');
const offline = require('next-offline');

const nextConfig = {
    images: {
        domains: ['osiux.ws', 'www.osiux.ws'],
    },
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty',
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
            offline,
            {
                workboxOpts: {
                    swDest: process.env.NEXT_EXPORT
                        ? 'service-worker.js'
                        : 'static/service-worker.js',
                    runtimeCaching: [
                        {
                            urlPattern: /^https?.*/,
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'offlineCache',
                                expiration: {
                                    maxEntries: 200,
                                },
                            },
                        },
                    ],
                },
                async rewrites() {
                    return [
                        {
                            source: '/service-worker.js',
                            destination: '/_next/static/service-worker.js',
                        },
                    ];
                },
            },
        ],
    ],
    nextConfig,
);
