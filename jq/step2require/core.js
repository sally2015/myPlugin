define(function(require, exports, module) {
        	var version="1.0.0";
			function JQ (selector){ //构造函数

				return new JQ.fn.init(selector);

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
			};

		return JQ;
});