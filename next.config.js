const withPlugins = require('next-compose-plugins');
const mdx = require('@next/mdx');
const images = require('remark-images');
const emoji = require('remark-emoji');
const withTM = require('next-transpile-modules')(['ky']);

const nextConfig = {};

module.exports = withPlugins(
    [
        withTM,
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
