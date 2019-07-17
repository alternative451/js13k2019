const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.js',

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
		open: true
	}
};
