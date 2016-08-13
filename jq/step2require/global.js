define(function(require, exports, module) {
       var global = function(JQ){

			var _JQ = window.JQ;
			//如果使用者走的模块化形式，那是无须考虑全局变量冲突处理的，直接绕过该模块即可
			if( typeof exports === 'object' && typeof module !== "undefined"){
				return;
			}

			JQ.noConflict = function(){

				if(window.JQ === JQ){//确认在JQ加载之后没有被重写

					window.JQ=_JQ;

					return JQ; //返回JQ对象使用户可以重命名

				}
			}
			window.JQ = JQ;
		}

	return global;
});