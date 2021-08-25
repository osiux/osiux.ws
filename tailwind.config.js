module.exports = {
	purge: [],
	theme: {
		extend: {
			gridTemplateRows: {
				layout: 'auto 1fr',
			},
		},
		fontFamily: {
			heading: ['Open\\ Sans', 'sans-serif'],
			text: ['Roboto', 'serif'],
		},
	},
	variants: {},
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class',
	experimental: {
		uniformColorPalette: true,
		defaultLineHeights: true,
	},
};
