import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['selector', '[data-theme="dark"]'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './astro.config.mjs'],
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
	plugins: [require('@tailwindcss/typography')],
	experimental: {
		uniformColorPalette: true,
		defaultLineHeights: true,
	},
};
