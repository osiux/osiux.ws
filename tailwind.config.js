module.exports = {
	purge: [],
	theme: {
		extend: {
			gridTemplateRows: {
				layout: 'auto 1fr',
			},
			dropShadow: {
				dark: '--tw-drop-shadow: drop-shadow(0 4px 3px rgba(255, 255, 255, 0.07)) drop-shadow(0 2px 2px rgba(255, 255, 255, 0.06));',
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
