import { Fragment } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import { NextSeo } from 'next-seo';
import type { GetStaticProps, GetStaticPaths } from 'next';


import { getPost, getPostsSlug } from '@app/utils/posts';
import { formatDate } from '@app/utils/dates';
import type { PostMeta } from '@app/utils/posts';

const Title = tw.h1`break-words mb-2!`;
const Meta = tw.p`text-sm mb-0!`;
const Date = tw.abbr`ml-2`;
const Tag = tw.a`px-2 py-1 bg-gray-400 rounded-lg mr-2 hover:(bg-gray-600 text-gray-100) no-underline!`;
const Content = styled.div`
    ${tw`text-justify`}

    h1, h2, h3, h4, h5, h6, h7 {
        ${tw`relative`}
    }
`;
const Article = tw.article`min-w-full`;

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
                    <FontAwesomeIcon title="Posted at" icon={faCalendarAlt} />{' '}
                    <Date title={meta.date}>{formattedDate}</Date>
                    {meta.tags?.length > 0 && (
                        <Fragment>
                            {' '}
                            -{' '}
                            <FontAwesomeIcon
                                title="Tagged as"
                                icon={faTags}
                            />{' '}
                            {meta.tags?.map((tag) => (
                                <Link
                                    key={tag}
                                    href="/blog/tag/[[...tag]]"
                                    as={`/blog/tag/${tag}`}
                                    passHref
                                >
                                    <Tag>{tag}</Tag>
                                </Link>
                            ))}
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
