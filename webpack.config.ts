import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import GenerateJsonFromJsPlugin from 'generate-json-from-js-webpack-plugin';


const folders = {
	icons  : path.resolve(__dirname, 'icons'),
	build  : path.resolve(__dirname, 'dist'),
	source : path.resolve(__dirname, 'src'),
};

const files = {
	globals: {
		'query-selector': path.resolve(folders.source, 'global-query-selector', 'main.ts'),
	},

	pages: {
		questionnaire : path.resolve(folders.source, 'page-questionnaire', 'main.ts'),
		practice      : path.resolve(folders.source, 'page-practice', 'main.ts'),
	},

	manifest: path.resolve(folders.source, 'manifest.cjs'),
};

const configuration: webpack.Configuration = {
	plugins: [
		new GenerateJsonFromJsPlugin({
			filename : 'manifest.json',
			path     : files.manifest
		}),

		new CopyPlugin({
			patterns: [
				{ from: folders.icons, to: 'icons' },
			]
		}),
	],

	resolve: {
		extensions: [ '.js', '.ts' ],

		alias: {
			src: folders.source,
		},
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},

	optimization: {
		minimize: false
	},

	output: {
		filename : '[name].js',
		path     : folders.build,
	},

	entry: {
		'global-query-selector': files.globals['query-selector'],

		'page-questionnaire' : files.pages.questionnaire,
		'page-practice'      : files.pages.practice,
	},

	devtool : 'inline-source-map',
	mode    : 'development'
};

export default configuration;
