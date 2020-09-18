import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStepBackward,
    faStepForward,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const PaginationContainer = tw.nav`flex justify-center my-5`;

const Paginator = tw.ul`list-none m-0 p-0 flex`;

const Item = styled.li`
    ${tw`mx-1 pl-3!`}

    .disabled {
        ${tw`text-gray-800`}
    }

    &.number {
        ${tw`hidden md:inline-block`}
    }

    &::before {
        ${tw`hidden!`}
    }
`;

const ItemLink = styled.a`
    ${tw`no-underline! text-center inline-block border border-solid border-secondary p-1 w-8 text-sm`}

    &.current {
        ${tw`bg-secondary text-primary`}
    }
`;

type PaginationProps = {
    basePath?: string;
    prefix?: string;
    totalPages: number;
    currentPage: number;
    nextPath?: string;
};

const Pagination = ({
    basePath = '/blog/',
    prefix = 'page-',
    totalPages,
    currentPage,
    nextPath = '/blog/[[...page]]',
}: PaginationProps) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const prevLink =
        isFirstPage || currentPage === 2
            ? basePath
            : `${basePath}${prefix}${currentPage - 1}`;
    const nextLink = isLastPage
        ? `${basePath}${prefix}${currentPage}`
        : `${basePath}${prefix}${currentPage + 1}`;

    if (totalPages === 1) return null;

    return (
        <PaginationContainer>
            <Paginator>
                <Item>
                    {isFirstPage ? (
                        <FontAwesomeIcon
                            icon={faStepBackward}
                            color="#ccc"
                            fixedWidth
                        />
                    ) : (
                        <Link href={nextPath} as={basePath} passHref>
                            <ItemLink
                                title="First Page"
                                className={currentPage === 1 ? 'disabled' : ''}
                            >
                                <FontAwesomeIcon
                                    icon={faStepBackward}
                                    fixedWidth
                                />
                            </ItemLink>
                        </Link>
                    )}
                </Item>
                <Item>
                    {isFirstPage ? (
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            color="#ccc"
                            fixedWidth
                        />
                    ) : (
                        <Link href={nextPath} as={prevLink} passHref>
                            <ItemLink
                                title="Previous Page"
                                className={currentPage === 1 ? 'disabled' : ''}
                            >
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    fixedWidth
                                />
                            </ItemLink>
                        </Link>
                    )}
                </Item>
                {[...Array(totalPages)].map((_val, page) => {
                    const pageLink =
                        page === 0
                            ? basePath
                            : `${basePath}${prefix}${page + 1}`;

                    return (
                        <Item key={page} className="number">
                            <Link href={nextPath} as={pageLink} passHref>
                                <ItemLink
                                    title={`Go to Page ${page + 1}`}
                                    className={
                                        currentPage === page + 1
                                            ? 'current'
                                            : ''
                                    }
                                >
                                    {page + 1}
                                </ItemLink>
                            </Link>
                        </Item>
                    );
                })}
                <Item>
                    {isLastPage ? (
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            color="#ccc"
                            fixedWidth
                        />
                    ) : (
                        <Link href={nextPath} as={nextLink} passHref>
                            <ItemLink
                                title="Next Page"
                                className={
                                    currentPage === totalPages ? 'disabled' : ''
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    fixedWidth
                                />
                            </ItemLink>
                        </Link>
                    )}
                </Item>
                <Item>
                    {isLastPage ? (
                        <FontAwesomeIcon
                            icon={faStepForward}
                            color="#ccc"
                            fixedWidth
                        />
                    ) : (
                        <Link
                            href={nextPath}
                            as={`${basePath}${prefix}${totalPages}`}
                            passHref
                        >
                            <ItemLink
                                title="Last Page"
                                className={
                                    currentPage === totalPages ? 'disabled' : ''
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faStepForward}
                                    fixedWidth
                                />
                            </ItemLink>
                        </Link>
                    )}
                </Item>
            </Paginator>
        </PaginationContainer>
    );
};

export default Pagination;
