require.config({
    paths:{
        "JQ":"./JQ",
        "init":'./init'
    }
});
require(['JQ','init'],function(JQ,init){
	//JQ('div').setBackground();
	// console.log(JQ().prototype)
	console.log(JQ('div').prototype)
	console.log( JQ.prototype )
});