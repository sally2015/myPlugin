define(function(require, exports, module) {
	var exportObj={
		class2type :{},
		toString : Object.prototype.toString,
		getProto : Object.getPrototypeOf,
		hasOwn : Object.hasOwnProperty,
		fnToString : Object.toString,
		ObjectFunctionString : Object.toString.call(Object)
	}
	return exportObj;
});