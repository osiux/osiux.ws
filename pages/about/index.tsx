import React from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import Image from 'next/image';
// @ts-ignore
import ReactHintFactory from 'react-hint';
import { NextSeo } from 'next-seo';

import Layout from '@app/components/Layout';

const UnderlineSpan = tw.span`cursor-pointer border-b-2 border-dotted border-gray-900 transition-colors duration-300 ease-linear dark:border-gray-100`;
const Section = styled.section`
	${tw`prose transition-colors duration-300 md:prose-xl max-w-full! dark:text-gray-100`}

	img {
		${tw`mt-0`}
	}

	a {
		${tw`transition-colors duration-300 dark:text-gray-100`}
	}
`;
const PhotoCredit = tw.p`text-center text-sm mb-3`;
const HintContainer = tw.div`bg-gray-300 rounded-3xl dark:(bg-gray-600 text-gray-100)`;
const ImageCaption = tw.p`text-center py-1`;

const ReactHint = ReactHintFactory(React);

const onRenderContent = (target: any) => {
	const { rhImage } = target.dataset;

	return (
		<HintContainer className="react-hint__image">
			{rhImage === 'cats' ? (
				<Image
					src="/images/cats.jpg"
					alt="Cats"
					tw="rounded-tl-3xl rounded-tr-3xl"
					width="300"
					height="300"
				/>
			) : (
				<Image
					src="/images/amelia.jpg"
					alt="Amelia"
					tw="rounded-tl-3xl rounded-tr-3xl"
					width="300"
					height="300"
				/>
			)}
			<ImageCaption>
				{rhImage === 'cats' ? 'Salem, Mike and Kiki' : 'Amelia'}
			</ImageCaption>
		</HintContainer>
	);
};

const About = () => (
	<Layout>
		<NextSeo title="About" />
		<ReactHint autoPosition events />
		<ReactHint
			autoPosition
			events
			attribute="data-rh-image"
			onRenderContent={onRenderContent}
		/>
		<Section>
			<Image css={tw`mx-auto`} src="/images/eduardo-reveles.jpg" alt="Eduardo Reveles" width="300" height="300" />
			<PhotoCredit>
				Photo by{' '}
				<a href="https://unsplash.com/@melspadawan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					Melissa Castillo
				</a>{' '}
				on{' '}
				<a href="https://unsplash.com/@melspadawan/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					Unsplash
				</a>
			</PhotoCredit>
			<p>
				Hi! I&apos;m Eduardo.{' '}
				<UnderlineSpan data-rh="Laravel, NodeJs, React">
					Full Stack Developer
				</UnderlineSpan>{' '}
				living in Mexico, currently working as Senior Application
				Engineer at{' '}
				<a href="https://sironamedical.com/">Sirona Medical</a>.
			</p>
			<p>
				Proudly married to a great{' '}
				<a href="https://unsplash.com/@melspadawan/">
					photographer & developer
				</a>
				, we have{' '}
				<UnderlineSpan data-rh-image="cats">3 cats</UnderlineSpan> and{' '}
				<UnderlineSpan data-rh-image="dog">a dog</UnderlineSpan>
			</p>
			<p>
				Through my career I&apos;ve used several languages, PHP being my
				main one for most part of it, but lately I&apos;ve been very
				invested in the Javascript ecosystem.
			</p>
			<p>
				<Link href="/about/uses" legacyBehavior>
					<a tw="underline">My Uses page.</a>
				</Link>
			</p>
		</Section>
	</Layout>
);

export default About;
