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

const ItemLink = styled(Link)`
	${tw`no-underline! text-center inline-block border border-solid p-1 w-8 text-sm hover:bg-gray-300`}

	&.current {
		${tw`bg-gray-300`}
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
						<ItemLink
							href={nextPath}
							as={basePath}
							title="First Page"
							className={currentPage === 1 ? 'disabled' : ''}
						>
							<FontAwesomeIcon icon={faStepBackward} fixedWidth />
						</ItemLink>
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
						<ItemLink
							href={nextPath}
							as={prevLink}
							title="Previous Page"
							className={currentPage === 1 ? 'disabled' : ''}
						>
							<FontAwesomeIcon icon={faChevronLeft} fixedWidth />
						</ItemLink>
					)}
				</Item>
				{[...Array(totalPages)].map((_val, page) => {
					const pageLink =
						page === 0
							? basePath
							: `${basePath}${prefix}${page + 1}`;

					return (
						<Item key={page} className="number">
							<ItemLink
								href={nextPath}
								as={pageLink}
								title={`Go to Page ${page + 1}`}
								className={
									currentPage === page + 1 ? 'current' : ''
								}
							>
								{page + 1}
							</ItemLink>
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
						<ItemLink
							href={nextPath}
							as={nextLink}
							title="Next Page"
							className={
								currentPage === totalPages ? 'disabled' : ''
							}
						>
							<FontAwesomeIcon icon={faChevronRight} fixedWidth />
						</ItemLink>
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
						<ItemLink
							href={nextPath}
							as={`${basePath}${prefix}${totalPages}`}
							title="Last Page"
							className={
								currentPage === totalPages ? 'disabled' : ''
							}
						>
							<FontAwesomeIcon icon={faStepForward} fixedWidth />
						</ItemLink>
					)}
				</Item>
			</Paginator>
		</PaginationContainer>
	);
};

export default Pagination;
