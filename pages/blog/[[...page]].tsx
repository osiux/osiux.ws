import React from 'react';
import fs from 'fs';
import type { GetStaticProps, GetStaticPaths } from 'next';
import parseISO from 'date-fns/parseISO';
import compareDesc from 'date-fns/compareDesc';

import SEO from '@app/components/SEO';
import SimplePost from '@app/components/posts/SimplePost';
import Pagination from '@app/components/Pagination';

import { getPostData, getPosts } from '@app/utils';
import type { PostData, PostMeta } from '@app/utils';

const POSTS_PER_PAGE = 10;

type PostDataWithSlug = PostData & {
    meta: PostMeta & { slug: string };
};

type BlogPageProps = {
    posts: PostDataWithSlug[];
    totalPages: number;
    currentPage: number;
};

const BlogPage = ({ posts, totalPages, currentPage }: BlogPageProps) => {
    return (
        <>
            <SEO title={`Archive - Page ${currentPage}`} />
            <h1>Archive</h1>
            {posts.map((post) => {
                return <SimplePost key={post.meta.slug} {...post.meta} />;
            })}
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const [, page] = params?.page?.[0]?.split('-') ?? [, 1];

    const allPosts = await getPosts();
    const postsDataPromises = allPosts.map(async (post) => {
        const source = fs.readFileSync(post?.path as string);
        const postData = await getPostData(source);

        return { ...postData, meta: { ...postData.meta, slug: post.slug } };
    });

    const posts = await Promise.all(postsDataPromises);

    const sortedPosts = posts.sort((a, b) => {
        const aDate = parseISO(a.meta.date);
        const bDate = parseISO(b.meta.date);

        return compareDesc(aDate, bDate);
    });

    return {
        props: {
            posts: sortedPosts.slice(
                ((page as number) - 1) * POSTS_PER_PAGE,
                (page as number) * POSTS_PER_PAGE,
            ),
            totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
            currentPage: parseInt(page as string, 10),
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getPosts();
    const paths = Array.from(
        { length: Math.ceil(posts.length / POSTS_PER_PAGE) },
        (_, i) => ({
            params: {
                page: i === 0 ? undefined : [`page-${i + 1}`],
            },
        }),
    );

    return {
        paths,
        fallback: false,
    };
};

export default BlogPage;
