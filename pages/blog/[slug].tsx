import React, { Fragment } from 'react';
import tw from 'twin.macro';
import Link from 'next/link';
import type { GetStaticProps, GetStaticPaths } from 'next';
// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons';

import SEO from '@app/components/SEO';

import {
    getPostData,
    getPostsSlug,
    components,
    PostData,
} from '@app/utils/posts';
import { formatDate } from '@app/utils/dates'

const Title = tw.h1`break-words mb-2!`;
const Meta = tw.p`text-sm mb-0!`;
const Date = tw.abbr`ml-2`;
const Tag = tw.span`px-2 py-1 bg-gray-400 rounded-lg mr-2 hover:(bg-gray-600 text-gray-100) no-underline!`;
const Content = tw.div`text-justify`;
const Article = tw.article`min-w-full`;
const Nav = tw.ul`flex flex-wrap justify-between list-none p-0`;

const Post = ({ source, meta }: PostData) => {
    const content = hydrate(source, { components });
    const formattedDate = formatDate(meta.date);

    return (
        <Fragment>
            <SEO title={meta.title} />
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
                                <Tag key={tag}>{tag}</Tag>
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
