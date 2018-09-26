/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const { AsyncParallelHook, AsyncSeriesBailHook, SyncHook } = require("tapable");

class Cache {
	constructor() {
		this.hooks = {
			getModule: new AsyncSeriesBailHook(["identifier"]),
			storeModule: new AsyncParallelHook(["identifier", "module"]),
			getAsset: new AsyncSeriesBailHook(["identifier", "hash"]),
			storeAsset: new AsyncParallelHook(["identifier", "hash", "source"]),
			beginIdle: new SyncHook([]),
			endIdle: new AsyncParallelHook([])
		};
	}

	getModule(identifier, callback) {
		this.hooks.getModule.callAsync(identifier, callback);
	}

	storeModule(identifier, module, callback) {
		this.hooks.storeModule.callAsync(identifier, module, callback);
	}

	getAsset(identifier, hash, callback) {
		this.hooks.getAsset.callAsync(identifier, hash, callback);
	}

	storeAsset(identifier, hash, source, callback) {
		this.hooks.storeAsset.callAsync(identifier, hash, source, callback);
	}

	beginIdle() {
		this.hooks.beginIdle.call();
	}

	endIdle(callback) {
		this.hooks.endIdle.callAsync(callback);
	}
}

module.exports = Cache;
