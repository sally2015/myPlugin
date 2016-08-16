define(function(require, exports, module) {
       var global = function(JQ){

			var _JQ = window.JQ;
			
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