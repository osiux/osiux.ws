import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
				serif: ['Roboto', ...defaultTheme.fontFamily.serif],
			},
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
	},
};
