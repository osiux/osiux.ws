import tw, { css } from 'twin.macro';

/**
 * Styles for hightlight.js
 * - https://github.com/highlightjs/highlight.js/blob/a05a1acaff34a02e6625f3be8d0ec7bedcb175aa/src/styles/atom-one-light.css
 * - https://github.com/highlightjs/highlight.js/blob/a05a1acaff34a02e6625f3be8d0ec7bedcb175aa/src/styles/atom-one-dark.css
 */

const hljs = css`
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

	pre {
		${tw`bg-transparent! m-0! p-0!`}
	}

	pre code {
		${tw`p-5!`}
	}

	.hljs {
		color: #383a42 !important;
		background: #fafafa !important;
	}

	.hljs-comment,
	.hljs-quote {
		color: #a0a1a7 !important;
		font-style: italic;
	}

	.hljs-doctag,
	.hljs-keyword,
	.hljs-formula {
		color: #a626a4 !important;
	}

	.hljs-section,
	.hljs-name,
	.hljs-selector-tag,
	.hljs-deletion,
	.hljs-subst {
		color: #e45649 !important;
	}

	.hljs-literal {
		color: #0184bb !important;
	}

	.hljs-string,
	.hljs-regexp,
	.hljs-addition,
	.hljs-attribute,
	.hljs-meta .hljs-string {
		color: #50a14f !important;
	}

	.hljs-attr,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-type,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-number {
		color: #986801 !important;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link,
	.hljs-meta,
	.hljs-selector-id,
	.hljs-title {
		color: #4078f2 !important;
	}

	.hljs-built_in,
	.hljs-title.class_,
	.hljs-class .hljs-title {
		color: #c18401 !important;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-link {
		text-decoration: underline;
	}

	.dark {
		.hljs {
			color: #abb2bf !important;
			background: #282c34 !important;
		}

		.hljs-comment,
		.hljs-quote {
			color: #5c6370 !important;
			font-style: italic;
		}

		.hljs-doctag,
		.hljs-keyword,
		.hljs-formula {
			color: #c678dd !important;
		}

		.hljs-section,
		.hljs-name,
		.hljs-selector-tag,
		.hljs-deletion,
		.hljs-subst {
			color: #e06c75 !important;
		}

		.hljs-literal {
			color: #56b6c2 !important;
		}

		.hljs-string,
		.hljs-regexp,
		.hljs-addition,
		.hljs-attribute,
		.hljs-meta .hljs-string {
			color: #98c379 !important;
		}

		.hljs-attr,
		.hljs-variable,
		.hljs-template-variable,
		.hljs-type,
		.hljs-selector-class,
		.hljs-selector-attr,
		.hljs-selector-pseudo,
		.hljs-number {
			color: #d19a66 !important;
		}

		.hljs-symbol,
		.hljs-bullet,
		.hljs-link,
		.hljs-meta,
		.hljs-selector-id,
		.hljs-title {
			color: #61aeee !important;
		}

		.hljs-built_in,
		.hljs-title.class_,
		.hljs-class .hljs-title {
			color: #e6c07b !important;
		}
	}
`;

export default hljs;
