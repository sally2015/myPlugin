define(function(require, exports, module) {
       var init =function(JQ){
		JQ.prototype.init = function(selector , context , root){

			if(!selector){
				return this;
			}else{
				var eleList = JQ.find(selector);

				if(eleList){
					JQ.merge(this, eleList);
				}

				return this;
			}


		}
		JQ.prototype.init.prototype = JQ.prototype;//使new init 出来的对象可以使用JQ的原型方法
		
	};
	
	return init;
});