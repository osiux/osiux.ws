import React from 'react';
import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import SimplePost from '@app/components/posts/SimplePost';

import { getPosts, PostData } from '@app/utils/posts';
import { comparePostDates } from '@app/utils/dates';

const POSTS_ON_HOME = 3;

type HomeProps = {
    posts: PostData[];
};

const Home = ({ posts }: HomeProps) => (
    <>
        <NextSeo title="Home" />
        <h1>Latests Blog Posts</h1>
        {posts.map((post) => (
            <SimplePost key={post.meta.slug} {...post.meta} />
        ))}
    </>
);

export const getStaticProps: GetStaticProps = async () => {
    const allPosts = await getPosts();

    const sortedPosts = allPosts.sort(comparePostDates);

    return {
        props: {
            posts: sortedPosts.slice(0, POSTS_ON_HOME),
        },
    };
};

export default Home;
