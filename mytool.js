var tool={
	
	viewH:document.documentElement.clientHeight,//获取可视区高度
	viewW:document.documentElement.clientWidth,//获取可视区宽度
	addClass:function(obj,name){//添加class
		
		var str = obj.className;
		
		var arr=str.split(' ');
		
		for(var i=0;i<arr.length;i++){
			
			if(arr[i]==name){
				return ;
			}
		}
		obj.className+=" "+name;
		
	},
	removeClass:function(obj,name){//删除class
		
		var str = obj.className;
		var arr=str.split(' ');
		
		for(var i=0;i<arr.length;i++){
			
			if(arr[i]==name){
				arr.splice(i,1);
				obj.className=arr.join(' ');
				return;
			}
		}
		
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
	}
	
}
