import React, { Fragment } from 'react';
import tw from 'twin.macro';
import { Global } from '@emotion/core';

import global from '../styles/global';

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
        <Container>
            <Navigation />
            <Main>{children}</Main>
            <Footer />
        </Container>
    </Fragment>
);

export default Layout;