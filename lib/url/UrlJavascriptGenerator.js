/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const { RawSource } = require("webpack-sources");

class UrlJavascriptGenerator {
	generate(module) {
		// TODO(michael-ciniawsky)
		// Handle all possible cases, tests
		const source = `module.exports = __webpack_require__.p + '${
			module.buildInfo.url
		}'`;

		return new RawSource(source);
	}
}

module.exports = UrlJavascriptGenerator;
