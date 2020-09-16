const withPlugins = require('next-compose-plugins');
const mdx = require('@next/mdx');
const images = require('remark-images');
const emoji = require('remark-emoji');
const withTM = require('next-transpile-modules')(['ky']);
const optimizedImages = require('next-optimized-images');

const nextConfig = {};

module.exports = withPlugins(
    [
        withTM,
        optimizedImages,
        [
            mdx,
            {
                extension: /\.(md|mdx)$/,
                options: {
                    remarkPlugins: [images, emoji],
                    rehypePlugins: [],
                },
            },
        ],
    ],
    nextConfig,
);
