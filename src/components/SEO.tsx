import React from 'react';
import Head from 'next/head';

type SEOProps = {
    title: string;
};

const SEO = ({ title }: SEOProps) => (
    <Head>
        <title>{title} - Eduardo Reveles</title>
        <meta
            property="og:title"
            content={`${title} | Eduardo Reveles`}
            key="title"
        />
    </Head>
);

export default SEO;
