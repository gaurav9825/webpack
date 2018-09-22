module.exports = {
	mode: "development",
	devtool: false,
	module: {
		rules: [
			{
				test: /\.png$/,
				type: "url/experimental"
			}
		]
	}
};
