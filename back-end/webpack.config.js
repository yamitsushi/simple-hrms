var nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "production",
	target: "node",
	externals: [nodeExternals()],
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
};
