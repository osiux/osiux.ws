import tw from 'twin.macro';
import Link from 'next/link';

import { formatDate } from '@app/utils/dates';
import type { PostMeta } from '@app/utils/posts';
import TagList from '@app/components/TagList';

const Article = tw.article`mb-16 flex flex-wrap items-center w-full md:flex-nowrap`;
const Meta = tw.p`transition-all duration-700 text-gray-600 text-sm mb-2 mt-2 md:mt-0 dark:text-gray-300`;
const Title = tw.h2`text-2xl font-bold text-gray-900 mb-2 font-heading`;
const ArticleLink = tw.a`hover:underline`;
const Excerpt = tw.p`leading-relaxed mt-2 prose max-w-full!`;

const SimplePost = ({
	title,
	slug,
	date,
	tags = [],
	image,
	excerpt,
	readingTime,
}: PostMeta) => {
	const formattedDate = formatDate(date);

	return (
		<Article>
			{image && (
				<Link href={`/blog/${slug}`} passHref>
					<a tw="mr-3">
						<img
							tw="w-full md:max-w-full rounded-md"
							src={`${image.url}&w=500&h=350&fit=clamp`}
							alt={`${image.description} by ${image.user.name} @ unsplash`}
						/>
					</a>
				</Link>
			)}
			<div tw="w-full md:flex-grow">
				<Meta>
					<abbr title={date}>{formattedDate}</abbr> &mdash;{' '}
					{readingTime?.text}
				</Meta>
				<Title>
					<Link href={`/blog/${slug}`} passHref>
						<ArticleLink>{title}</ArticleLink>
					</Link>
				</Title>
				{excerpt && <Excerpt>{excerpt}</Excerpt>}
				<TagList tags={tags} />
			</div>
		</Article>
	);
};

export default SimplePost;
