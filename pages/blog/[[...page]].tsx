import React from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';

import SEO from '@app/components/SEO';
import SimplePost from '@app/components/posts/SimplePost';
import Pagination from '@app/components/Pagination';

import { getPostsSlug, getPosts, PostData } from '@app/utils/posts';
import { comparePostDates } from '@app/utils/dates';

const POSTS_PER_PAGE = 10;

type BlogPageProps = {
    posts: PostData[];
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

    const sortedPosts = allPosts.sort(comparePostDates);

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
    const posts = getPostsSlug();
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
