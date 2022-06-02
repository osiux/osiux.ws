import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { allPosts } from 'contentlayer/generated';
import type { Post } from 'contentlayer/generated';

import SimplePost from '@app/components/posts/SimplePost';
import Layout from '@app/components/Layout';

import { comparePostDates } from '@app/utils/dates';

const POSTS_ON_HOME = 3;

type HomeProps = {
	posts: Post[];
};

const Home = ({ posts }: HomeProps) => (
	<Layout>
		<NextSeo title="Home" />
		{posts.map((post) => (
			<SimplePost key={post.slug} {...post} />
		))}
	</Layout>
);

export const getStaticProps: GetStaticProps = async () => {
	const sortedPosts = allPosts.sort(comparePostDates);

	return {
		props: {
			posts: sortedPosts.slice(0, POSTS_ON_HOME),
		},
	};
};

export default Home;
