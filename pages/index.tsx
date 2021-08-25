import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import SimplePost from '@app/components/posts/SimplePost';

import { getPosts, PostData } from '@app/utils/posts';
import { comparePostDates } from '@app/utils/dates';

const POSTS_ON_HOME = 6;

type HomeProps = {
	posts: PostData[];
};

const Home = ({ posts }: HomeProps) => (
	<>
		<NextSeo title="Home" />
		{posts.map((post) => (
			<SimplePost key={post.meta.slug} {...post.meta} />
		))}
	</>
);

export const getStaticProps: GetStaticProps = async () => {
	const allPosts = await getPosts();

	const sortedPosts = allPosts.sort(comparePostDates);

	return {
		props: {
			posts: sortedPosts.slice(0, POSTS_ON_HOME),
		},
	};
};

export default Home;
