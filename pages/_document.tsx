import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';
import { extractCritical } from '@emotion/server';

// @ts-ignore
class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		const critical = extractCritical(initialProps.html);
		const html = critical.html;
		const styles = (
			<>
				{initialProps.styles}
				<style
					data-emotion-css={critical.ids.join(' ')}
					dangerouslySetInnerHTML={{ __html: critical.css }}
				/>
			</>
		);
		return { ...initialProps, html, styles };
	}

	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
