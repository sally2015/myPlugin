define(function(require, exports, module) {
		var v = require('./var');
    	var version="1.0.0";
		function JQ (selector){ //构造函数

			return new JQ.fn.init(selector);

		}
		JQ.fn = JQ.prototype={
			length : 0,
			constructor : JQ,
			version : version,
			setBackground : function(elems){
				this[0].style.backgroundColor="yellow";
				return this;
			},
			setColor : function(){
				this[0].style.color="red";
				return this;
			},
			pushStack : function(elems){

				//将获取的元素转为JQ对象
				var ret = JQ.merge( this.constructor(),elems);//this.contructor返回一个len为0的JQ对象
			
				//添加关系链，新JQ对象的prevObject指向旧JQ对象
				ret.prevObject = this;

				return ret;
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
					if( ( option = arguments[i]) !=null){
						
						var name,clone,copy;

						//遍历源对象
						for( name in option){
							src = target[name];
							copy = option[name];

							//避免自己和自己合并，导致无线循坏
							if( target === copy){
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

		
		JQ.isArray = JQ.fn.isArray = Array.isArray;
		JQ.isPlainObj = JQ.fn.isPlainObj = function(obj){
			var proto,Ctor;
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

		}
		JQ.isFunction = JQ.fn.isFunction = function(obj){
			return JQ.type( obj ) === "function";
		}
		JQ.fn.extend({
			find : function(selector){
				var ret,
					i,
					len = this.length,
					self = this;

					ret = this.pushStack([]);

				for(var i = 0;i < len; i++){
					JQ.find(selector,self[i],ret);
				}
				//转为JQ对象
				return ret;
			},
			end : function(){
				//直接返回上一次检索到的JQ对象（如果木有，则返回一个空的JQ对象）
				return this.prevObject || this.constructor();
			},
			eq : function(i){
				var len = this.length,
					j = +i <0 ? i+len : i;//支持负数搜索

					return this.pushStack( j >=0 && j< len ? [this[j]] :[] );
			},
			get : function(num){
				return num !=null ? (num < 0 ? this[ num +this.length ] : this[ num ]) :
					[].slice.call(this);
			},
			first : function(){
				return this.eq(0);
			},
			last : function(){
				return this.eq(-1);
			}
		});
		JQ.extend({
			type :function(obj){
				if( obj == null){
					return obj + ""; //undefined 或 null
				}

				return typeof obj === "object" || typeof obj === "function" ?
				v.class2type[ v.toString.call( obj )] || object : typeof object;
			},
			merge : function(first, second){
				var len = second.length,
					i = first.length,
					j = 0;


				for(; j<len;j++){
					first[i++] = second[j];
				}
				first.length = i;
				return first;
			}
		});
		
			
	return JQ;
});