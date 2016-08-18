define(function(require, exports, module) {

	var sizzle = require('./sizzle');

	var sizzleInit = function(JQ){
		JQ.find = sizzle;
	}
	return sizzleInit;
});