var tool={
	
	viewH:document.documentElement.clientHeight,//获取可视区高度
	viewW:document.documentElement.clientWidth,//获取可视区宽度
	addClass:function(obj,name){//添加class,支持一次添加多个class
		
		var str = obj.className;
		var nameArr=name.split(' ');
		var arr=str.split(' ');
		
		for(var i=0;i<arr.length;i++){
			if(!nameArr.length){
				break;
			}
			for(var j=0;j<nameArr.length;j++){
				
				if(nameArr[j]==arr[i]){
					nameArr.splice(j,1);
					j--;
				}
			}
		}
		if(nameArr.length){
			obj.className+=" "+nameArr.join(' ');	
		}
		
		
	},
	removeClass:function(obj,name){//删除class,支持一次删除多个class
		
		var str = obj.className;
		var arr=str.split(' ');
		var nameArr=name.split(' ');
		for(var i=0;i<arr.length;i++){
			if(!nameArr.length){
				break;
			}
			for(var j=0;j<nameArr.length;j++){
				
				if(nameArr[j]==arr[i]){
					arr.splice(i,1);
					nameArr.splice(j,1);
					j--;
				}
			}
		}
		obj.className=arr.join(' ')
		
	},
	hasClass:function(obj,name){//检测是否含有指定class
		var str = obj.className;
		var arr=str.split(' ');
		
		for(var i=0;i<arr.length;i++){
			
			if(arr[i]==name){
				return true;
			}
		}
		return false;
	},
	toggleClass:function(obj,name){
		if(this.hasClass(obj,name)){
			this.removeClass(obj,name);
		}else{
			this.addClass(obj,name);
		}
	},
	getStyle:function(obj,attr){//获取样式，兼容到ie7
		if(obj.currentStyle){
			return parseInt(obj.currentStyle[attr]);
		}else{
			return parseInt(getComputedStyle(obj,null)[attr]);
		}
		
	},
	myMouseWheel:function(obj,callback){//鼠标滚轮事件兼容，通过回调参数down或者up判断滚轮方向
		var position='';
		obj.addEventListener('mousewheel',function(ev){
			if(ev.wheelDelta<0){
				position='down';
			}else{
				position='up';
			}
			callback(position);
		});
		obj.addEventListener('DOMMouseScroll',function(ev){//兼容火狐
			if(ev.detail>0){
				position='down';
			}else{
				position='up';
			}
			callback(position);
		});	
		
	},
	loadScript:function(url,callback){//动态创建script标签，作用是无论在哪里启动下载都不会阻塞页面其他进程
		
		var oScript=document.createElement('script');
		oScript.type='text/javascript';
		
		if(oScript.readyState){//ie
			oScript.onreadystatechange=function(){
				if(oScript.readyState=='loaded'||oScript.readyState=='complete'){//状态不一致，触发其中一个就行了
					oScript.onreadystatechange=null;//触发其中一个就可以把事件取消了
					callback();
				}else{
					oScript.onload=function(){
						callback();
					}
				}
			}
		}
		
		oScript.src=url;
		document.getElementsByTagName('head')[0].appendChild(oScript);
	},
	addHandle:function(obj,ev,calback){
		if(obj.addEventListener){
			
			this.addHandle=function(obj,ev,calback){//检测后覆盖原来的函数
				obj.addEventListener(ev,calback,false);
			}
		}else{
			this.addHandle=function(obj,ev,calback){
				obj.attachEvent('on'+ev,calback);
			}

		}
		this.addHandle(obj,ev,calback)//只执行一次
	},
	removeHandle:function(obj,ev,calback){
		if(obj.removeEventListener){
			
			this.removeHandle=function(obj,ev,calback){//检测后覆盖原来的函数
				obj.removeEventListener(ev,calback,false);
			}
		}else{
			this.addHandle=function(obj,ev,calback){
				obj.detachEvent('on'+ev,calback);
			}

		}
		this.removeHandle(obj,ev,calback)//只执行一次
	},
	getRandom:function(start,end){//获取随机数字
		var ars=arguments;
		var s;
		var e;
		if(ars.length==1){
			e=ars[0];
			s=0;
		}else{
			s=start;
			e=end;
		}
		return Math.floor(Math.random()*(e-s+1)+start);
	},
	getNextElement:function(obj){//兼容ie8的获取下一个兄弟节点
		if(obj.nextElementSibling){
			return obj.nextElementSibling;
		}else{
			var temp=obj.nextSibling;
			while(temp&&temp.nodeType!=1){
				temp=temp.nextSibling;
			}
			return temp;
		}
	},
	getArryUnique:function(arr,btn){//数组去重,btn为true选择从大到小,默认为从小到大
		var newArry=[];
		var b=btn;
		
		if(b!==undefined){
			if(btn){
				arr.sort(function(a,b){//先进行排序
					return b-a;
				});
			}
		}else{
			arr.sort(function(a,b){//先进行排序
					return b-a;
			});
		}
		
		var temp=arr[0];
		newArry[0]=arr[0];
		
		for(var i=1;i<arr.length;i++){
			if(arr[i]==temp){
				continue;
			}else{
				temp=arr[i];
				newArry.push(arr[i]);
			}
		}
		return newArry;
	}
	
	
}
