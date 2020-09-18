import React, { Fragment } from 'react';
import tw from 'twin.macro';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons';

const Article = tw.article`mb-1 max-w-none px-2 py-3 rounded border-b border-gray-500 hover:(shadow-md bg-gray-200)`;
const ArticleLink = tw.a`no-underline!`;
const Date = tw.abbr`ml-2`;
const Title = tw.h2`mb-2! mt-0!`;
const Meta = tw.p`mb-0!`;
const Tag = tw.span`px-2 py-1 bg-gray-400 rounded-lg mr-2 hover:(bg-gray-600 text-gray-100) no-underline!`;

type SimplePostsProps = {
    title: string;
    slug: string;
    date: string;
    tags: string[];
};

const SimplePost = ({ title, slug, date, tags = [] }: SimplePostsProps) => {
    const formattedDate = format(parseISO(date), 'MMM d, yyyy');

    return (
        <Article>
            <Link href="/blog/[slug]" as={`/blog/${slug}`} passHref>
                <ArticleLink>
                    <Title>{title}</Title>
                    <Meta>
                        <FontAwesomeIcon
                            title="Posted at"
                            icon={faCalendarAlt}
                        />{' '}
                        <Date title={date}>{formattedDate}</Date>
                        {tags.length > 0 && (
                            <Fragment>
                                {' '}
                                -{' '}
                                <FontAwesomeIcon
                                    title="Tagged as"
                                    icon={faTags}
                                />{' '}
                                {tags.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </Fragment>
                        )}
                    </Meta>
                </ArticleLink>
            </Link>
        </Article>
    );
};

export default SimplePost;
