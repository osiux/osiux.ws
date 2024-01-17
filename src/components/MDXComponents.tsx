import Link from 'next/link';
import Image from 'next/image';
// @ts-ignore
import Flickr from 'mdx-embed/dist/components/flickr';
// @ts-ignore
import YouTube from 'mdx-embed/dist/components/youtube';
import type { MDXComponents } from 'mdx/types'

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

const Components: MDXComponents = {
	/* eslint-disable-next-line jsx-a11y/alt-text */
	Image: props => <Image {...props} />,
	a: CustomLink,
	Flickr: props => <Flickr {...props} />,
	YouTube: props => <YouTube {...props} />,
};

export default Components;
