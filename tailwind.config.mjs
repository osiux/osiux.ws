/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'sans-serif',
				],
				serif: [
					'Georgia',
					'Cambria',
					'"Times New Roman"',
					'Times',
					'serif',
				],
			},
			gridTemplateRows: {
				layout: 'auto 1fr',
			},
			typography: {
				DEFAULT: {
					css: {
						pre: null,
						maxWidth: 'none',
					},
				},
			},
		},
	},
};
