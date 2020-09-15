module.exports = {
    purge: [],
    theme: {
        extend: {
            gridTemplateRows: {
                layout: 'auto 1fr auto',
            },
            textColor: {
                header: 'var(--color-header)',
                footer: 'var(--color-footer)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
                link: 'var(--color-link)',
            },
            backgroundColor: {
                header: 'var(--color-header)',
                footer: 'var(--color-footer)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
                link: 'var(--color-link)',
            },
            borderColor: {
                header: 'var(--color-header)',
                footer: 'var(--color-footer)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
                link: 'var(--color-link)',
            },
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
    future: {
        removeDeprecatedGapUtilities: true,
    },
    dark: 'class',
    experimental: {
        darkModeVariant: true,
        uniformColorPalette: true,
        defaultLineHeights: true,
    },
};
