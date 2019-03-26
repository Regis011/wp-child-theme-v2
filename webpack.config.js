/**
 * Webpack Configuration
 * @since 2.0.0
 */

const webpack = require( 'webpack' );
const path = require( 'path' );
const autoprefixer = require( 'autoprefixer' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

// Extract style.css for both editor and frontend styles.
const blocksCSSPlugin = new MiniCssExtractPlugin( {
	filename: '[name].css',
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

//Export configuration.
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
	// externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // },
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
				test: /\.s?css$/,
				use: [
					'style-loader',
					{
            loader: MiniCssExtractPlugin.loader
          },
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							sourceMap: true
            }
					},
					{ loader: 'resolve-url-loader' },
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
										'not ie < 9', // React doesn't support IE8 anyway
									],
									flexbox: 'no-2009',
								} ),
							],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							outputStyle: 'production' === process.env.MODE ? 'compressed' : 'nested',
						},
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'dist/images',
							name(file) {
                if (process.env.MODE === 'development') {
                  return '[path][name].[ext]';
                }

                return '[hash].[ext]';
              },
            },
          },
        ],
			},
			{
				test: /\.svg$/,
				use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'dist/svg',
							name(file) {
                if (process.env.MODE === 'development') {
                  return '[path][name].[ext]';
                }

                return '[hash].[ext]';
              },
            },
          },
        ],
      },
			{
				test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
				use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'dist/fonts',
							name(file) {
                if (process.env.MODE === 'development') {
                  return '[path][name].[ext]';
                }

                return '[hash].[ext]';
              },
            },
          },
        ]
			}
		]
	},
	plugins: 'production' === process.env.MODE ? prodPlugins : devPlugins,
	stats: 'normal',
};
