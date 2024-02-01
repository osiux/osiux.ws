import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import SimplePost from '@app/components/posts/SimplePost';
import Layout from '@app/components/Layout';

import { comparePostDates } from '@app/utils/dates';
import { getBlogPosts, Post } from '@app/utils/blog';

const POSTS_ON_HOME = 3;

type HomeProps = {
	posts: Post[];
};

const posts = getBlogPosts();

console.log(posts);

const Home = ({ posts }: HomeProps) => (
	<Layout>
		<NextSeo title="Home" />
		{posts.map((post) => (
			<SimplePost key={post.slug} {...post} />
		))}
	</Layout>
);

export const getStaticProps: GetStaticProps = async () => {
	const sortedPosts = posts.sort(comparePostDates);

	return {
		props: {
			posts: sortedPosts.slice(0, POSTS_ON_HOME),
		},
	};
};

export default Home;
