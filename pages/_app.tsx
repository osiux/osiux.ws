import React from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'highlight.js/styles/lioshi.css';
import 'react-hint/css/index.css';
import 'typeface-roboto';
import 'typeface-open-sans';

import Layout from '@app/components/Layout';

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => (
    <CacheProvider value={cache}>
        <GlobalStyles />
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </CacheProvider>
);

export default App;
