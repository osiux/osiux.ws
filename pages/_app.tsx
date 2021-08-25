import type { AppProps } from 'next/app';
import tw, { GlobalStyles } from 'twin.macro';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'highlight.js/styles/atom-one-light.css';
import 'react-hint/css/index.css';
import '@fontsource/roboto';
import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';

config.autoAddCss = false;

import Navigation from '@app/components/Navigation';
import Footer from '@app/components/Footer';

const Container = tw.div`h-screen antialiased grid grid-rows-layout max-w-3xl mx-auto w-full py-6 px-3 mt-28 md:(max-w-4xl px-0 pt-0 pb-16)`;

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
		<ThemeProvider attribute="class">
			<Navigation />
			<Container>
				<AnimatePresence
					exitBeforeEnter
					initial={false}
					onExitComplete={() => window.scrollTo(0, 0)}
				>
					<Component {...pageProps} />
				</AnimatePresence>
				<Footer />
			</Container>
		</ThemeProvider>
	</CacheProvider>
);

export default App;
