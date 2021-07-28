import { Fragment } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { s } from 'hastscript';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
// @ts-ignore
import slug from 'rehype-slug';
// @ts-ignore
import headings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
// @ts-ignore
import highlight from 'rehype-highlight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import { NextSeo } from 'next-seo';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { getPostData, getPostsSlug, components } from '@app/utils/posts';
import { formatDate } from '@app/utils/dates';
import type { PostMeta } from '@app/utils/posts';
import embedder from '@app/utils/embedder';

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
                    <MDXRemote {...source} components={components} />
                </Content>
            </Article>
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { content, meta } = await getPostData(params?.slug as string);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [embedder],
            rehypePlugins: [
                slug,
                [
                    headings,
                    {
                        properties: {
                            class: 'anchor before',
                            ariaHidden: true,
                            tabIndex: -1,
                        },
                        content: (node: any) => {
                            return s(
                                'svg',
                                {
                                    'aria-hidden': true,
                                    focusable: false,
                                    height: 16,
                                    width: 16,
                                    version: '1.1',
                                    viewBox: '0 0 16 16',
                                },
                                [
                                    s('path', {
                                        'fill-rule': 'evenodd',
                                        d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                                    }),
                                ],
                            );
                        },
                    },
                ],
                rehypeAccessibleEmojis,
                highlight,
            ],
        },
        scope: meta,
    });

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
