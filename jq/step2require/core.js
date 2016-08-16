define(function(require, exports, module) {
		var v = require('./var');
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
				if( typeof target !=='object' && !JQ.isFunction(target)){

					target = {};

				}
				//若target后没有其他的参数（要拷贝的对象），则扩展到JQ自身（把target并入JQ）
				if( i == length){
					target = this;
					i--; // 为了获得原target

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
							if( deep && copy && ( JQ.isPlainObject( copy ) ) ||
							 ( copyIsArray = JQ.isArray( copy ) ) ){

								//拷贝属性是数组
								if( copyIsArray ){
									copyIsArray=false;
									clone = src && isArray(src)?src :[];
									
								}else{ //拷贝对象是对象
									clone = src && JQ.isPlainObject( src )?src :{};
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

		"Boolean Number String Function Array Date RegExp Object Error Synbol".split(" ").forEach(function(name){
			v.class2type["[object "+name+"]"] = name.toLowerCase();
		});

		JQ.extend({
			isArray : Array.isArray,
			isPlainObj : function(obj){
				var proto,Ctor;
				console.log(111)
				if( !obj || v.toString.call !== '[object object]'){
					return false;
				}

				proto = v.getProto(obj);//获取prototype

				//通过Object.create(null)形式创建的{}是没有prototype的
				if( !proto){
					return true;
				}

				Ctor = v.hasOwn.call(proto,"constructor") && proto.constructor;
				return typeof Ctor === "function" && v.fnToString.call(Ctor) === v.ObjectFunctionString;

			},
			isFunction : function(obj){
				return JQ.type( obj ) === "function";
			},
			type : function(obj){
				if( obj == null){
					return obj + ""; //undefined 或 null
				}

				return typeof obj === "object" || typeof obj === "function" ?
				v.class2type[ v.toString.call( obj )] || object : typeof object;
			}
		});
			
	return JQ;
});