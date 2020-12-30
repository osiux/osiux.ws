import React, { Fragment } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import type { GetStaticProps, GetStaticPaths } from 'next';
// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import { NextSeo } from 'next-seo';

import {
    getPostData,
    getPostsSlug,
    components,
    PostData,
} from '@app/utils/posts';
import { formatDate } from '@app/utils/dates';

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

const Post = ({ source, meta }: PostData) => {
    const content = hydrate(source, { components });
    const formattedDate = formatDate(meta.date);

    return (
        <Fragment>
            <NextSeo title={meta.title} />
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

                <Content>{content}</Content>
            </Article>
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params?.slug as string);

    return {
        props: postData,
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
