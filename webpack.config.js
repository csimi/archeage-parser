const { resolve, join } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	'mode': isProduction ? 'production' : 'development',
	'entry': {
		'main': ['./app/main.js'],
	},
	'output': {
		'filename': '[name].[chunkhash].js',
		'path': resolve(__dirname, 'docs'),
		'publicPath': '/',
	},
	'performance': {
		'hints': false,
	},
	'optimization': {
		'minimize': true,
		'minimizer': [
			new TerserPlugin({
				'extractComments': false,
				'terserOptions': {
					'compress': false,
					'output': {
						'comments': false,
					},
				},
			}),
		],
		'runtimeChunk': {
			'name': 'manifest',
		},
		'splitChunks': {
			'chunks': 'initial',
			'cacheGroups': {
				'vendor': {
					'name': 'vendor',
					'test': /node_modules/,
				},
				'styles': {
					'name': 'styles',
					'test': /\.css$/,
					'chunks': 'all',
					'enforce': true,
				},
			},
		},
	},
	'stats': {
		'all': undefined,
		'modules': false,
		'excludeAssets': /public\//,
	},
	'devServer': {
		'compress': true,
		'historyApiFallback': true,
	},
	'module': {
		'rules': [
			{
				'test': /\.js$/,
				'exclude': /node_modules/,
				'use': {
					'loader': 'babel-loader',
				},
			},
		],
	},
	'plugins': [
		new HtmlWebpackPlugin({
			'template': join(__dirname, 'app', 'public', 'index.html'),
			'filename': 'index.html',
		}),
		new MiniCssExtractPlugin({
			'filename': '[name].css',
			'chunkFilename': '[ma,e].[contenthash].css',
		}),
	],
};
