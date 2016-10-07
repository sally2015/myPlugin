var Promise = function () {
	this.callbacks = [];
}

Promise.prototype = {
	constuctor : Promise,
	resolve : function(result){
		this.complete('resolve', result);
	},
	reject : function (result){
		this.complete('reject', result);
	},
	complete : function(type, result){

		while(this.callbacks[0]){
			this.callbacks.shift()[type](result);
		}
		return this;
	},
	then : function(success, failure){
		this.callbacks.push({
			resolve : success,
			reject : failure
		});
		return this;
	}
};