import tw, { css } from 'twin.macro';

const global = css`
    body {
        ${tw`bg-gray-50 font-text`}
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        ${tw`font-heading`}
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
        margin-bottom: 0;
    }

    pre {
        ${tw`whitespace-pre-wrap break-words`}
    }

    blockquote {
        /* border-left: 0.28125rem solid var(--color-link); */
        /* color: var(--color-secondary); */
    }

    .tag {
        ${tw`bg-gray-300 text-gray-800 hover:bg-gray-400`}
    }

    .tag-gatsbyjs {
        ${tw`bg-purple-700 text-white hover:bg-purple-900`}
    }

    .tag-development {
        ${tw`bg-green-600 text-white hover:bg-green-800`}
    }

    .tag-travel {
        ${tw`bg-yellow-500 hover:(bg-yellow-700 text-white)`}
    }
`;

export default global;
