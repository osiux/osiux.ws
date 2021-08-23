import { Fragment } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { NextSeo } from 'next-seo';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { getPost, getPostsSlug } from '@app/utils/posts';
import { formatDate } from '@app/utils/dates';
import type { PostMeta } from '@app/utils/posts';
import TagList from '@app/components/TagList';

const Title = tw.h1`break-words mb-2! font-heading font-bold text-3xl mb-5 md:(text-5xl mb-10) text-gray-800`;
const Meta = tw.p`my-10`;
const Date = tw.abbr``;
const Tag = tw.a`mr-2 bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-400`;
const Content = styled.div`
    ${tw`text-justify prose md:prose-xl max-w-full!`}

    h1, h2, h3, h4, h5, h6, h7 {
        ${tw`relative`}
    }
`;
const Article = tw.article`min-w-full my-12`;

type PostPage = {
    source: MDXRemoteSerializeResult;
    meta: PostMeta;
};

const Post = ({ source, meta }: PostPage) => {
    const formattedDate = formatDate(meta.date);

    return (
        <Fragment>
            <NextSeo
                title={meta.title}
                openGraph={{
                    title: meta.title,
                    type: 'article',
                    article: {
                        publishedTime: meta.date,
                        tags: meta.tags?.length > 0 ? meta.tags : [],
                    },
                }}
            />
            <Article>
                <Title>{meta.title}</Title>
                <Meta>
                    <Date title={meta.date}>{formattedDate}</Date>
                    {meta.tags?.length > 0 && (
                        <Fragment>
                            {' '}
                            - <TagList tags={meta.tags} />
                        </Fragment>
                    )}
                </Meta>

                <Content>
                    <MDXRemote {...source} />
                </Content>
            </Article>
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { mdxSource, meta } = await getPost(params?.slug as string);

    return {
        props: {
            source: mdxSource,
            meta,
        } as PostPage,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getPostsSlug().map((slug) => ({
        params: {
            slug: slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default Post;
