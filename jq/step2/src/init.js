var init =function(JQ){
	JQ.fn.init = function(selector , context , root){

		if(! selector){
			return;
		}else{
			var ele = document.querySelector(selector);

			if(ele){
				this[0] = ele;
				this.length = 1;
			}
		}

	}
	init.prototype = JQ.prototype;//使new init 出来的对象可以使用JQ的原型方法
};

export default init; 