import { css } from 'twin.macro';

const global = css`
    :root {
        --color-header: #3c366b;
        --color-footer: #020202;
        --color-primary: #fafafa;
        --color-secondary: #222831;
        --color-tertiary: #0a0a0a;
        --color-link: #ec003b;
    }

    .dark {
        --color-header: #212d40;
        --color-footer: #020202;
        --color-primary: #404040;
        --color-secondary: #fafafa;
        --color-tertiary: #0a0a0a;
        --color-link: #7fdbff;

        img:not([src*='.svg']) {
            filter: grayscale(50%);
        }
    }

    body {
        color: var(--color-secondary);
        background-color: var(--color-primary);
        transition-property: background-color, border-color, color, fill, stroke;
        transition-duration: 500ms;
        transition-timing-function: linear;
        font-family: 'Open Sans', sans-serif;
    }

    a {
        color: var(--color-link);
        transition-property: background-color, border-color, color, fill, stroke;
        transition-duration: 100ms;
        transition-timing-function: linear;
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
        visibility: hidden;
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

    blockquote {
        border-left: 0.28125rem solid var(--color-link);
        color: var(--color-secondary);
    }
`;

export default global;
