import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createApi } from 'unsplash-js';
import readingTime from 'reading-time';
import { s } from 'hastscript';
import { serialize } from 'next-mdx-remote/serialize';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import highlight from 'rehype-highlight';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import diff from 'highlight.js/lib/languages/diff';
import ini from 'highlight.js/lib/languages/ini';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import less from 'highlight.js/lib/languages/less';
import makefile from 'highlight.js/lib/languages/makefile';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import phpTemplate from 'highlight.js/lib/languages/php-template';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import scss from 'highlight.js/lib/languages/scss';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

import embedder from '@app/utils/embedder';
import Cache from './cache';

const cache = new Cache();

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
});

export const POSTS_PATH = path.join(process.cwd(), 'content/posts');

type Image = {
    description: string;
    url: string;
    blur_hash: string;
    link: string;
    user: {
        name: string;
        link: string;
    };
};

export type PostMeta = {
    title: string;
    date: string;
    tags: string[];
    slug: string;
    image?: Image;
    excerpt?: string;
    readingTime: readingTime.IReadTimeResults;
};

export type PostData = {
    content: string;
    meta: PostMeta;
};

export const getPostsSlug = () =>
    fs.readdirSync(POSTS_PATH).map((file) => file.replace('.mdx', ''));

export const getPostData = async (postSlug: string) => {
    const filePath = path.join(POSTS_PATH, `${postSlug}.mdx`);
    const source = fs.readFileSync(filePath);

    const { content, data } = matter(source);

    let image = null;

    if (data.image) {
        image = await cache.get(data.image);

        if (!image) {
            const response = (
                await unsplash.photos.get({ photoId: data.image })
            )?.response;

            image = {
                description: response?.description || response?.alt_description,
                url: response?.urls.raw,
                blur_hash: response?.blur_hash,
                link: response?.links.html,
                user: {
                    name: response?.user.name,
                    link: response?.user.links.html,
                },
            };

            await cache.set(data.image, image);
        }
    }

    return {
        content,
        meta: {
            ...data,
            slug: postSlug,
            image,
            readingTime: readingTime(content),
        },
    } as PostData;
};

export const getPosts = async () => {
    const slugs = getPostsSlug();

    const postsPromises = slugs.map(getPostData);

    return await Promise.all(postsPromises);
};

export const getPost = async (postSlug: string) => {
    const { content, meta } = await getPostData(postSlug);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [embedder],
            rehypePlugins: [
                slug,
                [
                    headings,
                    {
                        properties: {
                            class: 'anchor before',
                            ariaHidden: true,
                            tabIndex: -1,
                        },
                        content: (node: any) => {
                            return s(
                                'svg',
                                {
                                    'aria-hidden': true,
                                    focusable: false,
                                    height: 16,
                                    width: 16,
                                    version: '1.1',
                                    viewBox: '0 0 16 16',
                                },
                                [
                                    s('path', {
                                        'fill-rule': 'evenodd',
                                        d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                                    }),
                                ],
                            );
                        },
                    },
                ],
                rehypeAccessibleEmojis,
                [
                    highlight,
                    {
                        languages: {
                            bash,
                            css,
                            diff,
                            ini,
                            javascript,
                            json,
                            less,
                            makefile,
                            markdown,
                            php,
                            phpTemplate,
                            plaintext,
                            python,
                            scss,
                            shell,
                            sql,
                            typescript,
                            xml,
                            yaml,
                        },
                    },
                ],
            ],
        },
        scope: meta,
    });

    return { mdxSource, meta };
};
