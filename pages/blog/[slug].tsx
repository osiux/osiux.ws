import { Fragment } from 'react';
import tw, { styled } from 'twin.macro';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { NextSeo } from 'next-seo';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { getPost, getPostsSlug } from '@app/utils/posts';
import { formatDate } from '@app/utils/dates';
import type { PostMeta } from '@app/utils/posts';
import TagList from '@app/components/TagList';
import Layout from '@app/components/Layout';

const Title = tw.h1`break-words font-heading font-bold text-3xl mb-5 md:(text-5xl mb-10) text-gray-800`;
const Meta = tw.p`mb-10 flex flex-col transition-all duration-500 md:flex-row md:items-center`;
const Date = tw.abbr`block mb-5 md:(inline mb-0)`;
const Separator = tw.span`hidden md:inline mx-2`;
const Content = styled.div`
	${tw`text-justify prose transition-all duration-500 md:prose-xl max-w-full! dark:text-gray-100`}

	h1, h2, h3, h4, h5, h6 {
		${tw`relative transition-all duration-500 dark:text-gray-100`}
	}

	a {
		${tw`transition-all duration-500 dark:text-gray-100`}
	}

	code {
		${tw`transition-all duration-500 dark:text-gray-100`}
	}
`;
const Article = tw.article`min-w-full mb-12`;

type PostPage = {
	source: MDXRemoteSerializeResult;
	meta: PostMeta;
};

const Post = ({ source, meta }: PostPage) => {
	const formattedDate = formatDate(meta.date);

	return (
		<Layout>
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
					<Date title={meta.date}>{formattedDate}</Date>
					{meta.tags?.length > 0 && (
						<Fragment>
							<Separator>&mdash;</Separator>
							<TagList tags={meta.tags} />
						</Fragment>
					)}
				</Meta>

				<Content>
					<MDXRemote {...source} />
				</Content>
			</Article>
		</Layout>
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
