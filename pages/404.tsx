import React from 'react';
import tw from 'twin.macro';
import Img from 'react-optimized-image';
import { NextSeo } from 'next-seo';

import Salem from '@images/salem.png';

const Section = tw.section`flex flex-col content-center text-center pt-3`;

const NotFoundPage = () => (
    <>
        <NextSeo title="404: Not found" />
        <Section>
            <Img
                style={{ margin: '0 auto', clipPath: 'circle(50% at 50% 50%)' }}
                src={Salem}
                webp
                sizes={[300]}
            />
            <h1 tw="mt-10">NOT FOUND</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Section>
    </>
);

export default NotFoundPage;
