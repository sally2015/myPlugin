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

		JQ.extend = JQ.fn.extend = function(){
			var option,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				copyIsArray = false,
				deep = false; // 默认为浅拷贝

				//若第一个参数为boolean,表示决定是否是要深拷贝的参数，
				if ( typeof target === "boolean" ) {

					deep = target;
					target = arguments[i] || {};
					i++;

				}
				//若target不是对象的处理
				if( typeof target !=='object' && typeof target !=='function'){

					target = {};

				}
				//若target后没有其他的参数（要拷贝的对象），则扩展到JQ自身（把target并入JQ）
				if( i == length){
					target = this;
					i--; // 为了获得原target

				}

				var isObject = function(obj){
					return Object.prototype.toString.call(obj) === "[object object]"
				}
				var isArray = function(obj){
					return object.prototype.toString.call(obj) === "[object Array]"
				}
				for( ; i<length; i++){

					//只处理对象值不为null/undefined的情况
					if( ( option = arguments[i] !=null)){
						
						var name,clone,copy;

						//遍历源对象
						for( name in option){
							src = target[name];
							copy = option[name];

							//target已有该属性且完全相等，继续循还
							if( src === copy){
								continue;
							}
							//深拷贝
							if( deep && copy && isObject(copy) || copyIsArray = isArray(copy)){

								//拷贝属性是数组
								if( copyIsArray ){
									copyIsArray=false;
									clone = src && isArray(src)?src :[];
									
								}else{ //拷贝对象是对象
									clone = src && isObject(src)?src :{};
								}

								//继续递归
								target[name] = JQ.extend(deep,clone,copy);
							}else if(copy !== undefined){

								target[name] = copy;
							}


						}
					}
				}


			//返回修改后的对象
			return target;
		}
			
	return JQ;
});