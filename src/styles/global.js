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
            top: 9px !important;

            svg {
                /* fill: var(--color-link); */
            }
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
