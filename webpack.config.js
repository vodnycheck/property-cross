const path = require('path');

module.exports = {
	entry: './src/index.js',
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: /node_modules/,
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.bundle.js',
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
};