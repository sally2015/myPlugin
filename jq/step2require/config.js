// require(['JQ','init'],function(JQ,init){
// 	//JQ('div').setBackground();
// 	// console.log(JQ().prototype)
// 	console.log(JQ('div').prototype)
// 	console.log( JQ.prototype )
// });

define(function(require, exports, module) {'use strict';

	var JQ = require('./jQ');
	JQ('div').setBackground();
	console.log(JQ('div'))
});