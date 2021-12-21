import type { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
import { allPosts } from '.contentlayer/data';
import type { Post } from '.contentlayer/types';

import SimplePost from '@app/components/posts/SimplePost';
import Pagination from '@app/components/Pagination';
import Layout from '@app/components/Layout';

import { comparePostDates } from '@app/utils/dates';

export const POSTS_PER_PAGE = 10;

export type ArchivePageProps = {
	posts: Post[];
	totalPages: number;
	currentPage: number;
};

const ArchivePage = ({ posts, totalPages, currentPage }: ArchivePageProps) => {
	return (
		<Layout>
			<NextSeo title={`Archive - Page ${currentPage}`} />
			<h1 tw="text-5xl mb-10">Archive</h1>
			{posts.map((post) => (
				<SimplePost key={post.slug} {...post} />
			))}
			<Pagination totalPages={totalPages} currentPage={currentPage} />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const [, page] = params?.page?.[0]?.split('-') ?? [, 1];

	const sortedPosts = allPosts.sort(comparePostDates);

	return {
		props: {
			posts: sortedPosts.slice(
				((page as number) - 1) * POSTS_PER_PAGE,
				(page as number) * POSTS_PER_PAGE,
			),
			totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
			currentPage: parseInt(page as string, 10),
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = Array.from(
		{ length: Math.ceil(allPosts.length / POSTS_PER_PAGE) },
		(_, i) => ({
			params: {
				page: i === 0 ? undefined : [`page-${i + 1}`],
			},
		}),
	);

	return {
		paths,
		fallback: false,
	};
};

export default ArchivePage;
