/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** @typedef {import("./Compiler")} Compiler */

class CachePlugin {
	/**
	 * @param {Compiler} compiler Webpack compiler
	 * @returns {void}
	 */
	apply(compiler) {
		const moduleCache = new Map();
		const assetCache = new Map();
		compiler.cache.hooks.storeModule.tap(
			"CachePlugin",
			(identifier, module) => {
				moduleCache.set(identifier, module);
			}
		);
		compiler.cache.hooks.getModule.tap("CachePlugin", identifier => {
			return moduleCache.get(identifier);
		});
		compiler.cache.hooks.storeAsset.tap(
			"CachePlugin",
			(identifier, hash, source) => {
				assetCache.set(identifier, { hash, source });
			}
		);
		compiler.cache.hooks.getAsset.tap("CachePlugin", (identifier, hash) => {
			const cacheEntry = assetCache.get(identifier);
			if (cacheEntry !== undefined && cacheEntry.hash === hash) {
				return cacheEntry.source;
			}
		});
	}
}
module.exports = CachePlugin;
