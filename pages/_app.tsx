import React from 'react';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';

import 'tailwindcss/dist/base.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'typeface-roboto';
import 'typeface-open-sans';

import Layout from '@app/components/Layout';

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
);

export default App;
