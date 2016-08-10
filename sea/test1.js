define(function(require,exports,module) {

	var a = require('a');

	var data1 = 1;
	var func1 = function(){
		console.log(a.func2(data1)) ;
	} 

	exports.data2 = 2;

	exports.func2 = function(){
		func1();
	}

	var b= require('b');
	var c=require('http://blog.codinglabs.org/assets/vendor/google-code-prettify/prettify.js');


})