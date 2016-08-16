define(function(require, exports, module) {
       var init =function(JQ){
		JQ.prototype.init = function(selector , context , root){

			if(!selector){
				return this;
			}else{
				var ele = document.querySelector(selector);

				if(ele){
					this[0] = ele;
					this.length = 1;
				}

				return this;
			}


		}
		JQ.prototype.init.prototype = JQ.prototype;//使new init 出来的对象可以使用JQ的原型方法
		
	};
	
	return init;
});