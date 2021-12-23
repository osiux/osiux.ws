import { Fragment } from 'react';
import tw, { styled } from 'twin.macro';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { NextSeo } from 'next-seo';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { allPosts } from '.contentlayer/data';
import type { Post } from '.contentlayer/types';

import { formatDate } from '@app/utils/dates';
import TagList from '@app/components/TagList';
import Layout from '@app/components/Layout';
import components from '@app/components/MDXComponents';

const Title = tw.h1`break-words font-heading font-bold text-3xl mb-5 md:(text-5xl mb-10) text-gray-800`;
const Meta = tw.p`mb-10 flex flex-col transition-colors duration-300 md:flex-row md:items-center`;
const Date = tw.abbr`block mb-5 md:(inline mb-0)`;
const Separator = tw.span`hidden md:inline mx-2`;
const Content = styled.div`
	${tw`text-justify prose transition-colors duration-300 md:prose-xl max-w-full! dark:text-gray-100`}

	h1, h2, h3, h4, h5, h6 {
		${tw`relative transition-colors duration-300 dark:text-gray-100`}
	}

	a {
		${tw`transition-colors duration-300 dark:text-gray-100`}
	}
`;
const Article = tw.article`min-w-full mb-12`;

type PostPage = {
	post: Post;
};

const PostPage = ({ post }: PostPage) => {
	const formattedDate = formatDate(post.date);
	const Component = useMDXComponent(post.body.code);

	return (
		<Layout>
			<NextSeo
				title={post.title}
				openGraph={{
					url: `${
						process.env.NEXT_PUBLIC_VERCEL_URL ??
						'http://localhost:4040'
					}/blog/${post.slug}`,
					title: post.title,
					type: 'article',
					article: {
						publishedTime: post.date,
						tags: post.tags ?? [],
					},
				}}
			/>
			<Article>
				<Title>{post.title}</Title>
				<Meta>
					<Date title={post.date}>{formattedDate}</Date>
					{post.tags && (
						<Fragment>
							<Separator>&mdash;</Separator>
							<TagList tags={post.tags ?? []} />
						</Fragment>
					)}
				</Meta>

				<Content>
					<Component components={components} />
				</Content>
			</Article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const post = allPosts.find(
		(post) => post.slug === (params?.slug as string),
	);

	return {
		props: {
			post,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: allPosts.map((post) => ({ params: { slug: post.slug } })),
		fallback: false,
	};
};

export default PostPage;
