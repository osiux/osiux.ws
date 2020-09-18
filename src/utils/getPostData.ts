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

export const components = {
    YouTube,
    Flickr,
};

const svgIcon = `<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`;

export interface PostMeta {
    title: string;
    date: string;
    tags: string[];
};

export interface PostData {
    source: string;
    meta: PostMeta;
};

const getPostData = async (source: Buffer) => {
    const { content, data } = matter(source);

    const mdxSource = await renderToString(content, {
        components,
        // Optionally pass remark/rehype plugins
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
                                className: [
                                    'anchor',
                                ],
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
        meta: data,
    } as PostData;
};

export default getPostData;
