import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import Image from 'next/image';
import { BlurhashCanvas } from 'react-blurhash';

import { formatDate } from '@app/utils/dates';
import type { PostMeta } from '@app/utils/posts';
import TagList from '@app/components/TagList';

const Article = tw.article`mb-16 flex flex-wrap w-full md:flex-nowrap`;
const ImageCaption = styled.caption`
	${tw`inline-block w-full text-sm`}

	a {
		${tw`underline`}
	}
`;
const Meta = tw.p`transition-colors duration-100 text-gray-600 text-sm mb-2 mt-2 md:mt-0 dark:text-gray-300`;
const Title = tw.h2`text-2xl font-bold mb-2 font-heading`;
const ArticleLink = tw.a`transition-colors duration-300 text-gray-900 dark:text-gray-100 hover:underline`;
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
				<div tw="mr-3">
					<Link href={`/blog/${slug}`} passHref>
						<a tw="relative block overflow-hidden">
							<BlurhashCanvas
								hash={image.blur_hash}
								width={500}
								height={350}
								punch={1}
								tw="w-full md:max-w-full rounded-md absolute top-0 left-0"
							/>
							<Image
								tw="w-full md:max-w-full rounded-md"
								width={500}
								height={350}
								src={`${image.url}&w=500&h=350&fit=clamp`}
								alt={`${image.description} by ${image.user.name} @ unsplash`}
							/>
						</a>
					</Link>
					<ImageCaption>
						Photo by{' '}
						<a
							href={`${image.user.link}?utm_source=osiux.ws&utm_medium=referral`}
						>
							{image.user.name}
						</a>{' '}
						on{' '}
						<a href="https://unsplash.com/?utm_source=osiux.ws&utm_medium=referral">
							Unsplash
						</a>
					</ImageCaption>
				</div>
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
