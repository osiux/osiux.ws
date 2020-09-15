import React from 'react';
import type { AppProps } from 'next/app';

import 'tailwindcss/dist/base.min.css';
import 'typeface-roboto';
import 'typeface-open-sans';

import Layout from '../src/components/Layout';

const App = ({ Component, pageProps }: AppProps) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
);

export default App;
