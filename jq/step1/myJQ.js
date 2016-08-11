(function(){

	var _JQ = window.JQ;

	var version="1.0.0";
	function JQ (selector){ //构造函数

		return new init(selector);

	}
	JQ.fn = JQ.prototype={
		constructor : JQ,
		version : version,
		setBackground : function(){
			this[0].style.backgroundColor="yellow";
			return this;
		},
		setColor : function(){
			this[0].style.color="red";
			return this;
		}
	}

	var init = JQ.fn.init = function(selector , context , root){

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

	JQ.extend = JQ.fn.extend = function(){ //使对象可以使用原型方法和工具方法
		console.log(this);
	}

	/*
	 *解决冲突
	*/
	JQ.noConflict = function(){

		if(window.JQ === JQ){//确认在JQ加载之后没有被重写

			window.JQ=_JQ;

			return JQ; //返回JQ对象使用户可以重命名

		}
	}


	window.JQ=JQ;

})();