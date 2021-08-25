import tw, { css } from 'twin.macro';

const global = css`
	body {
		${tw`bg-gray-50 font-text transition-colors duration-500 dark:(bg-gray-800 text-gray-100)`}
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		${tw`font-heading transition-colors duration-500 dark:text-gray-100`}
	}

	.anchor.before {
		position: absolute;
		top: 9px;
		left: 0;
		transform: translateX(-100%);
		padding-right: 4px;
	}

	h1 .anchor svg,
	h2 .anchor svg,
	h3 .anchor svg,
	h4 .anchor svg,
	h5 .anchor svg,
	h6 .anchor svg {
		${tw`hidden`}
	}
	h1:hover .anchor svg,
	h2:hover .anchor svg,
	h3:hover .anchor svg,
	h4:hover .anchor svg,
	h5:hover .anchor svg,
	h6:hover .anchor svg,
	h1 .anchor:focus svg,
	h2 .anchor:focus svg,
	h3 .anchor:focus svg,
	h4 .anchor:focus svg,
	h5 .anchor:focus svg,
	h6 .anchor:focus svg {
		visibility: visible;
	}

	blockquote *:last-child,
	li *:last-child,
	p *:last-child {
		${tw`mb-0`}
	}

	pre {
		${tw`whitespace-pre-wrap break-words`}
	}

	blockquote {
		/* border-left: 0.28125rem solid var(--color-link); */
		/* color: var(--color-secondary); */
	}
`;

export default global;
