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

        &.anchor {
            position: relative;
            top: 9px !important;
            width: 16px;
            height: 16px;
            content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' focusable='false' height='16' version='1.1' viewBox='0 0 16 16' width='16'%3E%3Cpath fill-rule='evenodd' d='M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'%3E%3C/path%3E%3C/svg%3E");
        }
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
