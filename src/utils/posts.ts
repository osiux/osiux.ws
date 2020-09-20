import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// @ts-ignore
import renderToString from 'next-mdx-remote/render-to-string';
// @ts-ignore
import slug from 'rehype-slug';
// @ts-ignore
import headings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
// @ts-ignore
import highlight from 'rehype-highlight';
// @ts-ignore
import { YouTube, Flickr } from 'mdx-embed';

export const POSTS_PATH = path.join(process.cwd(), 'content/posts');

export const components = {
    YouTube,
    Flickr,
};

type PostMeta = {
    title: string;
    date: string;
    tags: string[];
    slug: string;
};

export type PostData = {
    source: string;
    meta: PostMeta;
};

export const getPostsSlug = () =>
    fs.readdirSync(POSTS_PATH).map((file) => file.replace('.mdx', ''));

export const getPostData = async (postSlug: string) => {
    const filePath = path.join(POSTS_PATH, `${postSlug}.mdx`);
    const source = fs.readFileSync(filePath);

    const { content, data } = matter(source);

    const mdxSource = await renderToString(content, {
        components,
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [
                slug,
                [
                    headings,
                    {
                        content: {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                                className: ['anchor'],
                            },
                            children: [],
                        },
                    },
                ],
                rehypeAccessibleEmojis,
                highlight,
            ],
        },
        scope: data,
    });

    return {
        source: mdxSource,
        meta: {
            ...data,
            slug: postSlug,
        },
    } as PostData;
};

export const getPosts = async () => {
    const slugs = getPostsSlug();

    const postsPromises = slugs.map(getPostData);

    return await Promise.all(postsPromises);
};
