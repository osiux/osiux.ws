import tw, { css } from 'twin.macro';

const global = css`
	body {
		${tw`bg-gray-50 font-text transition-colors duration-300 dark:(bg-gray-800 text-gray-100)`}
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		${tw`font-heading font-bold transition-colors duration-300 text-gray-700 dark:text-gray-100`}
	}

	.heading-container {
		${tw`relative`}

		a {
			${tw`absolute mt-0 border-none leading-none -left-10 top-2`}
		}

		.icon-link svg {
			${tw`dark:(fill-current text-gray-100)`}
		}
	}

	.visually-hidden {
		border: 0;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	blockquote *:last-child,
	li *:last-child,
	p *:last-child {
		${tw`mb-0`}
	}

	blockquote {
		${tw`dark:text-gray-100!`}
	}

	.ch-editor-body pre code > div > div {
		height: 100% !important;
	}

	/* Code in text */
	p > code,
	li > code,
	dd > code,
	td > code {
		${tw`bg-yellow-100 dark:(text-gray-800! bg-gray-300)`}
		word-wrap: break-word;
		box-decoration-break: clone;
		padding: 0.1rem 0.3rem 0.2rem;
		border-radius: 0.2rem;
	}
`;

export default global;
