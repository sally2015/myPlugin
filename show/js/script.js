window.onload=function(){
	
	var nowPage=0;//当前页数
	var aSence=document.getElementsByClassName('sence');
	var objEvent=null;
	var objHeader=null;
	var objSenceTwo=null;
	var objSenceThree=null;
	init();
	function init(){//初始化
		
		resize();
		objEvent=events();
		objHeader=headerFn();
		sceneOneFn();
		objSenceTwo=scenetwoFn();
		objSenceThree=sceneThreeFn();
		sceneThourFn();
	}
	function sceneThourFn(){//场景四函数
		
		var oScene=document.getElementsByClassName('sence4')[0];
		var oHouse=oScene.getElementsByClassName('house_list')[0];
		var aHouseList=oHouse.getElementsByTagName('li');
		var oC=null;
		var oCG=null;
		
		var width=tool.getStyle(aHouseList[0],'width');
		var height=tool.getStyle(aHouseList[0],'height');
		
		//总共18种颜色
		var colorArr=['#bebebe','#ae0000','#820041','#921aff','#000079','#97cbff','#4efeb3','#009100','#ffff6f','#ffdc36','#ffd1a4','#642100','#6c3365','#d2a2cc','#7373b9','#5cadad','#616130','#613030']
		var ballArr=[];
		
		var drawTimer=null;
		var createTimer=null;
		
		for(var i=0;i<aHouseList.length;i++){
			aHouseList[i].index=i;
			aHouseList[i].onmouseenter=function(ev){
				
				mouseOn(this);
				
			}
			aHouseList[i].onmouseleave=function(ev){
				
				mouseOut(this);
			}
		}
		
		function mouseOut(obj){//鼠标离开时函数统一调用
			
			clearInterval(drawTimer);//停止画小球
			clearInterval(createTimer);//停止生成小球
			
			oCG.clearRect(0,0,width,height);
			ballArr=[];//请空数组否则下次调用时会继续上一次的位置
			obj.innerHTML='';//删除canvas元素
			
			//除遮罩
			for(var i=0;i<aHouseList.length;i++){
				tool.removeClass(aHouseList[i],'mask');
			}
			
		}
		function mouseOn(obj){//鼠标放上时函数统一调用
			
			oC=document.createElement('canvas');
			oC.width=width;
			oC.height=height;
			obj.appendChild(oC);
			oCG=oC.getContext('2d');
			
			createBall();
			createTimer=setInterval(function(){
				createBall();
				
			},300);
			drawBall();
			drawTimer=setInterval(function(){
				drawBall();
			},30);
			
			//加遮罩
			for(var i=0;i<aHouseList.length;i++){
				tool.addClass(aHouseList[i],'mask');
			}
			
			tool.removeClass(obj,'mask')
		}
		
		function drawBall(){//画小球
			var r=5+Math.random()*2;
			oCG.clearRect(0,0,width,height);
			for(var i=0;i<ballArr.length;i++){
				
				oCG.fillStyle = ballArr[i].color;
				oCG.beginPath();
				
				ballArr[i].vy=ballArr[i].vy+ballArr[i].g;
				ballArr[i].y=ballArr[i].y-ballArr[i].vy;
				ballArr[i].x=ballArr[i].x-ballArr[i].vx;
				
				if(ballArr[i].x<r){
					ballArr[i].x=r;
					ballArr[i].vx=-ballArr[i].vx;
				}else if(ballArr[i].x>width-r){
					ballArr[i].x=width-r;
					ballArr[i].vx=-ballArr[i].vx;
				}
				if(ballArr[i].y<0){
					ballArr.splice(i,1);
					continue;
				}
				oCG.arc(ballArr[i].x, ballArr[i].y, r, 0, Math.PI*2, true);
				oCG.fill();	
			}
		}
		function createBall(){//创建小球
			
			var len=5;//每次小球数量
			for(var i=0;i<len;i++){
				var ball={
					color:colorArr[Math.floor(Math.random()*18)],
					x:Math.floor(Math.random()*83+30),
					y:Math.floor(Math.random()*65+300),
					vx:5+2*Math.random(),
					vy:1*Math.random()+1,
					g:0.1*Math.random()
				};
				ballArr.push(ball);
			}
			
		}
	}
	function sceneThreeFn(){//场景三函数
		var oScene=document.getElementsByClassName('sence3')[0];
		var aGridPic=oScene.getElementsByClassName('grid_pic');
		
		function sceneThreeIn(){
			
			for(var i=0;i<aGridPic.length;i++ ){
				
				tool.removeClass(aGridPic[i],'move'+(i+1));
				
			}
		}
		function sceneThreeOut(){
			
			for(var i=0;i<aGridPic.length;i++ ){
				
				tool.addClass(aGridPic[i],'move'+(i+1));
				
			}
		}
		return {
			sceneThreeIn:sceneThreeIn,
			sceneThreeOut:sceneThreeOut
		}
			
	}
	function scenetwoFn(){//场景二函数
		var oScene=document.getElementsByClassName('sence2')[0];
		var aPlane=oScene.getElementsByClassName('plane');
		
		function scencetwoIn(){//进场动画暂时绑定在点击事件上
			
			for(var i=0;i<aPlane.length;i++ ){
				
				tool.removeClass(aPlane[i],'move'+(i+1));
				
			}
		}
		function scencetwoOut(){//进场动画暂时绑定在点击事件上
			
			for(var i=0;i<aPlane.length;i++ ){
				
				tool.addClass(aPlane[i],'move'+(i+1));
				
			}
		}
		
		return {
			scencetwoIn:scencetwoIn,
			scencetwoOut:scencetwoOut
		}
	}
	function sceneOneFn(){//场景一函数
		
		var oPicList=document.getElementsByClassName('pic_list')[0];
		var oScene=document.getElementsByClassName('sence1')[0];
		var oDot=oScene.getElementsByClassName('dot')[0];
		var aSpan=oDot.getElementsByTagName('span');
		var aLi=oPicList.getElementsByTagName('li');
		
		var nowIndex=0;
		var next=1;
		var timer=null;
		
		timer=setInterval(move,4200);
		
		for(var i=0;i<aLi.length;i++){
			
			aLi[i].onmouseenter=function(){
				clearInterval(timer);
				
			}
			aLi[i].onmouseleave=function(){
				timer=setInterval(move,4200);
				
			}
		}
	
		
		function move(){
			picListmove();
			setTimeout(function(){
				nowIndex++;
				if(nowIndex==aLi.length){
					nowIndex=0;
				}
				
			},2050);
		
		}
		function picListmove(){
			
			
			for(var i=0;i<aLi.length;i++){//先清除图片的active
				if(i==nowIndex){
					break;
				}
				tool.removeClass(aLi[i],'active');
			}
			if(nowIndex==aLi.length-1){
				next=0;
			}else{
				next=nowIndex+1;
			}
			tool.removeClass(aLi[nowIndex],'active1_out');
			tool.removeClass(aLi[nowIndex],'active2_center');
			tool.addClass(aLi[nowIndex],'active1_in');
			tool.addClass(aLi[nowIndex],'active');
			
			tool.removeClass(aLi[next],'active2_center');
			tool.removeClass(aLi[next],'active1_out');
			tool.addClass(aLi[next],'active2_in');
			tool.addClass(aLi[next],'active');
			
			setTimeout(function(){
				tool.removeClass(aLi[nowIndex],'active2_in');
				tool.removeClass(aLi[nowIndex],'active1_in');
				tool.addClass(aLi[nowIndex],'active1_out');
				
				tool.removeClass(aLi[next],'active1_in');
				tool.removeClass(aLi[next],'active2_in');
				tool.addClass(aLi[next],'active2_center');
				
				for(var i=0;i<aSpan.length;i++ ){//先清除点的active
					tool.removeClass(aSpan[i],'active');
				}
				tool.addClass(aSpan[next],'active');
				
			},1050)
		}
		
	}
	function headerFn(){//头部导航函数
		
		var oNav=document.getElementsByClassName('nav')[0];
		var aLi=oNav.getElementsByTagName('li');
		var aImg=aLi[0].getElementsByTagName('img');
		for(var i=0;i<aLi.length;i++){
			aLi[i].onclick=(function(index){
				
				return function(){
					nowPage=index;
					navChange();
				}
			})(i)
		}
		
		function navChange(){
			var oCaret=document.getElementsByClassName('caret')[0];
			for(var i=0;i<aLi.length;i++){
				tool.removeClass(aLi[i],'active');
						
			}
			if(nowPage==0){
				tool.addClass(aImg[0],'img_show');
				tool.removeClass(aImg[1],'img_show');
				oCaret.style.left=19+'px'
			}else{
				tool.removeClass(aImg[0],'img_show');
				tool.addClass(aImg[1],'img_show');
			}
			if(nowPage==1){
				oCaret.style.left=82+'px'
			}
			if(nowPage==2){
				oCaret.style.left=150+'px'
			}
			if(nowPage==3){
				oCaret.style.left=218+'px'
			}
					
			tool.addClass(aLi[nowPage],'active');
					
			objEvent.mouseFn();
		}
		return {
			navChange:navChange
		}
	}
	function resize(){//改变窗口时的事件
		tool.viewH=document.documentElement.clientHeight;
		tool.viewW=document.documentElement.clientWidth;
		
		document.body.style.width=tool.viewW+'px';
		document.body.style.height=tool.viewH+'px';
		
	}
	function events(){//事件统一调用
		
		var delayBtn=true; 
		var oH=aSence[3].getElementsByTagName('h1')[0];
		var oP=aSence[3].getElementsByTagName('p')[0];
		
		window.onresize=function(){
			resize();
		}
		tool.myMouseWheel(document,function(position){
			
			if(delayBtn){
				//以防短时间内多次调用
				delayBtn=false;
				setTimeout(function(){
					
					delayBtn=true;
					
				},1000);
				
				if(position==='down'){
					
					nowPage++;
					
					if(nowPage>=aSence.length){
						nowPage--;
						return;
					}
					
					mousefn();
					
				}
				if(position==='up'){
					
					nowPage--;
					
					if(nowPage<0){
						nowPage++;
						return;
					}
					
					mousefn();
				}
				objHeader.navChange();
			}
			
		});
		
		function mousefn(){
			
			for(var i=0;i<aSence.length;i++){
				
				if(i<nowPage){
					tool.removeClass(aSence[i],'sence_down');
					tool.addClass(aSence[i],'sence_up');
				}else if(i>nowPage){
					tool.removeClass(aSence[i],'sence_up');
					tool.addClass(aSence[i],'sence_down');
				}else{
					tool.removeClass(aSence[i],'sence_down');
					tool.removeClass(aSence[i],'sence_up');
				}
				//进出场动画处理
				if(nowPage==1){
					objSenceTwo.scencetwoIn();
				}else{
					objSenceTwo.scencetwoOut();
				}
				if(nowPage==2){
					objSenceThree.sceneThreeIn();
				}else{
					objSenceThree.sceneThreeOut();
				}
				
				if(nowPage==3){
					tool.removeClass(oH,'sence4_ani_left');
					tool.removeClass(oP,'sence4_ani_right');
				}else{
					tool.addClass(oH,'sence4_ani_left');
					tool.addClass(oP,'sence4_ani_right');
				}
			}
		}
		return {
			mouseFn:mousefn
		}
		
	}
	
}
var tool={
	
	viewH:document.documentElement.clientHeight,
	viewW:document.documentElement.clientWidth,
	addClass:function(obj,name){
		
		var str = obj.className;
		
		var arr=str.split(' ');
		
		for(var i=0;i<arr.length;i++){
			
			if(arr[i]==name){
				return ;
			}
		}
		obj.className+=" "+name;
		
	},
	removeClass:function(obj,name){
		
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
	hasClass:function(obj,name){
		var str = obj.className;
		var arr=str.split(' ');
		
		for(var i=0;i<arr.length;i++){
			
			if(arr[i]==name){
				return true;
			}
		}
		return false;
	},
	getStyle:function(obj,attr){
		return parseInt(getComputedStyle(obj,null)[attr]);
	},
	myMouseWheel:function(obj,callback){
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
		
	}
	
}
