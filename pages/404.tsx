import tw from 'twin.macro';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import Layout from '@app/components/Layout';

const Section = tw.section`flex flex-col content-center text-center pt-3`;

const NotFoundPage = () => (
	<Layout>
		<NextSeo title="404: Not found" />
		<Section>
			<Image
				style={{ margin: '0 auto', clipPath: 'circle(50% at 50% 50%)' }}
				src="/images/salem.png"
				alt="Salem"
				width="300"
				height="300"
			/>
			<h1 tw="mt-10">NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</Section>
	</Layout>
);

export default NotFoundPage;
