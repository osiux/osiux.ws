module.exports = {
    purge: [],
    theme: {
        extend: {
            gridTemplateRows: {
                layout: "auto 1fr auto",
            },
        },
        fontFamily: {
            heading: ["Open\\ Sans", 'sans-serif'],
            text: ["Roboto", 'serif'],
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
    dark: 'class',
    experimental: {
        uniformColorPalette: true,
        defaultLineHeights: true,
    },
};
