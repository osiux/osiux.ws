module.exports = {
	darkMode: 'class',
	content: [],
	theme: {
		extend: {
			gridTemplateRows: {
				layout: 'auto 1fr',
			},
			typography: {
				DEFAULT: {
					css: {
						pre: null,
					},
				},
			},
		},
		fontFamily: {
			heading: ['Open\\ Sans', 'sans-serif'],
			text: ['Roboto', 'serif'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
	experimental: {
		uniformColorPalette: true,
		defaultLineHeights: true,
	},
};
