import tw from 'twin.macro';
import Link from 'next/link';

const TagListContainer = tw.ul`list-none flex mt-2`;
const TagItem = tw.li`mr-2 px-3 py-1 rounded-md`;

const TagList = ({ tags }: { tags: string[] }) => {
    if (tags.length === 0) {
        return null;
    }

    return (
        <TagListContainer>
            {tags.map((tag) => (
                <TagItem key={tag} className={`tag tag-${tag}`}>
                    <Link href={`/blog/tag/${tag}`} passHref>
                        {tag}
                    </Link>
                </TagItem>
            ))}
        </TagListContainer>
    );
};

export default TagList;
