import tw from 'twin.macro';
import Link from 'next/link';
import slugify from 'slugify';
import { styled } from 'twin.macro';

const tagStyles = {
	gatsbyjs: tw`bg-violet-700 text-white hover:bg-violet-900`,
	development: tw`bg-green-600 text-white hover:bg-green-800`,
	travel: tw`bg-yellow-500 hover:(bg-yellow-600 text-white)`,
	fontawesome: tw`bg-blue-900 text-white hover:bg-blue-700`,
	video: tw`bg-red-500 text-white hover:bg-red-600`,
	nextjs: tw`bg-gray-900 text-white hover:bg-gray-700`,
};

type TagType = keyof typeof tagStyles;

const TagListContainer = tw.ul`list-none flex`;
const TagItem = styled.li(({ tag }: { tag: TagType}) => [
	tw`mr-2 px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400`,
	tagStyles[tag],
]);

const TagList = ({ tags }: { tags: string[] }) => {
	if (tags.length === 0) {
		return null;
	}

	return (
		<TagListContainer>
			{tags.map((tag) => {
				const tagSlug = slugify(tag, { lower: true, strict: true }) as TagType;

				return (
					<TagItem key={tag} tag={tagSlug}>
						<Link href={`/blog/tag/${tag}`}>
							{tag}
						</Link>
					</TagItem>
				);
			})}
		</TagListContainer>
	);
};

export default TagList;
