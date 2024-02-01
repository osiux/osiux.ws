import TagList from '@app/components/TagList';
import { Post } from '@app/utils/blog';
import { formatDate } from '@app/utils/dates';
import Image from 'next/image';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

const Article = tw.article`mb-16 flex flex-wrap w-full md:flex-nowrap`;
const ImageCaption = styled.div`
	${tw`inline-block w-full text-sm`}

	a {
		${tw`underline`}
	}
`;
const Meta = tw.p`transition-colors duration-100 text-gray-600 text-sm mb-2 mt-2 md:mt-0 dark:text-gray-300`;
const Title = tw.h2`text-2xl font-bold mb-2 font-heading`;
const ArticleLink = tw(
	Link,
)`transition-colors duration-300 text-gray-900 dark:text-gray-100 hover:underline`;
const Excerpt = tw.p`leading-relaxed mt-2 prose max-w-full!`;

type PostMeta = Pick<
	Post,
	| 'title'
	| 'slug'
	| 'date'
	| 'tags'
	| 'excerpt'
	| 'readingTime'
	| 'unsplash'
	| 'imgix'
>;

const SimplePost = ({
	title,
	slug,
	date,
	tags = [],
	unsplash,
	imgix,
	excerpt,
	readingTime,
}: PostMeta) => {
	const formattedDate = formatDate(date);

	return (
		<Article>
			{unsplash && (
				<div tw="mr-3">
					<Link
						tw="relative block overflow-hidden"
						href={`/blog/${slug}`}
					>
						<Image
							tw="w-full md:max-w-full rounded-md"
							width={500}
							height={350}
							src={`${unsplash.url}&w=500&h=350&fit=clamp`}
							alt={`${unsplash.description} by ${unsplash.user.name} @ unsplash`}
						/>
					</Link>
					<ImageCaption>
						Photo by{' '}
						<a
							href={`${unsplash.user.link}?utm_source=osiux.ws&utm_medium=referral`}
						>
							{unsplash.user.name}
						</a>{' '}
						on{' '}
						<a href="https://unsplash.com/?utm_source=osiux.ws&utm_medium=referral">
							Unsplash
						</a>
					</ImageCaption>
				</div>
			)}
			{imgix && (
				<div tw="mr-3">
					<Link
						tw="relative block overflow-hidden"
						href={`/blog/${slug}`}
					>
						<img
							src={imgix.url}
							alt={title}
							width={500}
							height={350}
						/>
					</Link>
				</div>
			)}
			<div tw="w-full md:flex-grow">
				<Meta>
					<abbr title={date}>{formattedDate}</abbr> &mdash;{' '}
					{readingTime?.text}
				</Meta>
				<Title>
					<ArticleLink href={`/blog/${slug}`}>
						{title}
					</ArticleLink>
				</Title>
				{excerpt && <Excerpt>{excerpt}</Excerpt>}
				<TagList tags={tags} />
			</div>
		</Article>
	);
};

export default SimplePost;
