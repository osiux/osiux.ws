import Link from 'next/link';
import { Flickr, YouTube } from 'mdx-embed';

// https://github.com/leerob/leerob.io/blob/4207a37f0bb82cdbc17fcc778112ccb30bc0aaf2/components/MDXComponents.tsx#L13-L26
// @ts-ignore
const CustomLink = (props) => {
	const href = props.href;
	const isInternalLink =
		href && (href.startsWith('/') || href.startsWith('#'));

	if (isInternalLink) {
		return (
			<Link href={href}>
				<a {...props}>{props.children}</a>
			</Link>
		);
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
	a: CustomLink,
	Flickr,
	YouTube,
};

export default MDXComponents;
