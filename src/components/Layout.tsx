import React, { Fragment } from 'react';
import tw from 'twin.macro';
import Head from 'next/head';
import { Global } from '@emotion/react';

import global from '@app/styles/global';

import Footer from './Footer';
import Navigation from './Navigation';

const Container = tw.div`h-screen grid grid-rows-layout`;
const Main = tw.main`p-5 container mx-auto prose max-w-none`;

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <Fragment>
        <Global styles={global} />
        <Head>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Container>
            <Navigation />
            <Main>{children}</Main>
            <Footer />
        </Container>
    </Fragment>
);

export default Layout;
