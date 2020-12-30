import React from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

import SimplePost from '@app/components/posts/SimplePost';
import Pagination from '@app/components/Pagination';

import { getPosts } from '@app/utils/posts';
import { comparePostDates } from '@app/utils/dates';

import { POSTS_PER_PAGE, ArchivePageProps } from '../[[...page]]';

type TagPageProps = ArchivePageProps & {
    tag: string;
};

type PathType = Array<string | { params: { tag: string[] } }>;

const TagPage = ({ posts, tag, totalPages, currentPage }: TagPageProps) => {
    return (
        <>
            <NextSeo title={`Archive - Tag: ${tag} - Page ${currentPage}`} />
            <h1>
                Archive - Tag: <strong>{tag}</strong>
            </h1>
            {posts.map((post) => {
                return <SimplePost key={post.meta.slug} {...post.meta} />;
            })}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                basePath={`/blog/tag/${tag}/`}
                nextPath="/blog/tag/[[...tag]]"
            />
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const [, page] = params?.tag?.[1]?.split('-') ?? [, 1];
    const tag = params?.tag?.[0];

    const allPosts = await getPosts();

    const filteredPosts = allPosts.filter((post) => {
        const tags = post.meta.tags;

        return tags.includes(tag as string);
    });

    const sortedPosts = filteredPosts.sort(comparePostDates);

    return {
        props: {
            posts: sortedPosts.slice(
                ((page as number) - 1) * POSTS_PER_PAGE,
                (page as number) * POSTS_PER_PAGE,
            ),
            tag: tag as string,
            totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
            currentPage: parseInt(page as string, 10),
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPosts();

    const tags = posts.reduce<{ [key: string]: number }>((acc, item) => {
        item.meta.tags.forEach((tag) => {
            if (acc[tag]) {
                acc[tag]++;
            } else {
                acc[tag] = 1;
            }
        });

        return acc;
    }, {});

    const paths = Object.keys(tags).reduce<PathType>((acc, tag) => {
        const totalInTag = tags[tag];

        let tagPages: PathType = [];
        for (let i = 0; i < Math.ceil(totalInTag / POSTS_PER_PAGE); i++) {
            tagPages.push({
                params: {
                    tag: i === 0 ? [tag] : [tag, `page-${i + 1}`],
                },
            });
        }

        return [...acc, ...tagPages];
    }, []);

    return {
        paths,
        fallback: false,
    };
};

export default TagPage;
