import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const POSTS_PATH = path.join(process.cwd(), 'content/posts');

export const components = {};

export type PostMeta = {
    title: string;
    date: string;
    tags: string[];
    slug: string;
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

    return { content, meta: { ...data, slug: postSlug } } as PostData;
};

export const getPosts = async () => {
    const slugs = getPostsSlug();

    const postsPromises = slugs.map(getPostData);

    return await Promise.all(postsPromises);
};
