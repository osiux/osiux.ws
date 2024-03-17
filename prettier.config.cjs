/** @type {import("prettier").Config} */
module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	semi: true,
	tabWidth: 4,
	bracketSpacing: true,
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: [
		require.resolve('prettier-plugin-astro'),
		require.resolve('@trivago/prettier-plugin-sort-imports'),
	],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
