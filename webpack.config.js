const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devtool: 'source-map',

	output: {

		filename: 'bundle.js',
		publicPath: '/dist/',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [new webpack.ProgressPlugin()],

	module: {
		rules: [
			{
				test: /.js$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',
				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			}
		]
	},

	optimization: {
		
	},

	devServer: {
		open: 'google-chrome',
		openPage: 'dist/index-dev.html',
		index: path.join(__dirname, 'dist', 'index-dev.html'),
	}
};
