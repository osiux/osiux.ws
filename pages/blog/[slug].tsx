import React, { Fragment } from 'react';
import tw from 'twin.macro';
import Link from 'next/link';
import type { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons';

import SEO from '@app/components/SEO';

import { getPostData, getPosts, components } from '@app/utils';

const Title = tw.h1`break-words mb-2!`;
const Meta = tw.p`text-sm mb-0!`;
const Date = tw.abbr`ml-2`;
const Tag = tw.span`px-2 py-1 bg-gray-400 rounded-lg mr-2 hover:(bg-gray-600 text-gray-100) no-underline!`;
const Content = tw.div`text-justify`;
const Article = tw.article`min-w-full`;
const Nav = tw.ul`flex flex-wrap justify-between list-none p-0`;

type PostProps = {
    source: string;
    meta: {
        title: string;
        date: string;
        tags: string[];
    };
};

const Post = ({ source, meta }: PostProps) => {
    const content = hydrate(source, { components });
    const formattedDate = format(parseISO(meta.date), 'MMM d, yyyy');

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
    const file = getPosts().find((post) => post.slug === params?.slug);

    const source = fs.readFileSync(file?.path as string);

    const postData = await getPostData(source);

    return {
        props: postData,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getPosts().map((path) => ({
        params: {
            slug: path.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default Post;
