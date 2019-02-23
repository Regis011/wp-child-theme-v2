/**
 * Webpack Configuration
 * @since 2.0.0
 */

const webpack = require( 'webpack' );
const path = require( 'path' );
const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const blocksCSSPlugin = new ExtractTextPlugin( {
	filename: './dist/style.build.css',
} );

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

const notify = new WebpackBuildNotifierPlugin({
	title: "Egmont Blocks Webpack Build",
		logo: path.resolve("./img/favicon.png"),
		suppressSuccess: false,
		successSound: false
});

const devPlugins = [ blocksCSSPlugin, notify ];

const prodPlugins = [
	blocksCSSPlugin,
];

// Configuration for the ExtractTextPlugin — DRY rule.
const extractConfig = {
	use: [
		// "postcss" loader applies autoprefixer to our CSS.
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					autoprefixer( {
						browsers: [
							'>1%',
							'last 4 versions',
							'Firefox ESR',
							'not ie < 9',
						],
						flexbox: 'no-2009',
					} ),
				],
			},
		},
		// "sass" loader converts SCSS to CSS.
		{
			loader: 'sass-loader',
			options: {
				outputStyle: 'production' === process.env.MODE ? 'compressed' : 'nested',
			},
		},
	],
};

// Export configuration.
module.exports = {
	entry: {
		'./dist/build': path.resolve( 'src/index.js' ),
	},
	mode: process.env.MODE,
	output: {
		pathinfo: true,
		path: path.resolve( __dirname ),
		filename: '[name].js',
	},
	devtool: 'cheap-eval-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /style\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: blocksCSSPlugin.extract( extractConfig ),
			},
		],
	},
	plugins: 'production' === process.env.MODE ? prodPlugins : devPlugins,
	stats: 'normal',
};
