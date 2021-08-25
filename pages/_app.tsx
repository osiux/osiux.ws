import type { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { DefaultSeo } from 'next-seo';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'highlight.js/styles/atom-one-light.css';
import 'react-hint/css/index.css';
import '@fontsource/roboto';
import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';

import Layout from '@app/components/Layout';

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => (
	<CacheProvider value={cache}>
		<DefaultSeo
			titleTemplate="%s - Eduardo Reveles"
			title="Home"
			description="Personal website for Eduardo Reveles"
			openGraph={{
				type: 'website',
				locale: 'en_US',
				url: 'https://www.osiux.ws/',
				site_name: 'Eduardo Reveles',
			}}
			twitter={{
				handle: '@osiux',
				cardType: 'summary_large_image',
			}}
		/>
		<GlobalStyles />
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</CacheProvider>
);

export default App;
