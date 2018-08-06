const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index_bundle.js'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}, {
			test: /\.scss$/,
			use: [{
				loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
			}, {
				loader: 'css-loader'
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: function () {
						require('autoprefixer')
					}
				}
			}, {
				loader: 'sass-loader'
			},]
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader']
		},{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: ['file-loader']
		}, {
			test: /\.xml$/,
			use: [ 'xml-loader']
		}

		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	]
}