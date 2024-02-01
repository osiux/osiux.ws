import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The folders containing files importing twin.macro
const includedDirs = [
	path.resolve(__dirname, 'src'),
	path.resolve(__dirname, 'pages'),
];

export default function withTwin(nextConfig) {
	return {
		...nextConfig,
		webpack(config, options) {
			const { dev, isServer } = options;
			// Make the loader work with the new app directory
			const patchedDefaultLoaders = options.defaultLoaders.babel;
			patchedDefaultLoaders.options.hasServerComponents = false;
			patchedDefaultLoaders.options.hasReactRefresh = false;

			config.module = config.module || {};
			config.module.rules = config.module.rules || [];
			config.module.rules.push({
				test: /\.(tsx|ts)$/,
				include: includedDirs,
				use: [
					patchedDefaultLoaders,
					{
						loader: 'babel-loader',
						options: {
							sourceMaps: dev,
							plugins: [
								require.resolve('babel-plugin-macros'),
								require.resolve('@emotion/babel-plugin'),
								[
									require.resolve(
										'@babel/plugin-syntax-typescript',
									),
									{ isTSX: true },
								],
							],
						},
					},
				],
			});

			if (!isServer) {
				config.resolve.fallback = {
					...(config.resolve.fallback || {}),
					fs: false,
					module: false,
					path: false,
					os: false,
					crypto: false,
				};
			}

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options);
			} else {
				return config;
			}
		},
	};
}
