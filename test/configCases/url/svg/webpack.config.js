module.exports = {
	mode: "development",
	devtool: false,
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "url/experimental"
			}
		]
	}
};
